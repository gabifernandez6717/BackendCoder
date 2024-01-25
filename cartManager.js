const fs = require('fs') // Manejar el sistema de archivo
class CartManager {
    constructor(path) {
        this.path=path
        this.carts=[]
    }

    //Guardar productos en el archivo
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf8')
        //console.log('Cambios guardados')
    }

    // Obtener todos los carts
    getCarts = async () => {
        try {
            const response = await fs.promises.readFile(this.path, 'utf8')//los obtiene de cart.json
            const carts = JSON.parse(response)
            return carts
        } catch (error) {
            console.log('Error al obtener los carritos', error)
            return null
        }
    }

    // Obtener un carrito por su ID
    getCartId = async (id) => {
        const carts = await this.getCarts()//Obtiene los carts
        if (carts) {
            const cart = carts.find(cart => cart.id === id)//Si existe, busca el que coincida con el id
            console.log(cart)
            console.log('-----------obtener un carrito por su id----------')
            return cart
        } else {
            console.log('Error al obtener los carritos')
            return null//Si no existe devuelve null
        }
    }
    //Añadir carrito
    addCart = () => {
        const id = this.carts.length + 1//Genera un id
        const cart = { id, products: [] }//Genera un cart
        this.carts.push(cart)
        this.saveProducts()// Guarda después de agregar un carrito
        console.log(cart)//Muestra por consola el cart agregado
        return cart
    }

    // Eliminar un carrito por su ID
    deleteCart = async (cartId) => {
        try {
            const carts = await this.getCarts()//Obtiene todos los carts
            const cartIndex = carts.findIndex((cart) => cart.id === cartId)//Busca el cart a eliminar
            if (cartIndex !== -1) {
                const deletedCart = carts.splice(cartIndex, 1)[0]//Si existe lo elimina
                this.saveProducts()// Guardar después de eliminar el carrito
                console.log(`Carrito con ID ${cartId} eliminado`)
                return deletedCart
            } else {
                console.log(`No se encontró el carrito con ID ${cartId}`)
                return null
            }
        } catch (error) {
            console.error(`Error al eliminar el carrito con ID ${cartId}: ${error}`)
            return null
        }
    }

    //Obtener los productos de un carrito
    getCartProducts = async (id) => {
        const carts = await this.getCarts()//Obtiene todos los productos
        if (carts) {
            const cart = carts.find(cart => cart.id === id)//Busca el que coincida
            if (cart) {
                console.log(`Productos del carrito ${id}:`, cart.products)
                return cart.products
            } else {
                console.log(`No se encontró el carrito con ID ${id}`)
                return null
            }
        } else {
            console.log('Error al obtener los carritos')
            return null
        }
    }
    // Añadir un producto a un carrito
    addProductToCart = async (cartId, productId) => {
        const carts = await this.getCarts()// Obtiene todos los carritos
        if (carts) {
            const cartIndex = carts.findIndex((cart) => cart.id === cartId)
            if (cartIndex !== -1) {
                const cart = carts[cartIndex]
                // Verificar si el producto ya está en el carrito
                const productIndex = cart.products.findIndex(
                    (product) => product.id === productId
                )
                if (productIndex !== -1) {
                    // Si el producto ya está en el carrito, incrementar la cantidad
                    cart.products[productIndex].quantity++
                } else {
                    // Si el producto no está en el carrito, agregarlo con cantidad 1
                    const product = {
                        id: productId,
                        quantity: 1,
                    }
                    cart.products.push(product)
                }
                this.saveProducts(); // Guardar después de agregar un producto al carrito
                console.log(`Producto agregado al carrito ${cartId}:`, productId)
                return cart
            } else {
                console.log(`No se encontró el carrito con ID ${cartId}`)
                return null
            }
        } else {
            console.log('Error al obtener los carritos')
            return null
        }
    }

}

module.exports = CartManager

const carrito = new CartManager('cart.json')

//Añadir un carrito
carrito.addCart()
carrito.addCart()
carrito.addCart()
carrito.addCart()
console.log('------------agregar carrito------------')
//Eliminar un carrito
carrito.deleteCart(1)
console.log('------------agregar carrito------------')

// Añadir productos al carrito con ID 2
carrito.addProductToCart(2, { id: 1, name: 'Producto 1', price: 10 })
carrito.addProductToCart(2, { id: 2, name: 'Producto 2', price: 20 })

// Obtener todos los carritos
carrito.getCarts().then(carts => {
    console.log(carts)
    console.log('------------obtener todos los carritos------------')
})

//Obtener el cart con ID 2
carrito.getCartId(2)

// Obtener los productos del carrito con ID 2
carrito.getCartProducts(2).then(products => {
    console.log('Productos obtenidos:', products)
})

