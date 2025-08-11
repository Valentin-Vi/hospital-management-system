var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../models";
import { PrismaClient } from "@prisma/client";
import { UserSchema } from "../models/schemas";
class UserDataAccessLayer {
    constructor() {
        this.prisma = new PrismaClient();
        return this;
    }
    ;
    store(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prismaUser = yield this.prisma.pUser.create({
                    data: user
                });
                return {
                    success: true,
                    data: new User(UserSchema.parse(prismaUser))
                };
            }
            catch (err) {
                console.error(err);
                if (err instanceof Error) {
                    return {
                        success: false,
                        error: err.message
                    };
                }
                else {
                    return {
                        success: false,
                        error: 'idk *shrug_emoji*'
                    };
                }
            }
        });
    }
    ;
    find(_a) {
        return __awaiter(this, arguments, void 0, function* ({ col, value, include }) {
            switch (col) {
                case 'userId':
                    return this.findId(value, include);
                case 'email':
                    return this.findEmail(value, include);
                default:
                    throw new Error(`Unrecognized col value: ${col}`);
            }
        });
    }
    findId(userId, include) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaUser = yield this.prisma.pUser.findUnique({
                where: { user_id: userId },
                include: include
            });
            if (prismaUser === null)
                return null;
            const parseResult = UserSchema.parse(prismaUser);
            return new User(parseResult);
        });
    }
    findEmail(email, include) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaUser = yield this.prisma.pUser.findUnique({
                where: { email: email },
                include: include
            });
            if (prismaUser === null)
                return null;
            return new User(prismaUser);
        });
    }
}
;
export default UserDataAccessLayer;
