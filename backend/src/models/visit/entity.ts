import { Client } from "@/models/client";
import { Doctor } from "@/models/doctor";

class Visit {
  visitId: number = 0;
  creation_date: Date;
  visit_date: Date;
  client: Client;
  doctor: Doctor;
  
  constructor(
    visitId: number,
    creation_date: Date,
    visit_date: Date,
    client: Client,
    doctor: Doctor
  ) {
    this.visitId = visitId;
    this.creation_date = creation_date;
    this.visit_date = visit_date;
    this.client = client;
    this.doctor = doctor;
    return this;
  }

  toString(): string {
    return (`Visit {\n\tvisitId: ${this.visitId},\n\tcreation_date: ${this.creation_date},\n\tvisit_date: ${this.visit_date},\n\tclient: {\n\t\tclientId: ${this.client.clientId}\n\t},\n\tdoctor: {\n\t\tdoctorId: ${this.doctor.userId}\n\t}\n}`);
  }

  toJSON(): string {
    return JSON.stringify({
      visitId: this.visitId,
      creation_date: this.creation_date,
      visit_date: this.visit_date,
      client: this.client,
      doctor: this.doctor
    });
  }
};

export default Visit;
