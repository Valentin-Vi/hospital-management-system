var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserDal } from "@dals";
import { compare } from "bcrypt";
class AuthService {
    constructor() {
        this.dal = new UserDal();
        return this;
    }
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const storeResult = yield this.dal.store(user);
            if (storeResult.success) {
                return storeResult;
            }
            else {
                return {
                    success: false,
                    error: 'Email is not unique.'
                };
            }
        });
    }
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const user = yield this.dal.find({
                col: 'email',
                value: email,
                include: {}
            });
            if (!user || !(yield compare(password, user.password))) {
                return {
                    success: false,
                    error: 'Incorrect password.'
                };
            }
            ;
            return {
                success: true,
                data: user
            };
        });
    }
}
;
export default AuthService;
