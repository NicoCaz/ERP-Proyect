import express from 'express'
import cors from "cors";

import deleteproduct from './rutas/delete_productos'
import putproduct from './rutas/put_productos'
import getproduct from './rutas/get_productos'
import postproduct from './rutas/post_productos'

const app= express()

app.use(cors());

app.use(express.json())

const PORT = 3000




app.use('/api/delete',deleteproduct)
app.use('/api/put',putproduct)
app.use('/api/post',postproduct)
app.use('/api/get',getproduct)

app.get('/ping', (_req,res)=>{
    console.log('PING')
    res.send("PONG")
})

app.listen(PORT,()=>{
        console.log(`Server run on port ${PORT}`)
})


