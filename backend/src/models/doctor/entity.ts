import { User } from "@/models/user";
import { Visit } from "@/models/visit";
import { type TUserSchema } from "@/models/user";

class Doctor extends User {
  doctorId: number = 0;
  specialty: string = '';
  visits: Visit[] = [];

  constructor(user: TUserSchema, doctorId: number, specialty: string, visits: Visit[] = []) {
    super(user);
    this.doctorId = doctorId;
    this.specialty = specialty;
    this.visits = visits
    return this;
  }
};

export default Doctor;
