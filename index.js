const express = require('express')
const app = express()
const PORT=8080
const ProductManager= require('./segundaPreentrega')
const productmanager= new ProductManager('products.JSON')
app.get('/bienvenida', (req,res)=>{
    res.send('<h1 style="color: blue">Hola mundo</h1>')
})

app.get('/products/:id', (req,res)=>{
    const id=req.params.id
    console.log(`el id por params es: ${id}`)
    const product= productmanager.getProductById(id)
    res.send(` <h1 style="color: blue">Hola mundo</h1> <h2>Producto ${id}: ${product}</h2>`)
})

app.get('/products', (req,res)=>{
    const productos=productmanager.getProducts()
    res.send(`<h1 style="color: blue">Hola mundo</h1> <h2 style="color: red">${productos}</h2>\n `)
})

app.listen(PORT,()=>{
    console.log('listening on port ' + PORT)
})


















