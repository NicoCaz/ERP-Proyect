import express  from 'express';
import { PrismaClient } from '@prisma/client';
const prisma =new PrismaClient()
const router = express.Router()


router.put('/',async (req,res)=>{
    console.log(req.body);
    try {
        const actProduct = await prisma.product.update({
            where: {Id:req.body.Id},
            data:req.body
        })
        res.json(actProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: " Error al modificar un producto " });
    }

})


export default router