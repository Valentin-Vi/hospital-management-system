// import { VisitBuilder, ClientBuilder, DoctorBuilder } from "../builder";
// import { THidratedPrismaVisit, Visit } from "../models";
// import { connect } from "http2";

// class VisitDataAccessLayer extends BaseDataAccessLayer {
 
//   #visit_builder: VisitBuilder;
//   #client_builder: ClientBuilder;
//   #doctor_builder: DoctorBuilder;

//   constructor() {
//     super();
//     this.#visit_builder = new VisitBuilder();
//     this.#client_builder = new ClientBuilder();
//     this.#doctor_builder = new DoctorBuilder();
//   }

//   async create(visit: Visit): Promise<Visit | null> {
//     const created_visit: THidratedPrismaVisit | null = await super.prisma.pVisit.create({
//       data: {
//         creation_date: visit.creation_date,
//         visit_date: visit.visit_date,
//         client: {
//           connect: {
//             clientId: visit.client.clientId
//           }
//         },
//         doctor: {
//           connect: {
//             doctorId: visit.doctor.userId
//           }
//         }
//       },
//       include: {
//         client: {
//           include: {
//             user: true
//           }
//         },
//         doctor: {
//           include: {
//             user: true
//           }
//         }
//       }
//     });
//     return this.#build(created_visit);
//   };

//   #build(visit: THidratedPrismaVisit | null): Visit | null {
//     if(!visit) return null;
//     const client = this.#client_builder.prismaClient(visit.client).buildClient();
//     const doctor = this.#doctor_builder.prismaDoctor(visit.doctor).buildDoctor();
//     return (
//       this.#visit_builder
//         .prismaVisit(visit)
//         .setClient(client)
//         .setDoctor(doctor)
//         .buildVisit()
//     )
//   }
// }

// export default VisitDataAccessLayer;
