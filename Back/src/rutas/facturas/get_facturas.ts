import express  from 'express';
import { PrismaClient } from '@prisma/client';
const prisma =new PrismaClient()
const router = express.Router()


router.get('/facturas', async (_req, res) => {
    try {
      const facturas = await prisma.invoice.findMany({
        include: {
          ProductsInvoice: true,
        },
      });
  
      res.status(200).json(facturas);
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Endpoint para obtener una factura por ID
  router.get('/facturas/:id', async (req, res) => {
    try {
      const facturaId = parseInt(req.params.id, 10);
  
      const factura = await prisma.invoice.findUnique({
        where: { Id: facturaId },
        include: {
          ProductsInvoice: true,
        },
      });
  
      if (!factura) {
        return res.status(404).json({ message: 'Factura no encontrada' });
      }
  
      res.status(200).json(factura);
    } catch (error) {
      console.error('Error al obtener la factura:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  