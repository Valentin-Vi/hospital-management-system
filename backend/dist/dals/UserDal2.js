var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _UserDal_instances, _UserDal_buildUser;
import { PrismaClient } from "@prisma/client";
import { User, UserTypeEnum } from "authentication_project";
import { hashSync } from "bcrypt";
import { UserBuilder } from "builder";
import { BaseUserSchema } from "builder/schemas";
class UserDal {
    constructor(builder = UserBuilder, prisma = new PrismaClient()) {
        _UserDal_instances.add(this);
        this.builder = builder;
        this.prisma = prisma;
    }
    findId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.prisma.pUser.findUnique({
                where: { user_id: id }
            });
            return row ? UserBuilder.buildBase(BaseUserSchema, User, row) : null;
        });
    }
    storeClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = hashSync(client.password, 10);
            return yield this.prisma.pUser.create({
                data: {
                    email: client.email,
                    password: password,
                    firstname: client.firstname,
                    lastname: client.lastname,
                    type: UserTypeEnum.CLIENT,
                    enabled: true,
                    client: {
                        create: {}
                    }
                },
                include: { client: true }
            });
        });
    }
}
_UserDal_instances = new WeakSet(), _UserDal_buildUser = function _UserDal_buildUser(user) {
};
;
