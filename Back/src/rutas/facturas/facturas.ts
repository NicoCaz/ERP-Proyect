import express from 'express';
import { PrismaClient, Product } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

export const delete_factura = router.delete('/facturas/:id', async (req, res) => {
    const invoiceId = parseInt(req.params.id, 10);

    // Check if id is a number
    if (isNaN(invoiceId)) {
        return res.status(400).json({ error: 'Invalid invoice ID' });
    }

    try {
        // Check if invoice exists
        const facturaExistente = await prisma.invoice.findUnique({
            where: { Id: invoiceId },
        });

        if (!facturaExistente) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        // Delete the invoice and its associated products
        await prisma.invoice.delete({
            where: { Id: invoiceId },
        });

        return res.status(204).send();
    } catch (error: any) {
      // Provide more detailed error message
      return res.status(500).json({ error: `Failed to delete invoice: ${error.message}` });
    }
});





export const get_facturas=router.get('/facturas', async (_req, res) => {
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
export const get_factura=router.get('/facturas/:id', async (req, res) => {
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

    return res.status(200).json(factura);
  } catch (error) {
    console.error('Error al obtener la factura:', error);
    return  res.status(500).json({ error: 'Error interno del servidor' });
  }
});





export const post_factura=router.post('/facturas', async (req, res) => {
  try {
    const { fecha, clienteId, productos, total } = req.body;
    const factura = await prisma.invoice.create({
      data: {
        Date: new Date(fecha),
        ClientId: clienteId,
        Total: total,
        ProductsInvoice: {
          create: productos.map((producto:Product) => ({
            Nombre: producto.Name,
            Precio: producto.Price,
            Cantidad: producto.Quantity,
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



export const put_factura=router.put('/facturas/:id', async (req, res) => {
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
          create: products.map((producto:Product) => ({
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

    return res.status(200).json(facturaActualizada);
  } catch (error) {
    console.error('Error al actualizar la factura:', error);
    return  res.status(500).json({ error: 'Error interno del servidor' });
  }
});