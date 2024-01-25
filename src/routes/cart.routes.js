const Router = require('express')
const CartManager = require('../../cartManager')
const ProductManager = require('../../productManager')
const cartsManager= new CartManager(`../../cart.json`)

//CRUD de productos (Create, Read, Update, Delete)
const routerCart= Router()

//Agregar un carrito
//http://localhost:8080/api/carts/
routerCart.post('/', async (req, res) => {
    const addCart = await cartsManager.addCart()
    if (addCart) {
        res.status(200).send(`
            <div>
                <h1>
                    Cart añadido correctamnte
                </h1>
            </div>
        `)
    } else {
        res.status(404).send(`
            <div>
                <h1 style="color: red">
                    Hubo un error al agregar el carrito
                </h1>
            </div>
        `)
    }
})

//Agregar un producto a un carrito
//http://localhost:8080/api/carts/2/product/4
routerCart.post('/:cid/product/:pid', async (req, res) =>{
    const cartId = Number(req.params.cid)
    const productId = Number(req.params.pid)
    const addProduct = cartsManager.addProductToCart(cartId, productId)
    if (addProduct) {
        res.status(200).send(`
            ${console.log(`Producto ${productId} añadido correctamente al cart ${cartId}`)}
            <div>
                <h1 style="color: red">
                    Producto ${productId} añadido correctamente al cart ${cartId}
                </h1>
            </div>
            `
            )
    } else {
        res.status(400).send(
            console.log(`Ocurrió un error al añadir el producto al cart`)
            )
    }
})

//Obtener un cart por su id o todos los carts
//http://localhost:8080/api/carts?id=5
//http://localhost:8080/api/carts/
routerCart.get('/', async (req, res) => {
    const id = Number(req.query.id)//Se obtiene el id como number para poder usarse en getCartId
    if (id) {//Si hay ID muestra ese cart
        const cart = await cartsManager.getCartId(id)
        if (cart) {//Si encuentra el cart
            res.status(200).send(`
            <div>
                <h1 style="color: red">
                    Cart con ID: ${id}
                </h1>
                <h2>
                    ${cart}
                </h2>
            </div>`)
        } else {//Si no encuentra el cart
            res.status(404).send(`
                <div>
                    <h1 style="color: red">
                        Carrito no encontrado
                    </h1>
                </div>
            `)
        }
    } else {//Si no hay ID muestra todos los carts
        await cartsManager.getCarts().then(carts => {
            console.log(carts)
            res.status(200).send(`
            <div>
                <h1 style="color: red">
                    Todos los carts:
                </h1>
                <h2>
                    ${carts}
                </h2>
            </div>`)
        }).catch(carts => {
            console.log(`Ocurrió un error: ${carts}`)
            res.status(404).send(`
                <div>
                    <h1 style="color: red">
                        Carrito no encontrado
                    </h1>
                </div>
            `)
        })
    }
})


//Actualizar un carrito
//http://localhost:8080/api/carts?cartId=1&productId=9
routerCart.put('/', async (req, res) => {
    const cartId = Number(req.query.cartId)
    const product = Number(req.query.productId)
    if (cartId && product) {
        const res = await cartsManager.addProductToCart(cartId, {product})
        if (res) {
            res.status(200).send(
                res.status(404).send(`
                    <div>
                        <h1 style="color: red">
                            Carrito ${cartId} actualizado con éxito
                        </h1>
                    </div>
                `)
            )
        }
    } else {
        res.status(404).send(
            res.status(404).send(`
                <div>
                    <h1 style="color: red">
                        Hubo un error, todos los campos son obligatorios
                    </h1>
                </div>
            `))
    }
})

// Eliminar un carrito por su ID
//http://localhost:8080/api/carts/5
routerCart.delete('/:id', async (req, res) => {
    const cartId = Number(req.params.id)
    try {
        // Llama a la función deleteCart con el ID del carrito
        const deletedCart = await cartsManager.deleteCart(cartId)
        if (deletedCart) {
            res.status(200).send(`Carrito con ID ${cartId} eliminado exitosamente`)
        } else {
            res.status(404).send(`No se encontró el carrito con ID ${cartId}`)
        }
    } catch (error) {
        console.error(`Error al eliminar el carrito con ID ${cartId}: ${error}`)
        res.status(500).send('Error del servidor')
    }
})
module.exports = routerCart