const express = require('express');
const {Router} = express
const productsHandlebarsRoutes = Router()
const CartManager = require('../../cartManager')
const cartmanager = new CartManager('../../cart.json')

// Función para renderizar la lista de productos
function renderProducts(products) {
    let output = "\n"
    products.products.forEach(product => {
        output +=
            `- ID: ${product.id}, \n
            Cantidad: ${product.quantity}`
    })
    return output
}

//Borrar los carritos
cartmanager.deleteCarts()
// Añadir un carrito
cartmanager.addCart()
cartmanager.addCart()
// Al carrito con ID=1 añadir productos con ID= 4, 3 y 1
cartmanager.addProductToCart(1, 4)
cartmanager.addProductToCart(1, 4)
cartmanager.addProductToCart(1, 3)
cartmanager.addProductToCart(1, 3)
cartmanager.addProductToCart(1, 1)
cartmanager.addProductToCart(1, 1)
cartmanager.addProductToCart(1, 1)

// Al carrito con ID=2 añadir dos productos con ID= 4 y 5
cartmanager.addProductToCart(2, 4)
cartmanager.addProductToCart(2, 3)

// http://localhost:8080/allProducts?name=Gabi&id=1 URL para asignarle al usuario Gabi el cart con id=1

// http://localhost:8080/allProducts?name=Marta&id=2 URL para asignarle al usuario Marta el cart con id=2
productsHandlebarsRoutes.get('/', async (req, res)=>{
    const name = req.query.name//Obtiene un nombre
    const id = Number(req.query.id)//Obtiene el id
    const products = await cartmanager.getProductsByCartId(id)//Obtiene el cart
    console.log(products)
    // Renderizar la lista de productos
    const renderedProducts = renderProducts(products)
    res.render(
        'home',//Renderiza home.handlebars
        {
            nombre: name,
            productos: renderedProducts,
            idCart: id
        })
})

module.exports = productsHandlebarsRoutes

