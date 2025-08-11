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
var _DoctorDataAccessLayer_instances, _DoctorDataAccessLayer_builder, _DoctorDataAccessLayer_build;
import { BaseDataAccessLayer } from "authentication_project";
import { DoctorBuilder } from "../builder";
class DoctorDataAccessLayer extends BaseDataAccessLayer {
    constructor() {
        super();
        _DoctorDataAccessLayer_instances.add(this);
        _DoctorDataAccessLayer_builder.set(this, void 0);
        __classPrivateFieldSet(this, _DoctorDataAccessLayer_builder, new DoctorBuilder(), "f");
        return this;
    }
    create(doctor) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _DoctorDataAccessLayer_instances, "m", _DoctorDataAccessLayer_build).call(this, yield _super.prisma.pDoctor.create({
                data: {
                    user: {
                        create: {
                            email: doctor.email,
                            password: doctor.password,
                            firstname: doctor.firstname,
                            lastname: doctor.lastname
                        }
                    },
                    specialty: doctor.specialty,
                },
                include: { user: true }
            }));
        });
    }
    update(doctor) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _DoctorDataAccessLayer_instances, "m", _DoctorDataAccessLayer_build).call(this, yield _super.prisma.pDoctor.update({
                where: { doctor_id: doctor.doctor_id },
                data: {
                    specialty: doctor.specialty
                },
                include: { user: true }
            }));
        });
    }
    assosiateWithUser(doctor) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const created_doctor = yield _super.prisma.pDoctor.create({
                data: {
                    specialty: doctor.specialty,
                    user: {
                        connect: {
                            user_id: doctor.user_id
                        },
                    }
                },
                include: { user: true }
            });
            return __classPrivateFieldGet(this, _DoctorDataAccessLayer_instances, "m", _DoctorDataAccessLayer_build).call(this, created_doctor);
        });
    }
    fetchById(doctor_id) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const foundDoctor = yield _super.prisma.pDoctor.findUnique({
                where: { doctor_id },
                include: { user: true }
            });
            if (!foundDoctor)
                return null;
            return __classPrivateFieldGet(this, _DoctorDataAccessLayer_instances, "m", _DoctorDataAccessLayer_build).call(this, foundDoctor);
        });
    }
    deassociateWithuser(doctor_id) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const deassociated_doctor = yield _super.prisma.pDoctor.delete({
                where: { doctor_id },
                include: { user: true }
            });
            return __classPrivateFieldGet(this, _DoctorDataAccessLayer_instances, "m", _DoctorDataAccessLayer_build).call(this, deassociated_doctor);
        });
    }
}
_DoctorDataAccessLayer_builder = new WeakMap(), _DoctorDataAccessLayer_instances = new WeakSet(), _DoctorDataAccessLayer_build = function _DoctorDataAccessLayer_build(doctor) {
    return (__classPrivateFieldGet(this, _DoctorDataAccessLayer_builder, "f")
        .setSafe(this.safe)
        .prismaDoctor(doctor)
        .buildDoctor());
};
;
export default DoctorDataAccessLayer;
