var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DeskDataAccessLayer_instances, _DeskDataAccessLayer_builder, _DeskDataAccessLayer_build;
import { DeskBuilder } from "../builder";
import { BaseDataAccessLayer, UserTypeEnum } from "authentication_project";
class DeskDataAccessLayer extends BaseDataAccessLayer {
    constructor() {
        super();
        _DeskDataAccessLayer_instances.add(this);
        _DeskDataAccessLayer_builder.set(this, void 0);
        __classPrivateFieldSet(this, _DeskDataAccessLayer_builder, new DeskBuilder(), "f");
        return this;
    }
    create(desk) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _DeskDataAccessLayer_instances, "m", _DeskDataAccessLayer_build).call(this, yield _super.prisma.pDesk.create({
                data: {
                    user: {
                        create: {
                            email: desk.email,
                            password: desk.password,
                            firstname: desk.firstname,
                            lastname: desk.lastname,
                            type: UserTypeEnum.DESK
                        }
                    }
                },
                include: { user: true }
            }));
        });
    }
    update(desk) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _DeskDataAccessLayer_instances, "m", _DeskDataAccessLayer_build).call(this, yield _super.prisma.pDesk.update({
                where: { desk_id: desk.desk_id },
                data: {},
                include: { user: true },
            }));
        });
    }
    ;
    assosiateWithUser(desk_id) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _DeskDataAccessLayer_instances, "m", _DeskDataAccessLayer_build).call(this, yield _super.prisma.pDesk.create({
                data: { desk_id },
                include: { user: true }
            }));
        });
    }
    ;
    deassociateWithUser(desk_id) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _DeskDataAccessLayer_instances, "m", _DeskDataAccessLayer_build).call(this, yield _super.prisma.pDesk.delete({
                where: { desk_id },
                include: { user: true }
            }));
        });
    }
    ;
    ;
}
_DeskDataAccessLayer_builder = new WeakMap(), _DeskDataAccessLayer_instances = new WeakSet(), _DeskDataAccessLayer_build = function _DeskDataAccessLayer_build(desk) {
    return (__classPrivateFieldGet(this, _DeskDataAccessLayer_builder, "f")
        .setSafe(this.safe)
        .prismaDesk(desk)
        .buildDesk());
};
;
export default DeskDataAccessLayer;
