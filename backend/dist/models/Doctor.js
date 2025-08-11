import { User } from "@models";
class Doctor extends User {
    constructor(user, specialty, visits = []) {
        super(user);
        this.specialty = '';
        this.visits = [];
        this.specialty = specialty;
        this.visits = visits;
        return this;
    }
    toString() {
        return (`Doctor {\n\tuserId: ${this.userId},\n\tspecialty: \'${this.specialty}\',\n\temail: \'${this.email}\',\n\tpassword: \'${this.password}\',\n\.firstname: \'${this.firstname}\',\n\tlas.firstname: \'${this.lastname}\',\n\ttype: UserTypeEnum.${this.type},\n\tvisits: ${this.visits}\n}`);
    }
    toJSON() {
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
}
;
export default Doctor;
