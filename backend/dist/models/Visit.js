class Visit {
    constructor(visitId, creation_date, visit_date, client, doctor) {
        this.visitId = 0;
        this.visitId = visitId;
        this.creation_date = creation_date;
        this.visit_date = visit_date;
        this.client = client;
        this.doctor = doctor;
        return this;
    }
    toString() {
        return (`Visit {\n\tvisitId: ${this.visitId},\n\tcreation_date: ${this.creation_date},\n\tvisit_date: ${this.visit_date},\n\tclient: {\n\t\tclientId: ${this.client.clientId}\n\t},\n\tdoctor: {\n\t\tdoctorId: ${this.doctor.doctorId}\n\t}\n}`);
    }
    toJSON() {
        return JSON.stringify({
            visitId: this.visitId,
            creation_date: this.creation_date,
            visit_date: this.visit_date,
            client: this.client,
            doctor: this.doctor
        });
    }
}
;
export default Visit;
