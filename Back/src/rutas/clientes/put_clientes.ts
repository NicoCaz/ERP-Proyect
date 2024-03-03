import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.put("/", async (req, res) => {
  console.log(req.body);
  const actClient = await prisma.clientes.update({
    where: { Id: req.body.Id },
    data: req.body,
  });
  res.json(actClient);
});

export default router;
