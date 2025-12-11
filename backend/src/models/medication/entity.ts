class Medication {
  medicationId: number = 0;
  name: string = '';
  category: string = '';
  brandName: string = '';
  genericName: string = '';
  strength: string = '';
  form: string = '';
  minimum_quantity: number = 0;

  constructor(
    medicationId: number,
    name: string,
    category: string,
    brandName: string,
    genericName: string,
    strength: string,
    form: string,
    minimum_quantity: number = 0
  ) {
    this.medicationId = medicationId;
    this.name = name;
    this.category = category;
    this.brandName = brandName;
    this.genericName = genericName;
    this.strength = strength;
    this.form = form;
    this.minimum_quantity = minimum_quantity;
    return this;
  }
}

export default Medication