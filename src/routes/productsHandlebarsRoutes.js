const express = require('express');
const {Router} = express
const productsHandlebarsRoutes = Router()
const CartManager = require('../dao/fileSystem/data/managers/cartManager')
const cartmanager = new CartManager('../../cart.json')

cartmanager.addCart()
cartmanager.addCart()
cartmanager.addCart()
cartmanager.addCart()
cartmanager.addProductToCart(1,2)
cartmanager.addProductToCart(1,2)
cartmanager.addProductToCart(1,2)
cartmanager.addProductToCart(1,2)
cartmanager.addProductToCart(1,9)
cartmanager.addProductToCart(1,9)
cartmanager.addProductToCart(1,9)

// Función para renderizar la lista de productos
function renderProducts(products) {
    let output = ''
    products.products.forEach(product => {
        output +=
            `- ID: ${product.id}, <br>Cantidad: ${product.quantity}<hr>`
    })
    return output
}

// http://localhost:8080/allProducts?name=Gabi&id=1 URL para mostrarle al usuario Gabi el cart con id=1

productsHandlebarsRoutes.get('/', async (req, res)=>{
    const name = req.query.name//Obtiene un nombre
    const id = Number(req.query.id)//Obtiene el id
    const products = await cartmanager.getProductsByCartId(id)//Obtiene el cart
    // Renderizar la lista de productos
    const renderedProducts = await renderProducts(products)
    console.log("LINEA 32: " + products);
    res.render(
        'home',//Renderiza home.handlebars
        {
            nombre: name,
            productos: renderedProducts,
            idCart: id
        })
})

module.exports = productsHandlebarsRoutes

