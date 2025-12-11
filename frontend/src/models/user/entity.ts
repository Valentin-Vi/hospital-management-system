import type { UserRole } from ".";

export class User {
  userId: number = 0;
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  type: UserRole = 'VISITOR';

  constructor(user: User) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.type = user.type;
    this.userId = user.userId;
    return this;
  }

  toString(): string {
      return (`User {\n\tuserId: ${this.userId},\n\temail: ${this.email},\n\tfirstName: ${this.firstName},\n\tlastName: ${this.lastName},\n\ttype: ${this.type}\n}`);
  }

  toJSON(): string {
    return JSON.stringify({
      userId: this.userId,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      type: this.type,
    });
  }
}
