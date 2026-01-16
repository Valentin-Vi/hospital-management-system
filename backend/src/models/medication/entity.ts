class Medication {
  medicationId: number = 0;
  name: string = '';
  category: string = '';
  brandName: string = '';
  genericName: string = '';
  strength: string = '';
  form: string = '';
  expirationDate: string = '';

  constructor(
    medicationId: number,
    name: string,
    category: string,
    brandName: string,
    genericName: string,
    strength: string,
    form: string,
    expirationDate: string,
  ) {
    this.medicationId = medicationId;
    this.name = name;
    this.category = category;
    this.brandName = brandName;
    this.genericName = genericName;
    this.strength = strength;
    this.form = form;
    this.expirationDate = expirationDate;
    return this;
  }
}

export default Medication
