import Inventory from "./Inventory";

class Medication {
  medicationId: number = 0;
  name: string = 'N/A'
  category: string = 'N/A';
  expirationDate: Date = new Date();
  brandName: string = 'N/A';
  genericName: string = 'N/A';
  strength: string = 'N/A';
  form: string = 'N/A';
  inventory?: Inventory

  constructor(
    medicationId: number,
    name: string,
    category: string,
    expirationDate: Date,
    brandName: string,
    genericName: string,
    strength: string,
    form: string,
    inventory?: Inventory
  ) {
    this.medicationId = medicationId;
    this.name = name;
    this.category = category;
    this.expirationDate = expirationDate;
    this.brandName = brandName;
    this.genericName = genericName;
    this.strength = strength;
    this.form = form;
    
    if(inventory) this.inventory = inventory;

    return this;
  }
};

export default Medication;
