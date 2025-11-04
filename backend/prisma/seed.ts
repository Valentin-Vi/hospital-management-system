import { PrismaClient } from "@prisma/client";
import hashPassword from "../src/utils/hashPassword";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@mail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin123*";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    create: {
      email: ADMIN_EMAIL,
      password: hashPassword(ADMIN_PASSWORD),
      firstname: "admin",
      lastname: "istrador",
      type: "ADMIN",
      enabled: true,
    },
    update: {
      firstname: "admin",
      lastname: "istrador",
      type: "ADMIN",
      enabled: true,
    },
  });

  if (process.env.ADMIN_PASSWORD) {
    const same = bcrypt.compareSync(ADMIN_PASSWORD, user.password);
    if (!same) {
      await prisma.user.update({
        where: { userId: user.userId },
        data: { password: hashPassword(ADMIN_PASSWORD) },
      });
    }
  }

  await prisma.admin.upsert({
    where: { adminId: user.userId },
    create: {
      users: { connect: { userId: user.userId } },
    },
    update: {
      users: { connect: { userId: user.userId } },
    },
  });

  const medicationData = [
    {
      name: "Paracetamol 500mg",
      category: "Analgesic",
      expiration_date: new Date("2026-03-15"),
      brand_name: "Tylenol",
      generic_name: "Paracetamol",
      strength: "500 mg",
      form: "Tablet",
    },
    {
      name: "Amoxicillin 500mg",
      category: "Antibiotic",
      expiration_date: new Date("2025-11-20"),
      brand_name: "Amoxil",
      generic_name: "Amoxicillin",
      strength: "500 mg",
      form: "Capsule",
    },
    {
      name: "Ibuprofen 400mg",
      category: "NSAID",
      expiration_date: new Date("2026-08-01"),
      brand_name: "Advil",
      generic_name: "Ibuprofen",
      strength: "400 mg",
      form: "Tablet",
    },
    {
      name: "Loratadine 10mg",
      category: "Antihistamine",
      expiration_date: new Date("2027-02-12"),
      brand_name: "Claritin",
      generic_name: "Loratadine",
      strength: "10 mg",
      form: "Tablet",
    },
    {
      name: "Metformin 850mg",
      category: "Antidiabetic",
      expiration_date: new Date("2026-12-30"),
      brand_name: "Glucophage",
      generic_name: "Metformin",
      strength: "850 mg",
      form: "Tablet",
    },
  ];

  const createdMedications = [];

  for (const med of medicationData) {
    let existing = await prisma.medication.findFirst({
      where: {
        name: med.name,
        brand_name: med.brand_name,
      },
    });

    if (!existing) {
      existing = await prisma.medication.create({
        data: med,
      });
    } else {
      existing = await prisma.medication.update({
        where: { medicationId: existing.medicationId },
        data: med,
      });
    }

    createdMedications.push(existing);
  }

  // item presets matching the order above
  const itemPresets = [
    { quantity: 150, minimun_quantity: 50 },
    { quantity: 80, minimun_quantity: 30 },
    { quantity: 120, minimun_quantity: 40 },
    { quantity: 200, minimun_quantity: 60 },
    { quantity: 300, minimun_quantity: 100 },
  ];

  // create or update items based on productId (this IS unique)
  for (let i = 0; i < createdMedications.length; i++) {
    const med = createdMedications[i];
    const preset = itemPresets[i] ?? { quantity: 0, minimun_quantity: 0 };

    await prisma.item.upsert({
      where: { productId: med.medicationId },
      update: {
        quantity: preset.quantity,
        minimun_quantity: preset.minimun_quantity,
      },
      create: {
        productId: med.medicationId,
        quantity: preset.quantity,
        minimun_quantity: preset.minimun_quantity,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
