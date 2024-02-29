const express = require('express')
const {Router} = express
const realTimeProducts = Router()
// const CartManager = require('../../cartManager')
// const cartmanager = new CartManager('../../cart.json')

// //Borrar los carritos
// cartmanager.deleteCarts()

// // Añadir un carrito
// cartmanager.addCart()
// cartmanager.addCart()
// cartmanager.addCart()

// // Al carrito con ID=1 añadir productos con ID= 4
// cartmanager.addProductToCart(1, 4)

// // Al carrito con ID=2 añadir dos productos con ID= 4 y 3
// cartmanager.addProductToCart(2, 4)

// http://localhost:8080/realTimeProducts
realTimeProducts.get('/', async (req, res) => {
        res.render(
            'realTimeProducts',
            {
                name: 'Gabi'
            }
            )
        })

module.exports = realTimeProducts














//realTimeProducts
// http://localhost:8080/realTimeProducts?id=1

// realTimeProducts.get('/', async (req, res) => {
//     const id = Number(req.query.id)
//     const cart = await cartmanager.getProductsByCartId(id)// Obtiene el carrito
//     console.log('cart: ' + JSON.stringify(cart, null, 2))//Muestra cart por consola
//     if (cart && Array.isArray(cart.products)) {//Si existe cart y sus productos son un array
//         const productsFinaly = cart.products.map(product => `
//         Id: ${product.id},
//         Quantity: ${product.quantity}
//         `).join('<br>')//Por cada producto muestra su Id, su Cantidad y los separa con una etiqueta <br>
//         // Renderizar la lista de productos
//         res.render(
//             'realTimeProducts',
//             {
//                 name: 'Gabi',
//                 prod: productsFinaly
//             }
//         )
//     } else {
//         // Manejar el caso de que no se encuentren productos
//         res.render(
//             'realTimeProducts',
//             {
//                 name: 'Gabi',
//                 prod: 'No hay productos disponibles'
//             }
//         )
//     }
// })








