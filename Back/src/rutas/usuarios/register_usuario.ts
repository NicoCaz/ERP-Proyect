import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!isValidEmail(Email)) {
      return res.status(400).json({ error: 'Correo electrónico no válido' });
    }

    const existingUser = await prisma.usuario.findUnique({
      where: { Email },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Usuario existente' });
    }



    const newUser = await prisma.usuario.create({
      data: {
        Email,
        Password: Password
      },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default router;
