const express = require('express')
const app = express()
const PORT=8080
const ProductManager= require('./segundaPreentrega')
const productmanager= new ProductManager('products.JSON')

//Bienvenida
app.get('/bienvenida', (req,res)=>{
    res.send('<div><h1 style="color: blue">Hola mundo</h1></div>')
})

//Todos los productos: http://localhost:8080/products , o con un limite: http://localhost:8080/products?limit=...
app.get('/products', (req,res)=>{
    const limit= req.query.limit //Busca el limite
    let productos=productmanager.getProducts()//Obtiene los productos
    const cantidadDeProductos= productos.length//Guarda cuantos productos hay
    let mensaje="Todos los productos"

    if (limit <= productos.length)//Verifica que no se solicite mas productos que los disponibles
    {
        if (limit) {
            let productsLimit= productos.slice(0, parseInt(limit))//Extrae una porcion de el array con el limite
            mensaje=`Limite de productos: ${limit} <br> Cantidad de productos disponibles: ${cantidadDeProductos}`
            productos=productsLimit
        }
    }else{
        mensaje = `Los productos disponibles son ${cantidadDeProductos}`//En caso que se soliciten mas productos de los que hay se muestra este mensaje y todos los productos
    }


    res.send(`
    <div>
        <h1 style="color: red">
            ${mensaje}
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


app.listen(PORT,()=>{
    console.log('listening on port ' + PORT)
})
