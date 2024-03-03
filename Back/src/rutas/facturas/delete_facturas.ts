import express  from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router()
const prisma =new PrismaClient()

router.delete('/facturas/:id', async (req, res) => {
    try {
      const invoiceId = parseInt(req.params.id, 10);
  
      // Verificar si la factura existe
      const facturaExistente = await prisma.invoice.findUnique({
        where: { Id: invoiceId },
      });
  
      if (!facturaExistente) {
        return res.status(404).json({ message: 'Factura no encontrada' });
      }
  
      // Eliminar la factura y sus productos asociados
      await prisma.invoice.delete({
        where: { Id: invoiceId },
      });
  
      res.status(204).send(); // Respuesta exitosa sin contenido
    } catch (error) {
      console.error('Error al eliminar la factura:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  