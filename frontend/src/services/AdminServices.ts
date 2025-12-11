import type { TUserSchema } from "@/models/schemas";

class AdminServices {

  constructor() {}

  static async getPaginatedUsers(): Promise<TUserSchema[]> {
    const response = await fetch('http://localhost:3010/admin/users?page=0&limit=10');
    const responseBody = response.json();
    return responseBody ?? []
  }
}

export default AdminServices
