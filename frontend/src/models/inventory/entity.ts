import type { InventoryShema } from './schema';

export class Inventory implements InventoryShema {
  inventoryId: number;
  productId: number;
  quantity: number;
  minimumQuantity: number;

  constructor(data: InventoryShema) {
    this.inventoryId = data.inventoryId;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.minimumQuantity = data.minimumQuantity;
  }
}
