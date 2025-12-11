import { PrismaClient } from "@prisma/client";
import { VisitRepository } from "@/repositories";

export default class VisitService {
  private visitRepo: VisitRepository;

  constructor() {
    const prisma = new PrismaClient();
    this.visitRepo = new VisitRepository(prisma);
  }

  async getAvailableTimeSlots(startDate: Date, endDate: Date, doctorId?: number) {
    // Get all existing visits in the date range
    const existingVisits = await this.visitRepo.findByDateRange(startDate, endDate, doctorId);
    
    // Get all doctors (or specific doctor)
    const doctors = await this.visitRepo.getDoctors();
    const filteredDoctors = doctorId 
      ? doctors.filter(d => d.doctorId === doctorId)
      : doctors;

    // Generate available slots
    // Business hours: 9 AM to 5 PM, 30-minute slots
    const slots: Array<{ date: Date; doctorId: number; doctorName: string; specialty: string }> = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        for (const doctor of filteredDoctors) {
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
    // Validate that the slot is still available
    const startDate = new Date(visitDate);
    startDate.setMinutes(startDate.getMinutes() - 1);
    const endDate = new Date(visitDate);
    endDate.setMinutes(endDate.getMinutes() + 1);
    
    const availableSlots = await this.getAvailableTimeSlots(startDate, endDate, doctorId);
    const slotExists = availableSlots.some(slot => slot.date.getTime() === visitDate.getTime());
    
    if (!slotExists) {
      throw new Error('The selected time slot is no longer available');
    }

    return await this.visitRepo.create(clientId, doctorId, visitDate);
  }

  async getClientVisits(clientId: number) {
    return await this.visitRepo.findByClientId(clientId);
  }

  async getDoctors() {
    return await this.visitRepo.getDoctors();
  }
}

