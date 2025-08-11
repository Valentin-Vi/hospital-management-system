import { User } from '@models';
class Client extends User {
    constructor(user, visits = []) {
        super(user);
        this.clientId = 0;
        this.visits = [];
        this.visits = visits;
        return this;
    }
    toString() {
        return (`Client {\n\tuserId: ${this.userId},\n\tclientId: ${this.clientId}\n\temail: \'${this.email}\',\n\tpassword: \'${this.password}\',\n\.firstname: \'${this.firstname}\',\n\tlas.firstname: \'${this.lastname}\',\n\ttype: UserTypeEnum${this.type},\n\tvisits: ${this.visits}\n}`);
    }
    toJSON() {
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
