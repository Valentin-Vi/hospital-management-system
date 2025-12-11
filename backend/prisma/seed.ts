import { PrismaClient } from "@prisma/client";
import hashPassword from "../src/utils/hashPassword";

const prisma = new PrismaClient();

// Admin user data (matches Prisma User model)
const ADMIN = {
  email: 'admin@mail.com',
  password: hashPassword('Admin123*'),
  firstname: 'admin',
  lastname: 'admin',
  enabled: true,
  type: 'ADMIN' as const,
}

// Client user data (matches Prisma User model)
const CLIENT_DATA = [
  {
    email: 'client@mail.com',
    password: hashPassword('Client123*'),
    firstname: 'client',
    lastname: 'client',
    enabled: true,
    type: 'CLIENT' as const,
  }, {
    email: 'client2@mail.com',
    password: hashPassword('Client123*'),
    firstname: 'client2',
    lastname: 'client',
    enabled: true,
    type: 'CLIENT' as const,
  }, {
    email: 'client3@mail.com',
    password: hashPassword('Client123*'),
    firstname: 'client3',
    lastname: 'client',
    enabled: true,
    type: 'CLIENT' as const,
  }
]

// Doctor user data (matches Prisma User model + specialty)
const DOCTOR_DATA = [
  {
    email: 'doctor@mail.com',
    password: hashPassword('Doctor123*'),
    firstname: 'doctor',
    lastname: 'doctor',
    enabled: true,
    specialty: 'Neurologo',
    type: 'DOCTOR' as const
  }, {
    email: 'doctor2@mail.com',
    password: hashPassword('Doctor123*'),
    firstname: 'doctor2',
    lastname: 'doctor',
    enabled: true,
    specialty: 'Psicologo',
    type: 'DOCTOR' as const
  }, {
    email: 'doctor3@mail.com',
    password: hashPassword('Doctor123*'),
    firstname: 'doctor3',
    lastname: 'doctor',
    enabled: true,
    specialty: 'Mingocologo',
    type: 'DOCTOR' as const
  }, {
    email: 'doctor4@mail.com',
    password: hashPassword('Doctor123*'),
    firstname: 'doctor4',
    lastname: 'doctor',
    enabled: true,
    specialty: 'Traumatologo',
    type: 'DOCTOR' as const
  }
]

// Desk user data (matches Prisma User model)
const DESK_DATA = [
  {
    email: 'desk@mail.com',
    password: hashPassword('Desk123*'),
    firstname: 'desk',
    lastname: 'desk',
    enabled: true,
    type: 'DESK' as const
  }, {
    email: 'desk2@mail.com',
    password: hashPassword('Desk123*'),
    firstname: 'desk2',
    lastname: 'desk',
    enabled: true,
    type: 'DESK' as const
  }
]

// Medication data with batch information
// Structure: { medication data, batch data }
interface MedicationWithBatch {
  name: string;
  category: string;
  brand_name: string;
  generic_name: string;
  strength: string;
  form: string;
  minimum_quantity: number;
  batch: {
    quantity: number;
    expiration_date: Date;
  };
}

const MEDICATION_DATA: MedicationWithBatch[] = [
  { name: "Paracetamol 500mg", category: "Analgesic", brand_name: "Tylenol", generic_name: "Paracetamol", strength: "500 mg", form: "Tablet", minimum_quantity: 50, batch: { quantity: 100, expiration_date: new Date("2026-03-15") } },
  { name: "Amoxicillin 500mg", category: "Antibiotic", brand_name: "Amoxil", generic_name: "Amoxicillin", strength: "500 mg", form: "Capsule", minimum_quantity: 30, batch: { quantity: 100, expiration_date: new Date("2025-11-20") } },
  { name: "Ibuprofen 400mg", category: "NSAID", brand_name: "Advil", generic_name: "Ibuprofen", strength: "400 mg", form: "Tablet", minimum_quantity: 40, batch: { quantity: 100, expiration_date: new Date("2026-08-01") } },
  { name: "Loratadine 10mg", category: "Antihistamine", brand_name: "Claritin", generic_name: "Loratadine", strength: "10 mg", form: "Tablet", minimum_quantity: 25, batch: { quantity: 100, expiration_date: new Date("2027-02-12") } },
  { name: "Metformin 850mg", category: "Antidiabetic", brand_name: "Glucophage", generic_name: "Metformin", strength: "850 mg", form: "Tablet", minimum_quantity: 60, batch: { quantity: 100, expiration_date: new Date("2026-12-30") } },
  { name: "Simvastatin 20mg", category: "Antihyperlipidemic", brand_name: "Zocor", generic_name: "Simvastatin", strength: "20 mg", form: "Tablet", minimum_quantity: 80, batch: { quantity: 100, expiration_date: new Date("2027-04-25") } },
  { name: "Omeprazole 20mg", category: "Proton Pump Inhibitor", brand_name: "Prilosec", generic_name: "Omeprazole", strength: "20 mg", form: "Capsule", minimum_quantity: 25, batch: { quantity: 100, expiration_date: new Date("2026-05-10") } },
  { name: "Salbutamol 100mcg", category: "Bronchodilator", brand_name: "Ventolin", generic_name: "Salbutamol", strength: "100 mcg", form: "Inhaler", minimum_quantity: 150, batch: { quantity: 100, expiration_date: new Date("2027-09-12") } },
  { name: "Losartan 50mg", category: "Antihypertensive", brand_name: "Cozaar", generic_name: "Losartan", strength: "50 mg", form: "Tablet", minimum_quantity: 120, batch: { quantity: 100, expiration_date: new Date("2027-06-22") } },
  { name: "Atorvastatin 40mg", category: "Antihyperlipidemic", brand_name: "Lipitor", generic_name: "Atorvastatin", strength: "40 mg", form: "Tablet", minimum_quantity: 100, batch: { quantity: 100, expiration_date: new Date("2026-10-30") } },
  { name: "Furosemide 40mg", category: "Diuretic", brand_name: "Lasix", generic_name: "Furosemide", strength: "40 mg", form: "Tablet", minimum_quantity: 20, batch: { quantity: 100, expiration_date: new Date("2025-09-15") } },
  { name: "Prednisone 10mg", category: "Corticosteroid", brand_name: "Deltasone", generic_name: "Prednisone", strength: "10 mg", form: "Tablet", minimum_quantity: 25, batch: { quantity: 100, expiration_date: new Date("2026-07-05") } },
  { name: "Amlodipine 5mg", category: "Antihypertensive", brand_name: "Norvasc", generic_name: "Amlodipine", strength: "5 mg", form: "Tablet", minimum_quantity: 50, batch: { quantity: 100, expiration_date: new Date("2027-01-20") } },
  { name: "Azithromycin 500mg", category: "Antibiotic", brand_name: "Zithromax", generic_name: "Azithromycin", strength: "500 mg", form: "Tablet", minimum_quantity: 30, batch: { quantity: 100, expiration_date: new Date("2026-03-14") } },
  { name: "Ciprofloxacin 500mg", category: "Antibiotic", brand_name: "Cipro", generic_name: "Ciprofloxacin", strength: "500 mg", form: "Tablet", minimum_quantity: 25, batch: { quantity: 100, expiration_date: new Date("2025-12-01") } },
  { name: "Pantoprazole 40mg", category: "Proton Pump Inhibitor", brand_name: "Protonix", generic_name: "Pantoprazole", strength: "40 mg", form: "Tablet", minimum_quantity: 50, batch: { quantity: 100, expiration_date: new Date("2027-02-05") } },
  { name: "Hydrochlorothiazide 25mg", category: "Diuretic", brand_name: "Microzide", generic_name: "Hydrochlorothiazide", strength: "25 mg", form: "Tablet", minimum_quantity: 80, batch: { quantity: 100, expiration_date: new Date("2027-08-19") } },
  { name: "Clopidogrel 75mg", category: "Antiplatelet", brand_name: "Plavix", generic_name: "Clopidogrel", strength: "75 mg", form: "Tablet", minimum_quantity: 120, batch: { quantity: 100, expiration_date: new Date("2027-09-09") } },
  { name: "Citalopram 20mg", category: "Antidepressant", brand_name: "Celexa", generic_name: "Citalopram", strength: "20 mg", form: "Tablet", minimum_quantity: 400, batch: { quantity: 100, expiration_date: new Date("2026-11-11") } },
  { name: "Diazepam 5mg", category: "Anxiolytic", brand_name: "Valium", generic_name: "Diazepam", strength: "5 mg", form: "Tablet", minimum_quantity: 150, batch: { quantity: 100, expiration_date: new Date("2028-01-01") } },
  { name: "Cetirizine 10mg", category: "Antihistamine", brand_name: "Zyrtec", generic_name: "Cetirizine", strength: "10 mg", form: "Tablet", minimum_quantity: 50, batch: { quantity: 100, expiration_date: new Date("2026-09-22") } },
  { name: "Salbutamol Syrup 2mg/5ml", category: "Bronchodilator", brand_name: "Ventolin Syrup", generic_name: "Salbutamol", strength: "2 mg/5 ml", form: "Syrup", minimum_quantity: 30, batch: { quantity: 100, expiration_date: new Date("2027-03-10") } },
  { name: "Insulin Glargine 100U/ml", category: "Antidiabetic", brand_name: "Lantus", generic_name: "Insulin Glargine", strength: "100 U/ml", form: "Injection", minimum_quantity: 50, batch: { quantity: 100, expiration_date: new Date("2026-04-19") } },
  { name: "Amoxicillin + Clavulanic Acid 625mg", category: "Antibiotic", brand_name: "Augmentin", generic_name: "Amoxicillin + Clavulanic Acid", strength: "625 mg", form: "Tablet", minimum_quantity: 150, batch: { quantity: 100, expiration_date: new Date("2027-05-15") } },
  { name: "Hydrocortisone Cream 1%", category: "Corticosteroid", brand_name: "Cortizone-10", generic_name: "Hydrocortisone", strength: "1%", form: "Cream", minimum_quantity: 120, batch: { quantity: 100, expiration_date: new Date("2027-10-21") } },
  { name: "Acetylsalicylic Acid 100mg", category: "Antiplatelet", brand_name: "Aspirin", generic_name: "Acetylsalicylic Acid", strength: "100 mg", form: "Tablet", minimum_quantity: 50, batch: { quantity: 100, expiration_date: new Date("2026-09-13") } },
  { name: "Levofloxacin 500mg", category: "Antibiotic", brand_name: "Levaquin", generic_name: "Levofloxacin", strength: "500 mg", form: "Tablet", minimum_quantity: 25, batch: { quantity: 100, expiration_date: new Date("2025-08-18") } },
  { name: "Omeprazole Oral Suspension 10mg/ml", category: "Proton Pump Inhibitor", brand_name: "Losec Suspension", generic_name: "Omeprazole", strength: "10 mg/ml", form: "Suspension", minimum_quantity: 80, batch: { quantity: 100, expiration_date: new Date("2027-11-05") } },
  { name: "Acetaminophen 120mg/5ml", category: "Analgesic", brand_name: "Panadol Children", generic_name: "Paracetamol", strength: "120 mg/5 ml", form: "Syrup", minimum_quantity: 30, batch: { quantity: 100, expiration_date: new Date("2026-01-14") } },
];

// Visit data structure (indices will be mapped to actual IDs)
interface VisitDataStructure {
  visit_date: Date;
  clientIndex: number; // Index in CLIENT_DATA array (0-based)
  doctorIndex: number; // Index in DOCTOR_DATA array (0-based)
}

const VISIT_DATA_STRUCTURE: VisitDataStructure[] = [
  {
    visit_date: new Date("2025-01-05T10:00:00"),
    clientIndex: 0, // First client
    doctorIndex: 0, // First doctor
  },
  {
    visit_date: new Date("2025-01-10T14:30:00"),
    clientIndex: 0, // First client
    doctorIndex: 1, // Second doctor
  },
  {
    visit_date: new Date("2025-02-02T09:15:00"),
    clientIndex: 1, // Second client
    doctorIndex: 0, // First doctor
  },
  {
    visit_date: new Date("2025-02-12T16:00:00"),
    clientIndex: 1, // Second client
    doctorIndex: 3, // Fourth doctor
  },
  {
    visit_date: new Date("2025-03-01T11:45:00"),
    clientIndex: 2, // Third client
    doctorIndex: 2, // Third doctor
  },
  {
    visit_date: new Date("2025-03-22T08:30:00"),
    clientIndex: 2, // Third client
    doctorIndex: 1, // Second doctor
  },
  {
    visit_date: new Date("2025-04-10T15:00:00"),
    clientIndex: 0, // First client
    doctorIndex: 3, // Fourth doctor
  },
  {
    visit_date: new Date("2025-04-18T12:10:00"),
    clientIndex: 1, // Second client
    doctorIndex: 2, // Third doctor
  },
  {
    visit_date: new Date("2025-05-03T13:20:00"),
    clientIndex: 2, // Third client
    doctorIndex: 0, // First doctor
  }
];

async function main() {
  // Create ADMIN user
  const adminUser = await prisma.user.upsert({
    where: { email: ADMIN.email },
    create: ADMIN,
    update: ADMIN,
  });

  // Create Admin record
  await prisma.admin.upsert({
    where: { adminId: adminUser.userId },
    create: { adminId: adminUser.userId },
    update: { adminId: adminUser.userId },
  });

  // Create CLIENT users
  const clientUsers: Array<{ userId: number; email: string; [key: string]: any }> = [];
  for (const c of CLIENT_DATA) {
    const user = await prisma.user.upsert({
      where: { email: c.email },
      create: c,
      update: c
    });
    clientUsers.push(user);
  }

  // Create Client records
  for (const user of clientUsers) {
    await prisma.client.upsert({
      where: { clientId: user.userId },
      create: { clientId: user.userId },
      update: { clientId: user.userId },
    });
  }

  // Create DOCTOR users
  const doctorUsers: Array<{ user: { userId: number; email: string; [key: string]: any }; specialty: string }> = [];
  for (const d of DOCTOR_DATA) {
    const { specialty, ...userData } = d;
    const user = await prisma.user.upsert({
      where: { email: d.email },
      create: userData,
      update: userData
    });
    doctorUsers.push({ user, specialty });
  }

  // Create Doctor records
  for (const { user, specialty } of doctorUsers) {
    await prisma.doctor.upsert({
      where: { doctorId: user.userId },
      create: {
        doctorId: user.userId,
        specialty: specialty
      },
      update: {
        doctorId: user.userId,
        specialty: specialty
      },
    });
  }

  // Create DESK users
  const deskUsers = [];
  for (const d of DESK_DATA) {
    const user = await prisma.user.upsert({
      where: { email: d.email },
      create: d,
      update: d
    });
    deskUsers.push(user);
  }

  // Create Desk records
  for (const user of deskUsers) {
    await prisma.desk.upsert({
      where: { deskId: user.userId },
      create: { deskId: user.userId },
      update: { deskId: user.userId },
    });
  }

  // Create MEDICATIONS and their BATCHES
  for (const medData of MEDICATION_DATA) {
    const { batch, ...medicationData } = medData;
    
    try {
      // Check if medication already exists
      const existingMedication = await prisma.medication.findFirst({
        where: { name: medicationData.name }
      });

      let medication;
      if (existingMedication) {
        // Update existing medication
        medication = await prisma.medication.update({
          where: { medicationId: existingMedication.medicationId },
          data: medicationData
        });
      } else {
        // Create new medication
        medication = await prisma.medication.create({
          data: medicationData
        });
      }

      // Create batch for medication (skip if already exists for this medication)
      const existingBatch = await prisma.batch.findFirst({
        where: {
          medicationId: medication.medicationId,
          expiration_date: batch.expiration_date
        }
      });

      if (!existingBatch) {
        await prisma.batch.create({
          data: {
            medicationId: medication.medicationId,
            quantity: batch.quantity,
            expiration_date: batch.expiration_date,
          }
        });
      }
    } catch (error) {
      console.error(`Error seeding medication ${medicationData.name}:`, error);
      // Continue with next medication
    }
  }

  // Create VISITS using actual client and doctor IDs
  const visitsToCreate = VISIT_DATA_STRUCTURE.map(visitData => {
    const client = clientUsers[visitData.clientIndex];
    const doctor = doctorUsers[visitData.doctorIndex];
    
    if (!client || !doctor) {
      throw new Error(`Invalid visit data: clientIndex ${visitData.clientIndex} or doctorIndex ${visitData.doctorIndex} out of range`);
    }
    
    return {
      visit_date: visitData.visit_date,
      clientId: client.userId,
      doctorId: doctor.user.userId,
    };
  });

  await prisma.visit.createMany({ 
    data: visitsToCreate,
    skipDuplicates: true 
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
