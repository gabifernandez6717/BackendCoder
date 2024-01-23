const Router = require('express')
const CartManager = require('../../cartManager')
const cartsManager= new CartManager(`../../cart.json`)

//CRUD de productos (Create, Read, Update, Delete)
const routerCart= Router()

//Obtener un cart por su id o todos los carts
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

//Agregar un carrito
routerCart.post('/cart', async (req, res) => {
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

//Actualizar un carrito
routerCart.put('/', async (req, res) => {
    const cartId = req.query.cartId
    const product = req.query.product
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

//Borrar un carrito
routerCart.delete('/:id', async (req, res) => {
const cartId = req.params.id
const product = {}
if (cartId) {
    const respuesta = await cartsManager.addProductToCart(cartId, {product})
    if (respuesta) {
        res.status(200).send(`
            <div>
                <h1 style="color: red">
                    Carrito ${cartId} actualizado con éxito
                </h1>
            </div>
        `)
    }
} else {
    res.status(404).send(
        res.status(404).send(`
            <div>
                <h1 style="color: red">
                    Hubo un error, ingrese el id del carrito
                </h1>
            </div>
        `))
}
})
module.exports = routerCart