
class Medication {
  medication_id: number = 0;
  name: string = 'N/A'
  category: string = 'N/A';
  expiration_date: Date = new Date();
  brandName: string = 'N/A';
  genericName: string = 'N/A';
  strength: string = 'N/A';
  form: string = 'N/A';

  constructor(
    medication_id: number,
    name: string,
    category: string,
    expiration_date: Date,
    brandName: string,
    genericName: string,
    strength: string,
    form: string
  ) {
    this.medication_id = medication_id;
    this.name = name;
    this.category = category;
    this.expiration_date = expiration_date;
    this.brandName = brandName;
    this.genericName = genericName;
    this.strength = strength;
    this.form = form;
    
    return this;
  }

  toJSON(): string {
    return JSON.stringify(this);
  }
};

export default Medication;
