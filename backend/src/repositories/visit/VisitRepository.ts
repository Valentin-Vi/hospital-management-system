import { PrismaClient } from "@prisma/client";

/**
 * Repository for Visit entity CRUD operations
 */
export class VisitRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Create a new visit
   */
  async create(clientId: number, doctorId: number, visitDate: Date) {
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

  /**
   * Find visit by ID
   */
  async findById(visitId: number) {
    return await this.prisma.visit.findUnique({
      where: { visitId },
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

  /**
   * Get all visits for a client
   */
  async findByClientId(clientId: number) {
    return await this.prisma.visit.findMany({
      where: { clientId },
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

  /**
   * Get all visits for a doctor
   */
  async findByDoctorId(doctorId: number) {
    return await this.prisma.visit.findMany({
      where: { doctorId },
      include: {
        clients: {
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

  /**
   * Get visits in date range
   */
  async findByDateRange(startDate: Date, endDate: Date, doctorId?: number) {
    return await this.prisma.visit.findMany({
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
  }

  /**
   * Get all doctors
   */
  async getDoctors() {
    return await this.prisma.doctor.findMany({
      include: {
        users: true
      }
    });
  }

  /**
   * Delete visit by ID
   */
  async delete(visitId: number): Promise<void> {
    await this.prisma.visit.delete({
      where: { visitId }
    });
  }
}

