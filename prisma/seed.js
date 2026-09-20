import bcrypt from "bcrypt";
import prisma from "../utils/db.js";


const password = await bcrypt.hash("Admin@12345", 10);

const admin = await prisma.user.upsert({
  where: {
    email: "admin@example.com",
  },
  update: {},
  create: {
    name: "System Admin",
    email: "admin@example.com",
    password,
    role: "ADMIN",
  },
});

console.log("Admin created:", admin.email);

await prisma.$disconnect();
