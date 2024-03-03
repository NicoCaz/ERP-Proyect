import express  from 'express';
import { PrismaClient } from '@prisma/client';
const prisma =new PrismaClient()
const router = express.Router()


router.delete('/',async (req,res)=>{
    const deleteClient = await prisma.clientes.delete({
        where: {Id:req.body.Id}
    })
    res.json(deleteClient)
})


export default router