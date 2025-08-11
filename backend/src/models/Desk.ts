import User from "./User";
import type { TUserSchema } from "@models/schemas";

class Desk extends User {
  constructor(user: TUserSchema) {
    super(user);
    return this;
  };

  toString(): string {
    return (`Desk {\tuserId: ${this.userId},\n\temail: \'${this.email}\',\n\tpassword: \'${this.password}\',\n\.firstname: \'${this.firstname}\',\n\tlas.firstname: \'${this.lastname},\'\n\ttype: ${this.type}\n}`);
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
};

export default Desk;
