import User from "./User";
import { TUserSchema } from "@models/schemas";

class Admin extends User {
  constructor(user: TUserSchema) {
    super(user);
    return this;
  };

  toString(): string {
    return (`Admin {\n\tuserId: ${this.userId},\n\temail: \'${this.email}\',\n\tpassword: \'${this.password}\',\n\.firstname: \'${this.firstname}\',\n\tlas.firstname: \'${this.lastname}\',\n\ttype: USerTypeEnum.${this.type}\n}`)
  }

  toJSON(): string {
    return JSON.stringify({
      userId: this.userId,
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      type: this.type,
    });
  }
}

export default Admin;
