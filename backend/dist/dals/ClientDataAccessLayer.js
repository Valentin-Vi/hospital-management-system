var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserDataAccessLayer } from "authentication_project";
import { ClientBuilder } from "../builder";
class ClientDataAccessLayer extends UserDataAccessLayer {
    constructor() {
        super();
        super.builder = new ClientBuilder();
        return this;
    }
    store(client) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const createdClient = yield _super.prisma.pUser.create({
                data: {
                    email: client.email,
                    password: client.password,
                    firstname: client.firstname,
                    lastname: client.lastname,
                    enabled: true,
                    client: {
                        create: {}
                    }
                },
                include: {
                    client: true
                }
            });
            return this.build(createdClient);
        });
    }
    assosiateWithUser(client) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const created_client = yield _super.prisma.pClient.create({
                data: {
                    user: {
                        connect: {
                            user_id: client.user_id
                        }
                    }
                },
                include: { user: true }
            });
            return this.build(created_client);
        });
    }
    fetchById(client_id) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const found_client = yield _super.prisma.pClient.findUnique({
                where: { client_id },
                include: { user: true }
            });
            return this.build(found_client);
        });
    }
    deassociateWithuser(client_id) {
        const _super = Object.create(null, {
            prisma: { get: () => super.prisma }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const deassociated_client = yield _super.prisma.pClient.delete({
                where: { client_id },
                include: { user: true }
            });
            return this.build(deassociated_client);
        });
    }
    build(client) {
        if (!client)
            return null;
        return (this.builder
            .setSafe(this.safe)
            .prismaClient(client)
            .buildClient());
    }
}
;
export default ClientDataAccessLayer;
