const express = require('express')
const {Router} = express
const realTimeProducts = Router()
// http://localhost:8080/realTimeProducts?name=Gabi
realTimeProducts.get('/', async (req, res) => {
    const name = req.query.name
        res.render(
            'realTimeProducts',
            {
                name: name
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








