import express  from 'express';
import { PrismaClient } from '@prisma/client';

const prisma =new PrismaClient()
const router = express.Router()

router.get('/',async(_req,res)=>{
    try {
        const listProduct = await prisma.product.findMany()
        res.json(listProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear un nuevo cliente" });  
    }

})


export default router