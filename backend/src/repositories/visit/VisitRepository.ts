import { PrismaClient } from "@prisma/client";
import { Visit } from "@/models";
import Client from "@/models/client";
import Doctor from "@/models/doctor";
import { UserSchema } from "@/models/schemas";

/**
 * Repository for Visit operations
 */
export class VisitRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Create a new visit
   */
  async create(visit: {
    visit_date: Date;
    clientId: number;
    doctorId: number;
  }): Promise<Visit> {
    const prismaVisit = await this.prisma.visit.create({
      data: {
        visit_date: visit.visit_date,
        clientId: visit.clientId,
        doctorId: visit.doctorId,
      },
      include: {
        clients: {
          include: {
            users: true
          }
        },
        doctors: {
          include: {
            users: true
          }
        }
      }
    });
    return this._toDomain(prismaVisit);
  }

  /**
   * Find visit by ID
   */
  async findById(id: number): Promise<Visit | null> {
    const result = await this.prisma.visit.findUnique({
      where: { visitId: id },
      include: {
        clients: {
          include: {
            users: true
          }
        },
        doctors: {
          include: {
            users: true
          }
        }
      }
    });
    return result ? this._toDomain(result) : null;
  }

  /**
   * Find visits by client ID
   */
  async findByClientId(clientId: number): Promise<Visit[]> {
    const visits = await this.prisma.visit.findMany({
      where: { clientId },
      include: {
        clients: {
          include: {
            users: true
          }
        },
        doctors: {
          include: {
            users: true
          }
        }
      },
      orderBy: { visit_date: 'desc' }
    });
    return visits.map(visit => this._toDomain(visit));
  }

  /**
   * Find visits by doctor ID
   */
  async findByDoctorId(doctorId: number): Promise<Visit[]> {
    const visits = await this.prisma.visit.findMany({
      where: { doctorId },
      include: {
        clients: {
          include: {
            users: true
          }
        },
        doctors: {
          include: {
            users: true
          }
        }
      },
      orderBy: { visit_date: 'desc' }
    });
    return visits.map(visit => this._toDomain(visit));
  }

  /**
   * Find visits in date range
   */
  async findByDateRange(startDate: Date, endDate: Date, doctorId?: number): Promise<Visit[]> {
    const visits = await this.prisma.visit.findMany({
      where: {
        visit_date: {
          gte: startDate,
          lte: endDate
        },
        ...(doctorId && { doctorId })
      },
      include: {
        clients: {
          include: {
            users: true
          }
        },
        doctors: {
          include: {
            users: true
          }
        }
      },
      orderBy: { visit_date: 'asc' }
    });
    return visits.map(visit => this._toDomain(visit));
  }

  /**
   * Get available time slots for appointments
   */
  async getAvailableTimeSlots(
    startDate: Date,
    endDate: Date,
    doctorId?: number
  ): Promise<Array<{
    date: Date;
    doctorId: number;
    doctorName: string;
    specialty: string;
  }>> {
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
    const slots: Array<{
      date: Date;
      doctorId: number;
      doctorName: string;
      specialty: string;
    }> = [];
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
                return (
                  visitDate.getTime() === slotDate.getTime() &&
                  visit.doctorId === doctor.doctorId
                );
              });

              if (!isBooked) {
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

    return slots;
  }

  /**
   * Delete visit
   */
  async delete(id: number): Promise<void> {
    await this.prisma.visit.delete({
      where: { visitId: id }
    });
  }

  /**
   * Convert Prisma model to domain entity
   */
  private _toDomain(prisma: any): Visit {
    const clientUser = prisma.clients.users;
    const clientUserData = UserSchema.parse({
      userId: clientUser.userId,
      email: clientUser.email,
      password: clientUser.password,
      firstname: clientUser.firstname,
      lastname: clientUser.lastname,
      enabled: clientUser.enabled,
      type: clientUser.type
    });
    const client = new Client(clientUserData, []);
    client.clientId = prisma.clients.clientId;

    const doctorUser = prisma.doctors.users;
    const doctorUserData = UserSchema.parse({
      userId: doctorUser.userId,
      email: doctorUser.email,
      password: doctorUser.password,
      firstname: doctorUser.firstname,
      lastname: doctorUser.lastname,
      enabled: doctorUser.enabled,
      type: doctorUser.type
    });
    const doctor = new Doctor(doctorUserData, prisma.doctors.specialty, []);
    doctor.doctorId = prisma.doctors.doctorId;

    return new Visit(
      prisma.visitId,
      prisma.creation_date,
      prisma.visit_date,
      client,
      doctor
    );
  }
}

