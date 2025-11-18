class Inventory {
  inventoryId: number = 0;
  productId: number = 0;
  quantity: number = 0;
  minimumQuantity: number = 0;

  constructor(
    inventoryId: number,
    productId: number,
    quantity: number,
    minimumQuantity: number
  ) {
    this.inventoryId = inventoryId;
    this.productId = productId;
    this.quantity = quantity;
    this.minimumQuantity = minimumQuantity;

    return this;
  };
}

export default Inventory;
