const express = require('express')
const routerProd = require('./src/routes/products.routes')
const { __dirname: rootDir } = require('./src/path')
const ProductManager = require('./productManager')
const CartManager = require('./cartManager')
const routerCart = require('./src/routes/cart.routes')
const productManager = new ProductManager('products.JSON')
const cartManager = new CartManager('cart.json')
const PORT = 8080
const app = express()

// Middlewares
app.use(express.json())// Para enviar y recibir archivos JSON
app.use(express.urlencoded({ extended: true }))// Permitir extensiones en la URL

// Routes
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/static', express.static(rootDir + '/public'))

console.log(rootDir + '/public')

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})