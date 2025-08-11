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
var _VisitDataAccessLayer_instances, _VisitDataAccessLayer_visit_builder, _VisitDataAccessLayer_client_builder, _VisitDataAccessLayer_doctor_builder, _VisitDataAccessLayer_build;
import { BaseDataAccessLayer } from "authentication_project";
import { VisitBuilder, ClientBuilder, DoctorBuilder } from "../builder";
class VisitDataAccessLayer extends BaseDataAccessLayer {
    constructor() {
        super();
        _VisitDataAccessLayer_instances.add(this);
        _VisitDataAccessLayer_visit_builder.set(this, void 0);
        _VisitDataAccessLayer_client_builder.set(this, void 0);
        _VisitDataAccessLayer_doctor_builder.set(this, void 0);
        __classPrivateFieldSet(this, _VisitDataAccessLayer_visit_builder, new VisitBuilder(), "f");
        __classPrivateFieldSet(this, _VisitDataAccessLayer_client_builder, new ClientBuilder(), "f");
        __classPrivateFieldSet(this, _VisitDataAccessLayer_doctor_builder, new DoctorBuilder(), "f");
    }
    create(visit) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const created_visit = yield _super.prisma.pVisit.create({
                data: {
                    creation_date: visit.creation_date,
                    visit_date: visit.visit_date,
                    client: {
                        connect: {
                            client_id: visit.client.client_id
                        }
                    },
                    doctor: {
                        connect: {
                            doctor_id: visit.doctor.doctor_id
                        }
                    }
                },
                include: {
                    client: {
                        include: {
                            user: true
                        }
                    },
                    doctor: {
                        include: {
                            user: true
                        }
                    }
                }
            });
            return __classPrivateFieldGet(this, _VisitDataAccessLayer_instances, "m", _VisitDataAccessLayer_build).call(this, created_visit);
        });
    }
    ;
}
_VisitDataAccessLayer_visit_builder = new WeakMap(), _VisitDataAccessLayer_client_builder = new WeakMap(), _VisitDataAccessLayer_doctor_builder = new WeakMap(), _VisitDataAccessLayer_instances = new WeakSet(), _VisitDataAccessLayer_build = function _VisitDataAccessLayer_build(visit) {
    if (!visit)
        return null;
    const client = __classPrivateFieldGet(this, _VisitDataAccessLayer_client_builder, "f").prismaClient(visit.client).buildClient();
    const doctor = __classPrivateFieldGet(this, _VisitDataAccessLayer_doctor_builder, "f").prismaDoctor(visit.doctor).buildDoctor();
    return (__classPrivateFieldGet(this, _VisitDataAccessLayer_visit_builder, "f")
        .prismaVisit(visit)
        .setClient(client)
        .setDoctor(doctor)
        .buildVisit());
};
export default VisitDataAccessLayer;
