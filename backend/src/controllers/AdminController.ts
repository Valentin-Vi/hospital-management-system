import { Request, Response } from "express";
import { GetPaginatedUsersRequestBodySchema } from "./schemas/TGetPaginatedUsersReuqestBodySchema";
import { AdminService } from "@services";
import { User } from "@models";

class AdminController {

  private readonly service: AdminService;

  constructor() {
    this.service = new AdminService();

    this.getPaginatedUsers = this.getPaginatedUsers.bind(this);
  }

  async getPaginatedUsers(request: Request, response: Response): Promise<Response> {
    try {
      const params = {
        page: parseInt(request.query.page as string),
        limit: parseInt(request.query.limit as string)
      }

      const parsedRequestBody = GetPaginatedUsersRequestBodySchema.safeParse(params)

      if(parsedRequestBody.success === false) {
        return response.status(400).send({
          message: 'Request body malformed or not present.',
          error: parsedRequestBody.error.toString()
        })
      }

      if(params.limit > 100) {
        return response.status(400).send({
          message: 'limit param should not be greater than 100.',
        })
      }

      const { page, limit } = parsedRequestBody.data

      let users = await this.service.getPaginatedUsers({
        page: page,
        limit: limit
      })

      let stringifiedUsers = []
      for (const user of users) {
        const parsedUser = user.toJSON();
        stringifiedUsers.push(parsedUser)
      }

      return response.status(200).json({
        message: "Request successful.",
        users: stringifiedUsers
      });
    } catch(err) {
      console.error(err);
      return response.status(500).send({
        message: 'Internal server error.'
      });
    };
  }
}

export default AdminController;
