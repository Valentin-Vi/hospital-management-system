import Item from "./Item";

class Medication extends Item {
  constructor({ itemId, name, category, description, stock }: Medication) {
    super(
      itemId,
      name,
      category,
      description,
      stock
    );
    return this;
  }

  toSring(): string {
    return super.toString();
  }

  toJSON(): string {
    return super.toJSON();
  }
};

export default Medication;
