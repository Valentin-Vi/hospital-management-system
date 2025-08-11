import type { TUserSchema, TUserTypeEnumSchema } from '@models/schemas'

class User {
  userId: number = 0;
  email: string = '';
  firstname: string = '';
  lastname: string = '';
  type: TUserTypeEnumSchema = 'VISITOR';

  constructor(user: TUserSchema) {
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.type = user.type;
    this.userId = user.userId;
    return this;
  }

  toString(): string {
      return (`User {\n\tuserId: ${this.userId},\n\temail: ${this.email},\n\tname: ${this.firstname},\n\tlastname: ${this.lastname},\n\ttype: ${this.type}\n}`);
  }

  toJSON(): string {
    return JSON.stringify({
      userId: this.userId,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      type: this.type,
    });
  }
}

export default User;
