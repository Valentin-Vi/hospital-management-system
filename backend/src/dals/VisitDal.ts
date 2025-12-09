import { PrismaClient } from "@prisma/client";

export default class VisitDal {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAvailableTimeSlots(startDate: Date, endDate: Date, doctorId?: number) {
    // Get all existing visits in the date range
    const existingVisits = await this.prisma.visit.findMany({
      where: {
        visit_date: {
          gte: startDate,
          lte: endDate
        },
        ...(doctorId && { doctorId })
      },
      select: {
        visit_date: true,
        doctorId: true
      }
    });

    // Get all doctors (or specific doctor)
    const doctors = await this.prisma.doctor.findMany({
      where: doctorId ? { doctorId } : undefined,
      include: {
        users: true
      }
    });

    // Generate available slots
    // Business hours: 9 AM to 5 PM, 30-minute slots
    const slots: Array<{ date: Date; doctorId: number; doctorName: string; specialty: string }> = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        for (const doctor of doctors) {
          // Generate slots from 9:00 to 16:30 (last slot starts at 4:30 PM)
          for (let hour = 9; hour < 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
              const slotDate = new Date(currentDate);
              slotDate.setHours(hour, minute, 0, 0);
              
              // Check if this slot is already booked
              const isBooked = existingVisits.some(visit => {
                const visitDate = new Date(visit.visit_date);
                return visit.doctorId === doctor.doctorId &&
                       visitDate.getTime() === slotDate.getTime();
              });

              if (!isBooked && slotDate >= new Date()) {
                slots.push({
                  date: slotDate,
                  doctorId: doctor.doctorId,
                  doctorName: `${doctor.users.firstname} ${doctor.users.lastname}`,
                  specialty: doctor.specialty
                });
              }
            }
          }
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return slots.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async createVisit(clientId: number, doctorId: number, visitDate: Date) {
    return await this.prisma.visit.create({
      data: {
        clientId,
        doctorId,
        visit_date: visitDate
      },
      include: {
        doctors: {
          include: {
            users: true
          }
        },
        clients: {
          include: {
            users: true
          }
        }
      }
    });
  }

  async getClientVisits(clientId: number) {
    return await this.prisma.visit.findMany({
      where: {
        clientId
      },
      include: {
        doctors: {
          include: {
            users: true
          }
        }
      },
      orderBy: {
        visit_date: 'asc'
      }
    });
  }

  async getDoctors() {
    return await this.prisma.doctor.findMany({
      include: {
        users: true
      }
    });
  }
}
