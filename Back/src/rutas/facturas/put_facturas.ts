import express  from 'express';
import { PrismaClient } from '@prisma/client';
const prisma =new PrismaClient()
const router = express.Router()


router.put('/facturas/:id', async (req, res) => {
    try {
      const facturaId = parseInt(req.params.id, 10);
      const { date, clientId, products, total } = req.body;
  
      // Verificar si la factura existe
      const facturaExistente = await prisma.invoice.findUnique({
        where: { Id: facturaId },
        include: {
          ProductsInvoice: true,
        },
      });
  
      if (!facturaExistente) {
        return res.status(404).json({ message: 'Factura no encontrada' });
      }
      // Actualizar la factura y sus productos
      const facturaActualizada = await prisma.invoice.update({
        where: { Id: facturaId },
        data: {
          Date: new Date(date),
          ClientId: clientId,
          Total: total,
          ProductsInvoice: {
            deleteMany: {}, // Eliminar todos los productos existentes
            create: products.map((producto) => ({
              Name: producto.Name,
              Price: producto.Price,
              Quantity: producto.Quantity,
            })),
          },
        },
        include: {
          ProductsInvoice: true,
        },
      });
  
      res.status(200).json(facturaActualizada);
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });