import { Request, Response } from "express";
import VisitService from "../services/VisitService";
import jwt from "jsonwebtoken";

export default class VisitController {
  private readonly service: VisitService;

  constructor() {
    this.service = new VisitService();
    this.getAvailableSlots = this.getAvailableSlots.bind(this);
    this.createVisit = this.createVisit.bind(this);
    this.getMyVisits = this.getMyVisits.bind(this);
    this.getDoctors = this.getDoctors.bind(this);
  }

  private getUserIdFromToken(request: Request): number | null {
    try {
      const token = request.cookies?.accessToken;
      if (!token) return null;
      
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '') as { userId: number };
      return decoded.userId;
    } catch {
      return null;
    }
  }

  async getAvailableSlots(request: Request, response: Response) {
    try {
      const startDate = request.query.startDate 
        ? new Date(request.query.startDate as string)
        : new Date();
      
      const endDate = request.query.endDate
        ? new Date(request.query.endDate as string)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
      
      const doctorId = request.query.doctorId
        ? parseInt(request.query.doctorId as string)
        : undefined;

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return response.status(400).json({
          message: 'Invalid date format'
        });
      }

      const slots = await this.service.getAvailableTimeSlots(startDate, endDate, doctorId);
      
      return response.status(200).json({
        message: 'Available slots retrieved successfully',
        slots: slots.map(slot => ({
          date: slot.date.toISOString(),
          doctorId: slot.doctorId,
          doctorName: slot.doctorName,
          specialty: slot.specialty
        }))
      });
    } catch (error) {
      console.error('Error getting available slots:', error);
      return response.status(500).json({
        message: 'Internal server error'
      });
    }
  }

  async createVisit(request: Request, response: Response) {
    try {
      const userId = this.getUserIdFromToken(request);
      if (!userId) {
        return response.status(401).json({
          message: 'Unauthorized'
        });
      }

      const { doctorId, visitDate } = request.body;

      if (!doctorId || !visitDate) {
        return response.status(400).json({
          message: 'doctorId and visitDate are required'
        });
      }

      const visitDateObj = new Date(visitDate);
      if (isNaN(visitDateObj.getTime())) {
        return response.status(400).json({
          message: 'Invalid visitDate format'
        });
      }

      // Get clientId from user
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      const client = await prisma.client.findUnique({
        where: { clientId: userId }
      });

      if (!client) {
        return response.status(403).json({
          message: 'User is not a client'
        });
      }

      const visit = await this.service.createVisit(client.clientId, doctorId, visitDateObj);

      return response.status(201).json({
        message: 'Visit created successfully',
        visit: {
          visitId: visit.visitId,
          visitDate: visit.visit_date,
          doctor: {
            doctorId: visit.doctors.doctorId,
            name: `${visit.doctors.users.firstname} ${visit.doctors.users.lastname}`,
            specialty: visit.doctors.specialty
          }
        }
      });
    } catch (error: any) {
      console.error('Error creating visit:', error);
      return response.status(500).json({
        message: error.message || 'Internal server error'
      });
    }
  }

  async getMyVisits(request: Request, response: Response) {
    try {
      const userId = this.getUserIdFromToken(request);
      if (!userId) {
        return response.status(401).json({
          message: 'Unauthorized'
        });
      }

      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      const client = await prisma.client.findUnique({
        where: { clientId: userId }
      });

      if (!client) {
        return response.status(403).json({
          message: 'User is not a client'
        });
      }

      const visits = await this.service.getClientVisits(client.clientId);

      return response.status(200).json({
        message: 'Visits retrieved successfully',
        visits: visits.map(visit => ({
          visitId: visit.visitId,
          visitDate: visit.visit_date,
          creationDate: visit.creation_date,
          doctor: {
            doctorId: visit.doctors.doctorId,
            name: `${visit.doctors.users.firstname} ${visit.doctors.users.lastname}`,
            specialty: visit.doctors.specialty
          }
        }))
      });
    } catch (error) {
      console.error('Error getting visits:', error);
      return response.status(500).json({
        message: 'Internal server error'
      });
    }
  }

  async getDoctors(request: Request, response: Response) {
    try {
      const doctors = await this.service.getDoctors();

      return response.status(200).json({
        message: 'Doctors retrieved successfully',
        doctors: doctors.map(doctor => ({
          doctorId: doctor.doctorId,
          name: `${doctor.users.firstname} ${doctor.users.lastname}`,
          specialty: doctor.specialty,
          email: doctor.users.email
        }))
      });
    } catch (error) {
      console.error('Error getting doctors:', error);
      return response.status(500).json({
        message: 'Internal server error'
      });
    }
  }
}

