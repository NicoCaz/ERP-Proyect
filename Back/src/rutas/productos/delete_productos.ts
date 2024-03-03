import express  from 'express';
import { PrismaClient } from '@prisma/client';
const prisma =new PrismaClient()
const router = express.Router()

router.delete('/',async (req,res)=>{
    const deleteProduct = await prisma.product.delete({
        where: {Id:req.body.Id}
    })
    res.json(deleteProduct)
})


export default router