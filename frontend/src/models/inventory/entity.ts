export class Inventory {
  inventoryId: number;
  productId: number;
  quantity: number;
  minimumQuantity: number;

  constructor(data: Inventory) {
    this.inventoryId = data.inventoryId;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.minimumQuantity = data.minimumQuantity;
  }
}
