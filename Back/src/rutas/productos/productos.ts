import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();


export const delete_product =router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id); // Obtener el ID desde los parámetros de la ruta
    console.log("delete product");
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
  
    try {
      const product = await prisma.product.findUnique({
        where: { Id: id } // Usar 'id' en minúscula
      });
  
      // Check if product exists
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const deletedProduct = await prisma.product.delete({
        where: { Id: id } // Usar 'id' en minúscula
      });
  
      return res.json(deletedProduct);
    } catch (error: any) {
        // Provide more detailed error message
        return res.status(500).json({ error: `Failed to delete product: ${error.message}` });
    }
  });


export const get_product = router.get('/', async (_req, res) => {
    console.log("get product");
    try {

        const listProduct = await prisma.product.findMany();
        res.json(listProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener la lista de productos" });
    }
});



export const post_product =router.post("/", async (req, res) => {
    console.log("post product");
    console.log(req.body);
    try {
        console.log(req.body);
        const newClient = await prisma.product.create({
            data: {
                Name: req.body.Name,
                Price: parseFloat(req.body.Price),
            },
        });

        res.json(newClient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear un nuevo cliente" });
    }
  });
  

  export const put_product =router.put('/',async (req,res)=>{
    console.log(req.body);
    try {
        const actProduct = await prisma.product.update({
            where: {Id:req.body.Id},
            data:{
                Name: req.body.Name,
                Price: parseFloat(req.body.Price),
            }
        })
        res.json(actProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: " Error al modificar un producto " });
    }

})
