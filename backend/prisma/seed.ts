import { PrismaClient } from "@prisma/client";
import hashPassword from "../src/utils/hashPassword";
import { TAdminSchema, TClientSchema, TDeskSchema, TDoctorSchema, TMedicationSchema } from "@models/schemas";

const prisma = new PrismaClient();

const ADMIN: Omit<TAdminSchema, "admin_id" | "userId"> = {
  email: 'admin@mail.com',
  password: hashPassword('Admin123*'),
  firstname: 'admin',
  lastname: 'admin',
  enabled: true,
  type: 'ADMIN',
}

const CLIENT_DATA: Omit<TClientSchema, 'visits' | 'userId' | 'clientId'>[] = [
  {
    email: 'client@mail.com',
    password: hashPassword('Client123*'),
    firstname: 'client',
    lastname: 'client',
    enabled: true,
    type: 'CLIENT',
  }, {
    email: 'client2@mail.com',
    password: hashPassword('Client123*'),
    firstname: 'client2',
    lastname: 'client',
    enabled: true,
    type: 'CLIENT',
  }, {
    email: 'client3@mail.com',
    password: hashPassword('Client123*'),
    firstname: 'client3',
    lastname: 'client',
    enabled: true,
    type: 'CLIENT',
  }
]

const DOCTOR_DATA: Omit<TDoctorSchema, 'userId' | 'doctorId' | 'visits'>[] = [
  {
    email: 'doctor@mail.com',
    password: hashPassword('Doctor123*'),
    firstname: 'doctor',
    lastname: 'doctor',
    enabled: true,
    specialty: 'Neurologo',
    type: 'DOCTOR'
  }, {
    email: 'doctor2@mail.com',
    password: hashPassword('Doctor123*'),
    firstname: 'doctor2',
    lastname: 'doctor',
    enabled: true,
    specialty: 'Psicologo',
    type: 'DOCTOR'
  }, {
    email: 'doctor2@mail.com',
    password: hashPassword('Doctor123*'),
    firstname: 'doctor2',
    lastname: 'doctor',
    enabled: true,
    specialty: 'Mingocologo',
    type: 'DOCTOR'
  }, {
    email: 'doctor3@mail.com',
    password: hashPassword('Doctor123*'),
    firstname: 'doctor3',
    lastname: 'doctor',
    enabled: true,
    specialty: 'Traumatologo',
    type: 'DOCTOR'
  }
]

const DESK_DATA: Omit<TDeskSchema, 'userId' | 'deskId'>[] = [
  {
    email: 'desk@mail.com',
    password: hashPassword('Desk123*'),
    firstname: 'desk',
    lastname: 'desk',
    enabled: true,
    type: 'DESK'
  }, {
    email: 'desk2@mail.com',
    password: hashPassword('Desk123*'),
    firstname: 'desk2',
    lastname: 'desk',
    enabled: true,
    type: 'DESK'
  }
]

const MEDICATION_DATA: Omit<TMedicationSchema, 'medicationId'>[] = [
  {
    name: "Paracetamol 500mg",
    category: "Analgesic",
    brandName: "Tylenol",
    genericName: "Paracetamol",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-03-15") }]
    }
  },
  {
    name: "Amoxicillin 500mg",
    category: "Antibiotic",
    brandName: "Amoxil",
    genericName: "Amoxicillin",
    strength: "500 mg",
    form: "Capsule",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-11-20") }]
    }
  },
  {
    name: "Ibuprofen 400mg",
    category: "NSAID",
    brandName: "Advil",
    genericName: "Ibuprofen",
    strength: "400 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-08-01") }]
    }
  },
  {
    name: "Loratadine 10mg",
    category: "Antihistamine",
    brandName: "Claritin",
    genericName: "Loratadine",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-02-12") }]
    }
  },
  {
    name: "Metformin 850mg",
    category: "Antidiabetic",
    brandName: "Glucophage",
    genericName: "Metformin",
    strength: "850 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-12-30") }]
    }
  },
  {
    name: "Simvastatin 20mg",
    category: "Antihyperlipidemic",
    brandName: "Zocor",
    genericName: "Simvastatin",
    strength: "20 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-04-25") }]
    }
  },
  {
    name: "Omeprazole 20mg",
    category: "Proton Pump Inhibitor",
    brandName: "Prilosec",
    genericName: "Omeprazole",
    strength: "20 mg",
    form: "Capsule",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-05-10") }]
    }
  },
  {
    name: "Salbutamol 100mcg",
    category: "Bronchodilator",
    brandName: "Ventolin",
    genericName: "Salbutamol",
    strength: "100 mcg",
    form: "Inhaler",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-09-12") }]
    }
  },
  {
    name: "Losartan 50mg",
    category: "Antihypertensive",
    brandName: "Cozaar",
    genericName: "Losartan",
    strength: "50 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-06-22") }]
    }
  },
  {
    name: "Atorvastatin 40mg",
    category: "Antihyperlipidemic",
    brandName: "Lipitor",
    genericName: "Atorvastatin",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-10-30") }]
    }
  },
  {
    name: "Furosemide 40mg",
    category: "Diuretic",
    brandName: "Lasix",
    genericName: "Furosemide",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-09-15") }]
    }
  },
  {
    name: "Prednisone 10mg",
    category: "Corticosteroid",
    brandName: "Deltasone",
    genericName: "Prednisone",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-07-05") }]
    }
  },
  {
    name: "Amlodipine 5mg",
    category: "Antihypertensive",
    brandName: "Norvasc",
    genericName: "Amlodipine",
    strength: "5 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-01-20") }]
    }
  },
  {
    name: "Azithromycin 500mg",
    category: "Antibiotic",
    brandName: "Zithromax",
    genericName: "Azithromycin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-03-14") }]
    }
  },
  {
    name: "Ciprofloxacin 500mg",
    category: "Antibiotic",
    brandName: "Cipro",
    genericName: "Ciprofloxacin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-12-01") }]
    }
  },
  {
    name: "Pantoprazole 40mg",
    category: "Proton Pump Inhibitor",
    brandName: "Protonix",
    genericName: "Pantoprazole",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-02-05") }]
    }
  },
  {
    name: "Hydrochlorothiazide 25mg",
    category: "Diuretic",
    brandName: "Microzide",
    genericName: "Hydrochlorothiazide",
    strength: "25 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-08-19") }]
    }
  },
  {
    name: "Clopidogrel 75mg",
    category: "Antiplatelet",
    brandName: "Plavix",
    genericName: "Clopidogrel",
    strength: "75 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-09-09") }]
    }
  },
  {
    name: "Citalopram 20mg",
    category: "Antidepressant",
    brandName: "Celexa",
    genericName: "Citalopram",
    strength: "20 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-11-11") }]
    }
  },
  {
    name: "Diazepam 5mg",
    category: "Anxiolytic",
    brandName: "Valium",
    genericName: "Diazepam",
    strength: "5 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2028-01-01") }]
    }
  },
  {
    name: "Cetirizine 10mg",
    category: "Antihistamine",
    brandName: "Zyrtec",
    genericName: "Cetirizine",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-09-22") }]
    }
  },
  {
    name: "Salbutamol Syrup 2mg/5ml",
    category: "Bronchodilator",
    brandName: "Ventolin Syrup",
    genericName: "Salbutamol",
    strength: "2 mg/5 ml",
    form: "Syrup",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-03-10") }]
    }
  },
  {
    name: "Insulin Glargine 100U/ml",
    category: "Antidiabetic",
    brandName: "Lantus",
    genericName: "Insulin Glargine",
    strength: "100 U/ml",
    form: "Injection",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-04-19") }]
    }
  },
  {
    name: "Amoxicillin + Clavulanic Acid 625mg",
    category: "Antibiotic",
    brandName: "Augmentin",
    genericName: "Amoxicillin + Clavulanic Acid",
    strength: "625 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-05-15") }]
    }
  },
  {
    name: "Hydrocortisone Cream 1%",
    category: "Corticosteroid",
    brandName: "Cortizone-10",
    genericName: "Hydrocortisone",
    strength: "1%",
    form: "Cream",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-10-21") }]
    }
  },
  {
    name: "Acetylsalicylic Acid 100mg",
    category: "Antiplatelet",
    brandName: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    strength: "100 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-09-13") }]
    }
  },
  {
    name: "Levofloxacin 500mg",
    category: "Antibiotic",
    brandName: "Levaquin",
    genericName: "Levofloxacin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-08-18") }]
    }
  },
  {
    name: "Omeprazole Oral Suspension 10mg/ml",
    category: "Proton Pump Inhibitor",
    brandName: "Losec Suspension",
    genericName: "Omeprazole",
    strength: "10 mg/ml",
    form: "Suspension",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-11-05") }]
    }
  },
  {
    name: "Acetaminophen 120mg/5ml",
    category: "Analgesic",
    brandName: "Panadol Children",
    genericName: "Paracetamol",
    strength: "120 mg/5 ml",
    form: "Syrup",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-01-14") }]
    }
  },
  {
    name: "Paracetamol 500mg",
    category: "Analgesic",
    brandName: "Tylenol",
    genericName: "Paracetamol",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-03-15") }]
    }
  },
  {
    name: "Amoxicillin 500mg",
    category: "Antibiotic",
    brandName: "Amoxil",
    genericName: "Amoxicillin",
    strength: "500 mg",
    form: "Capsule",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-11-20") }]
    }
  },
  {
    name: "Ibuprofen 400mg",
    category: "NSAID",
    brandName: "Advil",
    genericName: "Ibuprofen",
    strength: "400 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-08-01") }]
    }
  },
  {
    name: "Loratadine 10mg",
    category: "Antihistamine",
    brandName: "Claritin",
    genericName: "Loratadine",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-02-12") }]
    }
  },
  {
    name: "Metformin 850mg",
    category: "Antidiabetic",
    brandName: "Glucophage",
    genericName: "Metformin",
    strength: "850 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-12-30") }]
    }
  },
  {
    name: "Simvastatin 20mg",
    category: "Antihyperlipidemic",
    brandName: "Zocor",
    genericName: "Simvastatin",
    strength: "20 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-04-25") }]
    }
  },
  {
    name: "Omeprazole 20mg",
    category: "Proton Pump Inhibitor",
    brandName: "Prilosec",
    genericName: "Omeprazole",
    strength: "20 mg",
    form: "Capsule",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-05-10") }]
    }
  },
  {
    name: "Salbutamol 100mcg",
    category: "Bronchodilator",
    brandName: "Ventolin",
    genericName: "Salbutamol",
    strength: "100 mcg",
    form: "Inhaler",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-09-12") }]
    }
  },
  {
    name: "Losartan 50mg",
    category: "Antihypertensive",
    brandName: "Cozaar",
    genericName: "Losartan",
    strength: "50 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-06-22") }]
    }
  },
  {
    name: "Atorvastatin 40mg",
    category: "Antihyperlipidemic",
    brandName: "Lipitor",
    genericName: "Atorvastatin",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-10-30") }]
    }
  },
  {
    name: "Furosemide 40mg",
    category: "Diuretic",
    brandName: "Lasix",
    genericName: "Furosemide",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-09-15") }]
    }
  },
  {
    name: "Prednisone 10mg",
    category: "Corticosteroid",
    brandName: "Deltasone",
    genericName: "Prednisone",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-07-05") }]
    }
  },
  {
    name: "Amlodipine 5mg",
    category: "Antihypertensive",
    brandName: "Norvasc",
    genericName: "Amlodipine",
    strength: "5 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-01-20") }]
    }
  },
  {
    name: "Azithromycin 500mg",
    category: "Antibiotic",
    brandName: "Zithromax",
    genericName: "Azithromycin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-03-14") }]
    }
  },
  {
    name: "Ciprofloxacin 500mg",
    category: "Antibiotic",
    brandName: "Cipro",
    genericName: "Ciprofloxacin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-12-01") }]
    }
  },
  {
    name: "Pantoprazole 40mg",
    category: "Proton Pump Inhibitor",
    brandName: "Protonix",
    genericName: "Pantoprazole",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-02-05") }]
    }
  },
  {
    name: "Hydrochlorothiazide 25mg",
    category: "Diuretic",
    brandName: "Microzide",
    genericName: "Hydrochlorothiazide",
    strength: "25 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-08-19") }]
    }
  },
  {
    name: "Clopidogrel 75mg",
    category: "Antiplatelet",
    brandName: "Plavix",
    genericName: "Clopidogrel",
    strength: "75 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-09-09") }]
    }
  },
  {
    name: "Citalopram 20mg",
    category: "Antidepressant",
    brandName: "Celexa",
    genericName: "Citalopram",
    strength: "20 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-11-11") }]
    }
  },
  {
    name: "Diazepam 5mg",
    category: "Anxiolytic",
    brandName: "Valium",
    genericName: "Diazepam",
    strength: "5 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2028-01-01") }]
    }
  },
  {
    name: "Cetirizine 10mg",
    category: "Antihistamine",
    brandName: "Zyrtec",
    genericName: "Cetirizine",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-09-22") }]
    }
  },
  {
    name: "Salbutamol Syrup 2mg/5ml",
    category: "Bronchodilator",
    brandName: "Ventolin Syrup",
    genericName: "Salbutamol",
    strength: "2 mg/5 ml",
    form: "Syrup",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-03-10") }]
    }
  },
  {
    name: "Insulin Glargine 100U/ml",
    category: "Antidiabetic",
    brandName: "Lantus",
    genericName: "Insulin Glargine",
    strength: "100 U/ml",
    form: "Injection",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-04-19") }]
    }
  },
  {
    name: "Amoxicillin + Clavulanic Acid 625mg",
    category: "Antibiotic",
    brandName: "Augmentin",
    genericName: "Amoxicillin + Clavulanic Acid",
    strength: "625 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-05-15") }]
    }
  },
  {
    name: "Hydrocortisone Cream 1%",
    category: "Corticosteroid",
    brandName: "Cortizone-10",
    genericName: "Hydrocortisone",
    strength: "1%",
    form: "Cream",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-10-21") }]
    }
  },
  {
    name: "Acetylsalicylic Acid 100mg",
    category: "Antiplatelet",
    brandName: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    strength: "100 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-09-13") }]
    }
  },
  {
    name: "Levofloxacin 500mg",
    category: "Antibiotic",
    brandName: "Levaquin",
    genericName: "Levofloxacin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-08-18") }]
    }
  },
  {
    name: "Omeprazole Oral Suspension 10mg/ml",
    category: "Proton Pump Inhibitor",
    brandName: "Losec Suspension",
    genericName: "Omeprazole",
    strength: "10 mg/ml",
    form: "Suspension",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-11-05") }]
    }
  },
  {
    name: "Acetaminophen 120mg/5ml",
    category: "Analgesic",
    brandName: "Panadol Children",
    genericName: "Paracetamol",
    strength: "120 mg/5 ml",
    form: "Syrup",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-01-14") }]
    }
  },
  {
    name: "Paracetamol 500mg",
    category: "Analgesic",
    brandName: "Tylenol",
    genericName: "Paracetamol",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-03-15") }]
    }
  },
  {
    name: "Amoxicillin 500mg",
    category: "Antibiotic",
    brandName: "Amoxil",
    genericName: "Amoxicillin",
    strength: "500 mg",
    form: "Capsule",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-11-20") }]
    }
  },
  {
    name: "Ibuprofen 400mg",
    category: "NSAID",
    brandName: "Advil",
    genericName: "Ibuprofen",
    strength: "400 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-08-01") }]
    }
  },
  {
    name: "Loratadine 10mg",
    category: "Antihistamine",
    brandName: "Claritin",
    genericName: "Loratadine",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-02-12") }]
    }
  },
  {
    name: "Metformin 850mg",
    category: "Antidiabetic",
    brandName: "Glucophage",
    genericName: "Metformin",
    strength: "850 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-12-30") }]
    }
  },
  {
    name: "Simvastatin 20mg",
    category: "Antihyperlipidemic",
    brandName: "Zocor",
    genericName: "Simvastatin",
    strength: "20 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-04-25") }]
    }
  },
  {
    name: "Omeprazole 20mg",
    category: "Proton Pump Inhibitor",
    brandName: "Prilosec",
    genericName: "Omeprazole",
    strength: "20 mg",
    form: "Capsule",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-05-10") }]
    }
  },
  {
    name: "Salbutamol 100mcg",
    category: "Bronchodilator",
    brandName: "Ventolin",
    genericName: "Salbutamol",
    strength: "100 mcg",
    form: "Inhaler",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-09-12") }]
    }
  },
  {
    name: "Losartan 50mg",
    category: "Antihypertensive",
    brandName: "Cozaar",
    genericName: "Losartan",
    strength: "50 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-06-22") }]
    }
  },
  {
    name: "Atorvastatin 40mg",
    category: "Antihyperlipidemic",
    brandName: "Lipitor",
    genericName: "Atorvastatin",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-10-30") }]
    }
  },
  {
    name: "Furosemide 40mg",
    category: "Diuretic",
    brandName: "Lasix",
    genericName: "Furosemide",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-09-15") }]
    }
  },
  {
    name: "Prednisone 10mg",
    category: "Corticosteroid",
    brandName: "Deltasone",
    genericName: "Prednisone",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-07-05") }]
    }
  },
  {
    name: "Amlodipine 5mg",
    category: "Antihypertensive",
    brandName: "Norvasc",
    genericName: "Amlodipine",
    strength: "5 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-01-20") }]
    }
  },
  {
    name: "Azithromycin 500mg",
    category: "Antibiotic",
    brandName: "Zithromax",
    genericName: "Azithromycin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-03-14") }]
    }
  },
  {
    name: "Ciprofloxacin 500mg",
    category: "Antibiotic",
    brandName: "Cipro",
    genericName: "Ciprofloxacin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-12-01") }]
    }
  },
  {
    name: "Pantoprazole 40mg",
    category: "Proton Pump Inhibitor",
    brandName: "Protonix",
    genericName: "Pantoprazole",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-02-05") }]
    }
  },
  {
    name: "Hydrochlorothiazide 25mg",
    category: "Diuretic",
    brandName: "Microzide",
    genericName: "Hydrochlorothiazide",
    strength: "25 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-08-19") }]
    }
  },
  {
    name: "Clopidogrel 75mg",
    category: "Antiplatelet",
    brandName: "Plavix",
    genericName: "Clopidogrel",
    strength: "75 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-09-09") }]
    }
  },
  {
    name: "Citalopram 20mg",
    category: "Antidepressant",
    brandName: "Celexa",
    genericName: "Citalopram",
    strength: "20 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-11-11") }]
    }
  },
  {
    name: "Diazepam 5mg",
    category: "Anxiolytic",
    brandName: "Valium",
    genericName: "Diazepam",
    strength: "5 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2028-01-01") }]
    }
  },
  {
    name: "Cetirizine 10mg",
    category: "Antihistamine",
    brandName: "Zyrtec",
    genericName: "Cetirizine",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-09-22") }]
    }
  },
  {
    name: "Salbutamol Syrup 2mg/5ml",
    category: "Bronchodilator",
    brandName: "Ventolin Syrup",
    genericName: "Salbutamol",
    strength: "2 mg/5 ml",
    form: "Syrup",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-03-10") }]
    }
  },
  {
    name: "Insulin Glargine 100U/ml",
    category: "Antidiabetic",
    brandName: "Lantus",
    genericName: "Insulin Glargine",
    strength: "100 U/ml",
    form: "Injection",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-04-19") }]
    }
  },
  {
    name: "Amoxicillin + Clavulanic Acid 625mg",
    category: "Antibiotic",
    brandName: "Augmentin",
    genericName: "Amoxicillin + Clavulanic Acid",
    strength: "625 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-05-15") }]
    }
  },
  {
    name: "Hydrocortisone Cream 1%",
    category: "Corticosteroid",
    brandName: "Cortizone-10",
    genericName: "Hydrocortisone",
    strength: "1%",
    form: "Cream",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-10-21") }]
    }
  },
  {
    name: "Acetylsalicylic Acid 100mg",
    category: "Antiplatelet",
    brandName: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    strength: "100 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-09-13") }]
    }
  },
  {
    name: "Levofloxacin 500mg",
    category: "Antibiotic",
    brandName: "Levaquin",
    genericName: "Levofloxacin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-08-18") }]
    }
  },
  {
    name: "Omeprazole Oral Suspension 10mg/ml",
    category: "Proton Pump Inhibitor",
    brandName: "Losec Suspension",
    genericName: "Omeprazole",
    strength: "10 mg/ml",
    form: "Suspension",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-11-05") }]
    }
  },
  {
    name: "Acetaminophen 120mg/5ml",
    category: "Analgesic",
    brandName: "Panadol Children",
    genericName: "Paracetamol",
    strength: "120 mg/5 ml",
    form: "Syrup",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-01-14") }]
    }
  },
  {
    name: "Paracetamol 500mg",
    category: "Analgesic",
    brandName: "Tylenol",
    genericName: "Paracetamol",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-03-15") }]
    }
  },
  {
    name: "Amoxicillin 500mg",
    category: "Antibiotic",
    brandName: "Amoxil",
    genericName: "Amoxicillin",
    strength: "500 mg",
    form: "Capsule",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-11-20") }]
    }
  },
  {
    name: "Ibuprofen 400mg",
    category: "NSAID",
    brandName: "Advil",
    genericName: "Ibuprofen",
    strength: "400 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-08-01") }]
    }
  },
  {
    name: "Loratadine 10mg",
    category: "Antihistamine",
    brandName: "Claritin",
    genericName: "Loratadine",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-02-12") }]
    }
  },
  {
    name: "Metformin 850mg",
    category: "Antidiabetic",
    brandName: "Glucophage",
    genericName: "Metformin",
    strength: "850 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-12-30") }]
    }
  },
  {
    name: "Simvastatin 20mg",
    category: "Antihyperlipidemic",
    brandName: "Zocor",
    genericName: "Simvastatin",
    strength: "20 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-04-25") }]
    }
  },
  {
    name: "Omeprazole 20mg",
    category: "Proton Pump Inhibitor",
    brandName: "Prilosec",
    genericName: "Omeprazole",
    strength: "20 mg",
    form: "Capsule",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-05-10") }]
    }
  },
  {
    name: "Salbutamol 100mcg",
    category: "Bronchodilator",
    brandName: "Ventolin",
    genericName: "Salbutamol",
    strength: "100 mcg",
    form: "Inhaler",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-09-12") }]
    }
  },
  {
    name: "Losartan 50mg",
    category: "Antihypertensive",
    brandName: "Cozaar",
    genericName: "Losartan",
    strength: "50 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-06-22") }]
    }
  },
  {
    name: "Atorvastatin 40mg",
    category: "Antihyperlipidemic",
    brandName: "Lipitor",
    genericName: "Atorvastatin",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-10-30") }]
    }
  },
  {
    name: "Furosemide 40mg",
    category: "Diuretic",
    brandName: "Lasix",
    genericName: "Furosemide",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-09-15") }]
    }
  },
  {
    name: "Prednisone 10mg",
    category: "Corticosteroid",
    brandName: "Deltasone",
    genericName: "Prednisone",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-07-05") }]
    }
  },
  {
    name: "Amlodipine 5mg",
    category: "Antihypertensive",
    brandName: "Norvasc",
    genericName: "Amlodipine",
    strength: "5 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-01-20") }]
    }
  },
  {
    name: "Azithromycin 500mg",
    category: "Antibiotic",
    brandName: "Zithromax",
    genericName: "Azithromycin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-03-14") }]
    }
  },
  {
    name: "Ciprofloxacin 500mg",
    category: "Antibiotic",
    brandName: "Cipro",
    genericName: "Ciprofloxacin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-12-01") }]
    }
  },
  {
    name: "Pantoprazole 40mg",
    category: "Proton Pump Inhibitor",
    brandName: "Protonix",
    genericName: "Pantoprazole",
    strength: "40 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-02-05") }]
    }
  },
  {
    name: "Hydrochlorothiazide 25mg",
    category: "Diuretic",
    brandName: "Microzide",
    genericName: "Hydrochlorothiazide",
    strength: "25 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-08-19") }]
    }
  },
  {
    name: "Clopidogrel 75mg",
    category: "Antiplatelet",
    brandName: "Plavix",
    genericName: "Clopidogrel",
    strength: "75 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-09-09") }]
    }
  },
  {
    name: "Citalopram 20mg",
    category: "Antidepressant",
    brandName: "Celexa",
    genericName: "Citalopram",
    strength: "20 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-11-11") }]
    }
  },
  {
    name: "Diazepam 5mg",
    category: "Anxiolytic",
    brandName: "Valium",
    genericName: "Diazepam",
    strength: "5 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2028-01-01") }]
    }
  },
  {
    name: "Cetirizine 10mg",
    category: "Antihistamine",
    brandName: "Zyrtec",
    genericName: "Cetirizine",
    strength: "10 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-09-22") }]
    }
  },
  {
    name: "Salbutamol Syrup 2mg/5ml",
    category: "Bronchodilator",
    brandName: "Ventolin Syrup",
    genericName: "Salbutamol",
    strength: "2 mg/5 ml",
    form: "Syrup",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-03-10") }]
    }
  },
  {
    name: "Insulin Glargine 100U/ml",
    category: "Antidiabetic",
    brandName: "Lantus",
    genericName: "Insulin Glargine",
    strength: "100 U/ml",
    form: "Injection",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-04-19") }]
    }
  },
  {
    name: "Amoxicillin + Clavulanic Acid 625mg",
    category: "Antibiotic",
    brandName: "Augmentin",
    genericName: "Amoxicillin + Clavulanic Acid",
    strength: "625 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-05-15") }]
    }
  },
  {
    name: "Hydrocortisone Cream 1%",
    category: "Corticosteroid",
    brandName: "Cortizone-10",
    genericName: "Hydrocortisone",
    strength: "1%",
    form: "Cream",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-10-21") }]
    }
  },
  {
    name: "Acetylsalicylic Acid 100mg",
    category: "Antiplatelet",
    brandName: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    strength: "100 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-09-13") }]
    }
  },
  {
    name: "Levofloxacin 500mg",
    category: "Antibiotic",
    brandName: "Levaquin",
    genericName: "Levofloxacin",
    strength: "500 mg",
    form: "Tablet",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2025-08-18") }]
    }
  },
  {
    name: "Omeprazole Oral Suspension 10mg/ml",
    category: "Proton Pump Inhibitor",
    brandName: "Losec Suspension",
    genericName: "Omeprazole",
    strength: "10 mg/ml",
    form: "Suspension",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2027-11-05") }]
    }
  },
  {
    name: "Acetaminophen 120mg/5ml",
    category: "Analgesic",
    brandName: "Panadol Children",
    genericName: "Paracetamol",
    strength: "120 mg/5 ml",
    form: "Syrup",
    batches: {
      create: [{ quantity: 100, expiration_date: new Date("2026-01-14") }]
    }
  }
];

export const VISIT_DATA = [
  {
    visit_date: new Date("2025-01-05T10:00:00"),
    clientId: 1,
    doctorId: 1,
  },
  {
    visit_date: new Date("2025-01-10T14:30:00"),
    clientId: 1,
    doctorId: 2,
  },
  {
    visit_date: new Date("2025-02-02T09:15:00"),
    clientId: 2,
    doctorId: 1,
  },
  {
    visit_date: new Date("2025-02-12T16:00:00"),
    clientId: 2,
    doctorId: 4,
  },
  {
    visit_date: new Date("2025-03-01T11:45:00"),
    clientId: 3,
    doctorId: 3,
  },
  {
    visit_date: new Date("2025-03-22T08:30:00"),
    clientId: 3,
    doctorId: 2,
  },
  {
    visit_date: new Date("2025-04-10T15:00:00"),
    clientId: 1,
    doctorId: 4,
  },
  {
    visit_date: new Date("2025-04-18T12:10:00"),
    clientId: 2,
    doctorId: 3,
  },
  {
    visit_date: new Date("2025-05-03T13:20:00"),
    clientId: 3,
    doctorId: 1,
  }
];

async function main() {
  // Create mock ADMIN user
  await prisma.user.upsert({
    where: { email: ADMIN.email },
    create: ADMIN,
    update: ADMIN,
  });

  // Create mock CLIENT users
  for(const c of CLIENT_DATA) {
    await prisma.user.upsert({
      where: { email: c.email },
      create: c,
      update: c
    })
  }

  // Create mock MEDICATION rows
  await prisma.medication.createMany({
    data: MEDICATION_DATA
  })

  // Create mock DESK users
  for(const d of DESK_DATA) {
    await prisma.user.upsert({
      where: { email: d.email },
      create: d,
      update: d
    })
  }

  // Create mock DOCTOR users
  for(const d of DOCTOR_DATA) {
    await prisma.user.upsert({
      where: { email: d.email },
      create: d,
      update: d
    })
  }

  // Create mock VISIT rows 
  await prisma.visit.createMany({ data: VISIT_DATA })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
