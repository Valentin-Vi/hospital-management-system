import { MedicationSchema } from "@models/schemas";
import { MedicationService } from "@services";
import { Request, Response } from "express";

class MedicationController {
  
  private readonly service: MedicationService;
  
  constructor() {
    this.service = new MedicationService();

    this.getPaginatedMedications = this.getPaginatedMedications.bind(this);
    this.getFilteredPaginatedMedications = this.getFilteredPaginatedMedications.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.deleteMany = this.deleteMany.bind(this);
    this.getEntireMedicationsInventory = this.getEntireMedicationsInventory.bind(this);
    this.insertRow = this.insertRow.bind(this);
  }

  public async insertRow(request: Request, response: Response): Promise<void> {
    this._try(
      request,
      response,
      async () => {
        const medication = request.body;
        console.log(medication)
        MedicationSchema.parse(medication)
        return response.status(200).json({
          message: "Request successful.",
          medication: JSON.stringify(await this.service.insertRow(medication))
        });
      }
    )
  }

  public async getEntireMedicationsInventory(request: Request, response: Response): Promise<void> {
    this._try(
      request,
      response,
      async () => {
        return response.status(200).json({
          message: "Request successful.",
          medications: JSON.stringify(await this.service.getEntireMedicationsInventory())
        });
      }
    )
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

  public async getFilteredPaginatedMedications(request: Request, response: Response): Promise<void> {
    this._try(
      request,
      response,
      async () => {
        const page = parseInt(request.query.page as string);
        const limit = parseInt(request.query.limit as string);
        const column = request.query.column as string;
        let value = request.query.value as string;
      
        if(!column || !value) {
          throw new Error('Invalid request.')
        }

        return response.status(200).json({
          message: "Request successful.",
          medications: JSON.stringify(await this.service.getFilteredPaginatedMedications(page, limit, { column, value }))
        })
      }
    )
  }

  public async deleteRow(request: Request, response: Response): Promise<void> {
    this._try(
      request,
      response,
      async () => {
        const id = parseInt(request.query.rowId as string);
        
        return response.status(200).json({
          message: "Request successful.",
          medications: JSON.stringify(await this.service.deleteRow(id))
        })
      }
    )
  }

  public async deleteMany(request: Request, response: Response): Promise<void> {
    this._try(
      request,
      response,
      async () => {
        const rowIds = request.query.rowIds;
        const ids = (
          typeof rowIds === "string" ?
            rowIds.split(",").map(Number)
          :
            []
        );
        
        const completed = await this.service.deleteMany(ids)

        if(completed === false) {
          throw new Error('Transaction could not be completed.')
        }

        return response.status(200).json({
          message: "Request successful."
        })
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

export default MedicationController;
