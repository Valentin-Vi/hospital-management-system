import { User } from '@/models/user';
import { Visit } from '@/models/visit';
import { type TUserSchema } from '@/models/user';

class Client extends User {

  clientId: number = 0;
  visits: Visit[] = [];

  constructor(user: TUserSchema, visits: Visit[] = []) {
    super(user);
    this.visits = visits;
    return this;
  }
  
  toString(): string {
    return (`Client {\n\tuserId: ${this.userId},\n\tclientId: ${this.clientId}\n\temail: \'${this.email}\',\n\tpassword: \'${this.password}\',\n\.firstname: \'${this.firstname}\',\n\tlas.firstname: \'${this.lastname}\',\n\ttype: UserTypeEnum${this.type},\n\tvisits: ${this.visits}\n}`);
  }

  toJSON(): string {
    return JSON.stringify({
      userId: this.userId,
      clientId: this.clientId,
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      type: this.type,
      visits: this.visits
    });
  }
}

export default Client;
