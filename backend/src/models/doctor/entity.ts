import { User } from "@/models/user";
import { Visit } from "@/models/visit";
import { type TUserSchema } from "@/models/user";

class Doctor extends User {
  specialty: string = '';
  visits: Visit[] = [];

  constructor(user: TUserSchema, specialty: string, visits: Visit[] = []) {
    super(user);
    this.specialty = specialty;
    this.visits = visits
    return this;
  }

  toString(): string {
    return (`Doctor {\n\tuserId: ${this.userId},\n\tspecialty: \'${this.specialty}\',\n\temail: \'${this.email}\',\n\tpassword: \'${this.password}\',\n\.firstname: \'${this.firstname}\',\n\tlas.firstname: \'${this.lastname}\',\n\ttype: UserTypeEnum.${this.type},\n\tvisits: ${this.visits}\n}`);
  }

  toJSON(): string {
    return JSON.stringify({
      userId: this.userId,
      specialty: this.specialty,
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      enabled: this.enabled,
      type: this.type,
    });
  }
};

export default Doctor;
