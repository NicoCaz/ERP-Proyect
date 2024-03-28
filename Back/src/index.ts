import express from 'express'
import cors from "cors";

import { 
    delete_product,
    put_product,
    get_product,
    post_product
} from './rutas/productos/productos'

import {} from './rutas/clientes/clientes'
import{}from './rutas/facturas/facturas'
import{}from './rutas/usuarios/usuario'

const app= express()

app.use(cors());

app.use(express.json())

const PORT = 3000




app.use('/api/delete',delete_product)
app.use('/api/put',put_product)
app.use('/api/post',post_product)
app.use('/api/get',get_product)

app.get('/ping', (_req,res)=>{
    console.log('PING')
    res.send("PONG")
})

app.listen(PORT,()=>{
        console.log(`Server run on port ${PORT}`)
})


