import InventoryService from "services/InventoryService";
import { Request, Response } from "express";

export default class InventoryController {

  private readonly service: InventoryService;

  constructor() {
    this.service = new InventoryService();

    this.getPaginatedMedications = this.getPaginatedMedications.bind(this);
  }

  public async getPaginatedMedications(request: Request, response: Response): Promise<void> {
    this._try(
      request,
      response,
      async () => {
        const page = parseInt(request.query.page as string);
        const limit = parseInt(request.query.limit as string);
      
        return response.status(200).json({
          message: "Request successful.",
          medications: JSON.stringify(await this.service.getPaginatedMedications(page, limit))
        });
      }
    )
  }

  private async _try(request: Request, response: Response, callback: () => Promise<Response>): Promise<Response> {
    try {
      return await callback();
    } catch(err) {
      console.error(err);
      if(err instanceof Error) {
        return response.status(500).send({
          message: err.message
        });
      }
      return response.status(500).send({
        message: 'Internal server error.'
      });
    }
  }
}