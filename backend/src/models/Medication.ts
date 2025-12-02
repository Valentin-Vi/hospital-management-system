import Inventory from "./Inventory";
import Batch from "./Batch";

class Medication {
  medicationId: number = 0;
  name: string = 'N/A'
  category: string = 'N/A';
  brandName: string = 'N/A';
  genericName: string = 'N/A';
  strength: string = 'N/A';
  form: string = 'N/A';
  inventory?: Inventory;
  batches?: Batch[];

  constructor(
    medicationId: number,
    name: string,
    category: string,
    brandName: string,
    genericName: string,
    strength: string,
    form: string,
    inventory?: Inventory,
    batches?: Batch[]
  ) {
    this.medicationId = medicationId;
    this.name = name;
    this.category = category;
    this.brandName = brandName;
    this.genericName = genericName;
    this.strength = strength;
    this.form = form;

    if (inventory) this.inventory = inventory;
    if (batches) this.batches = batches;

    return this;
  }
};


export default Medication;
