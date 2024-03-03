import express  from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router()
const prisma =new PrismaClient()

router.post('/facturas', async (req, res) => {
    try {
      const { fecha, clienteId, productos, total } = req.body;
      const factura = await prisma.invoice.create({
        data: {
          Date: new Date(fecha),
          ClientId: clienteId,
          Total: total,
          ProductsInvoice: {
            create: productos.map((producto) => ({
              Nombre: producto.nombre,
              Precio: producto.precio,
              Cantidad: producto.cantidad,
            })),
          },
        },
        include: {
          ProductsInvoice: true,
        },
      });
  
      res.status(201).json(factura);
    } catch (error) {
      console.error('Error al crear la factura:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

export default router