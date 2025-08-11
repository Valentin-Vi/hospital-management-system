import { User } from "@models";
class Desk extends User {
    constructor(user) {
        super(user);
        return this;
    }
    ;
    toString() {
        return (`Desk {\tuserId: ${this.userId},\n\temail: \'${this.email}\',\n\tpassword: \'${this.password}\',\n\.firstname: \'${this.firstname}\',\n\tlas.firstname: \'${this.lastname},\'\n\ttype: ${this.type}\n}`);
    }
    toJSON() {
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
;
export default Desk;
