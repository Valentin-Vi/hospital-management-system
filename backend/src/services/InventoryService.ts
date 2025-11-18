import InventoryDal from "dals/InventoryDal";

export default class InventoryService {
  constructor(
    private readonly inventoryDal: InventoryDal = new InventoryDal()
  ) {}

  public async getPaginatedMedications(page: number, limit: number) {
    return await this.inventoryDal.getPaginatedMedications(page, limit);
  }
}
