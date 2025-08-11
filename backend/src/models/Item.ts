import Stock from "./Stock";

class Item {
  itemId: number = 0;
  name: string;
  category: string;
  description: string;
  stock: Stock;

  constructor(
    itemId: number,
    name: string,
    category: string,
    description: string,
    stock: Stock
  ) {
    this.itemId = itemId;
    this.name = name;
    this.category = category;
    this.description = description;
    this.stock = stock;
    return this;
  };

  toString(): string {
    return `Item { itemId: ${this.itemId}, name: ${this.name}, category: ${this.category}, description: ${this.description} }`;
  }

  toJSON(): string {
    return JSON.stringify({
      itemId: this.itemId,
      name: this.name,
      category: this.category,
      description: this.description
    });
  }
}

export default Item;
