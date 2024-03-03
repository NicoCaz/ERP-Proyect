import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body);
    const newClient = await prisma.clientes.create({
      data: {
        Name: req.body.Name,
        Address: req.body.Address,
      },
    });

    res.json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear un nuevo cliente" });
  }
});

export default router;
