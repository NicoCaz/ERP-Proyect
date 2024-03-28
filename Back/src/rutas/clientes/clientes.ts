import express  from 'express';
import { PrismaClient } from '@prisma/client';
const prisma =new PrismaClient()
const router = express.Router()


export const delete_cliente=router.delete('/',async (req,res)=>{
    const deleteClient = await prisma.clientes.delete({
        where: {Id:req.body.Id}
    })
    res.json(deleteClient)
})


export const get_cliente=router.get("/", async (_req, res) => {
    const listClient = await prisma.clientes.findMany();
    res.json(listClient);
  });
  


  export const post_cliente=router.post("/", async (req, res) => {
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



  export const put_cliente=router.put("/", async (req, res) => {
    console.log(req.body);
    const actClient = await prisma.clientes.update({
      where: { Id: req.body.Id },
      data: req.body,
    });
    res.json(actClient);
  });
  