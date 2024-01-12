const express = require('express')
const app = express()
const PORT=8080
const ProductManager= require('./segundaPreentrega')
const productmanager= new ProductManager('products.JSON')

//Bienvenida
app.get('/bienvenida', (req,res)=>{
    res.send('<div><h1 style="color: blue">Hola mundo</h1></div>')
})

//Todos los productos, URL: http://localhost:8080/products
app.get('/products', (req,res)=>{
    const productos=productmanager.getProducts()
    res.send(`
    <div>
        <h1 style="color: red">
            Todos los productos
        </h1>
        <h2 style="color: blue">
            ${productos}
        </h2>
    </div> `)
})

//Producto por su id, URL: http://localhost:8080/products/...
app.get('/products/:id', (req,res)=>{
    const id=Number(req.params.id)//lo convierte a Number para usarlo en getProductById
    const product= productmanager.getProductById(id)
    res.send(`
    <div>
        <h1 style="color: red">
            Producto con ID: ${id}
        </h1>
        <h2>
            ${product}
        </h2>
    </div>`)
})

//Mostrar un limite de productos, URL: http://localhost:8080/products?limit=...
app.get('/productsLimit', (req,res)=>{
        let limit= Number(req.query.limit)//lo convierte a Number para usarlo en getProductById
        let productsToSend=[]
        for (let index = 0; index < limit; index++) {
            const element = productmanager.getProductById(index+1)
            if (productsToSend.length<productmanager.producto.length) {
                productsToSend.push(element);
            }        }
        res.send(`
        <div>
            <h1 style="color:red">
                Limite de productos disponibles:${productmanager.producto.length}${`\n`}
            </h1>
            <h2>
                Cantidad de productos: ${limit}
            </h2>
            <h2 style="color:green">
                ${productsToSend.join("\n")} <!-- Convertir el array en una cadena -->
            </h2>
        </div>
        `)
})


app.listen(PORT,()=>{
    console.log('listening on port ' + PORT)
})
