class Stock {
  stockId: number = 0;
  itemId: number = 0;
  quantity: number = 0;
  updated_at: Date;

  constructor({ stockId, quantity, updated_at }: Stock) {
    this.stockId = stockId;
    this.quantity = quantity;
    this.updated_at = updated_at;
    return this;
  }

  toString(): string {
    return `Stock { stockId: ${this.stockId}, quantity: ${this.quantity}, updated_at: ${this.updated_at} }`;
  }

  toJSON(): string {
    return JSON.stringify({
      stockId: this.stockId,
      quantity: this.quantity,
      updated_at: this.updated_at
    });
  }
};

export default Stock;
