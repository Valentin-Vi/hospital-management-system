import { UserTypeEnum } from "@models/types";
class User {
    constructor(user) {
        this.userId = 0;
        this.email = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
        this.enabled = false;
        this.type = UserTypeEnum.VISITOR;
        this.email = user.email;
        this.password = user.password;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.enabled = user.enabled;
        this.type = UserTypeEnum[user.type];
        this.userId = user.userId;
        return this;
    }
    hasValidInfo() {
        if (this.userId <= 0)
            return false;
        if (!this.email)
            return false;
        if (!this.password)
            return false;
        if (!this.firstname)
            return false;
        if (!this.lastname)
            return false;
        return true;
    }
    ;
    toString() {
        return (`User {\n\tuserId: ${this.userId},\n\temail: ${this.email},\n\tpassword: ${this.password},\n\tname: ${this.firstname},\n\tlastname: ${this.lastname},\n\ttype: ${this.type}\n}`);
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
export default User;
