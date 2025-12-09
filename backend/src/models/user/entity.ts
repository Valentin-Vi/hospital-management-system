import { type TUserSchema, type TUserTypeEnumSchema } from '@/models/user'

class User {
  userId: number = 0;
  email: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  enabled: boolean = false;
  type: TUserTypeEnumSchema = 'VISITOR';

  constructor(user: TUserSchema) {
    this.email = user.email;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.enabled = user.enabled;
    this.type = user.type;
    this.userId = user.userId;
    return this;
  }

  toString(): string {
      return (`User {\n\tuserId: ${this.userId},\n\temail: ${this.email},\n\tpassword: ${this.password},\n\tname: ${this.firstname},\n\tlastname: ${this.lastname},\n\ttype: ${this.type}\n}`);
  }

  toJSON(): string {
    return JSON.stringify({
      userId: this.userId,
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      type: this.type,
      enabled: this.enabled
    });
  }
}

export default User;
