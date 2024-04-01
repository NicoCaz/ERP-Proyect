import express from 'express'
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { delete_product, put_product, get_product, post_product } from './rutas/productos/productos'
import { delete_cliente, get_cliente, post_cliente, put_cliente } from './rutas/clientes/clientes'
import { delete_factura, get_factura, post_factura, put_factura } from './rutas/facturas/facturas'
import { } from './rutas/usuarios/usuario'

const app = express()
app.use(cors());
app.use(express.json())
const PORT = 3000

// Configurar Swagger
const swaggerDocument = {
  swagger: "2.0",
  info: {
    title: "API Documentation",
    version: "1.0.0"
  },
  paths: {
    "/api/product/delete": {
      "delete": {
        "summary": "Delete a product",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/product/put": {
      "put": {
        "summary": "Update a product",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/product/post": {
      "post": {
        "summary": "Create a new product",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/product/get": {
      "get": {
        "summary": "Get products",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  }
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/product/delete', delete_product)
app.use('/api/product/put', put_product)
app.use('/api/product/post', post_product)
app.use('/api/product/get', get_product)

app.use('/api/cliente/delete', delete_cliente)
app.use('/api/cliente/put', put_cliente)
app.use('/api/cliente/post', post_cliente)
app.use('/api/cliente/get', get_cliente)

app.use('/api/factura/delete', delete_factura)
app.use('/api/factura/put', put_factura)
app.use('/api/factura/post', post_factura)
app.use('/api/factura/get', get_factura)


app.get('/ping', (_req, res) => {
  console.log('PING')
  res.send("PONG")
})

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})