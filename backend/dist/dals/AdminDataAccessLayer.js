var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AdminDataAccessLayer_instances, _AdminDataAccessLayer_build;
import { AdminBuilder } from "../builder";
import { UserDataAccessLayer, UserTypeEnum } from "authentication_project";
class AdminDataAccessLayer extends UserDataAccessLayer {
    constructor() {
        super();
        _AdminDataAccessLayer_instances.add(this);
        super.builder(new AdminBuilder());
        return this;
    }
    create(user) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _AdminDataAccessLayer_instances, "m", _AdminDataAccessLayer_build).call(this, yield _super.prisma.pAdmin.create({
                data: {
                    user: { create: {
                            email: user.email,
                            password: user.password,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            type: UserTypeEnum.ADMIN,
                            enabled: true
                        } }
                },
                include: { user: true }
            }));
        });
    }
    update(admin) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _AdminDataAccessLayer_instances, "m", _AdminDataAccessLayer_build).call(this, yield _super.prisma.pAdmin.update({
                where: { admin_id: admin.admin_id },
                data: {
                    user: { update: {
                            email: admin.email,
                            password: admin.password,
                            firstname: admin.firstname,
                            lastname: admin.lastname,
                        }
                    }
                },
                include: { user: true }
            }));
        });
    }
    ;
}
_AdminDataAccessLayer_instances = new WeakSet(), _AdminDataAccessLayer_build = function _AdminDataAccessLayer_build(admin) {
    return (this.builder
        .setSafe(this.safe)
        .prismaAdmin(admin)
        .buildAdmin());
};
;
export default AdminDataAccessLayer;
