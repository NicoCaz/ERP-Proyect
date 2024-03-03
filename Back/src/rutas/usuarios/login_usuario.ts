import express from 'express';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await prisma.usuario.findFirst({
      where: { Email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    if (Password!=user.Password) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
