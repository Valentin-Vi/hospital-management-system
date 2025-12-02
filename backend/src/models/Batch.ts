import Medication from "./Medication";

class Batch {
  batchId: number = 0;
  medicationId: number = 0;
  quantity: number = 0;
  expirationDate: Date = new Date();
  medication?: Medication;

  constructor(
    batchId: number,
    medicationId: number,
    quantity: number,
    expirationDate: Date,
    medication?: Medication
  ) {
    this.batchId = batchId;
    this.medicationId = medicationId;
    this.quantity = quantity;
    this.expirationDate = expirationDate;
    if (medication) this.medication = medication;
  }
}

export default Batch;
