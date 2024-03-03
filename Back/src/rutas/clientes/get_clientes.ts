import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (_req, res) => {
  const listClient = await prisma.clientes.findMany();
  res.json(listClient);
});

export default router;
