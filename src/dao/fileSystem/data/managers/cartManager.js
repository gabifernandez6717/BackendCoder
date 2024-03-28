const fs = require('fs') // Manejar el sistema de archivo
class CartManager {
    constructor(path) {
        this.path = path
        //this.carts = this.getCarts()
        this.carts = []
    }

    //Vaciar this.carts
    deleteCarts() {
        console.log('Se ejecutó deleteCarts (cartManager.js)')
        this.carts = []
        this.saveProducts() // Guarda la lista vacía en el archivo
    }

    //Guardar productos
    saveProducts() {
        console.log('Se ejecutó saveProducts (cartManager.js)')
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf8')
    }

    // //Leer productos
    // readProductsSync() {
    //     console.log('Se ejecutó readProductsSync (cartManager.js)')
    //     console.log('LINEA 25: ' +  fs.readFileSync(this.path, 'utf8'))
    //     try {
    //         const response = fs.readFileSync(this.path, 'utf8')
    //         console.log('Se ejecutó readProductsSync (cartManager.js): ' + response)
    //         return JSON.parse(response)
    //     } catch (error) {
    //         console.log('Error al leer el archivo:', error)
    //         return null
    //     }
    // }
        //Leer productos
        readProductsSync() {
            console.log('Se ejecutó readProductsSync (cartManager.js)')
            console.log('LINEA 25: ' +  fs.readFileSync(this.path, 'utf8'))
            try {
                const response = fs.readFileSync(this.path, 'utf8')
                console.log('Se ejecutó readProductsSync (cartManager.js): ' + response)
                return (response)
            } catch (error) {
                console.log('Error al leer el archivo:', error)
                return null
            }
        }

    // Obtener todos los carritos
    getCarts =  () => {
        console.log('Se ejecutó getCarts (cartManager.js)')
        try {
            const response =  this.readProductsSync()
            return response || []
        } catch (error) {
            console.log('Error al obtener los carritos', error)
            return null
        }
    }

    getCartsSync() {
        console.log('Se ejecutó getCartsSync (cartManager.js)')
        const response = this.readProductsSync()
        return response || []
    }

    // Verifica si un ID ya está en uso
    isIdInUse = (id) => {
        const InUse = this.carts.some((cart) => cart.id === id)
        return InUse //Returna un booleano
    }

    // Genera un ID
    generateUniqueId = () => {
        return this.carts.length + 1
    }

    // //Agregar un cart
    addCart = (id = null) => {
        console.log('Se ejecutó addCart (cartManager.js)')
        // Si se proporciona un ID, verifica que no esté en uso
        if (id !== null && this.isIdInUse(id)) {
            console.log(`El ID ${id} no esta disponible. Por favor, elige otro ID.`)
            return null
        }
        // Si no se proporciona un ID o el ID proporcionado no está en uso, continúa
        const newId = id || this.generateUniqueId()
        const cart = { id: newId, products: [] }
        this.carts.push(cart)
        this.saveProducts()
        console.log(`Carrito agregado con ID: ${newId}`)
        return newId
    }

    //Verificar que un cart exista
    cartExists = (cartId) => {
        console.log('Se ejecutó cartExists (cartManager.js)')
        const cartIndex = this.carts.findIndex((cart) => cart.id === cartId)// Busca el cart con su índice
        return cartIndex !== -1 // Retorna true si el carrito existe, sino, retorna false
    }

    //Agregar un producto al cart
    addProductToCart = async (cartId, productId) => {
        console.log('Se ejecutó addProductToCart (cartManager.js)')
        try {
            const cartIndex = this.carts.findIndex((cart) => cart.id === cartId)//Busca el cart con su indice
            if (cartIndex !== -1) {
                const cart = this.carts[cartIndex]//Si existe lo guarda en una constante
                if (typeof cart === 'object' && cart !== null && 'products' in cart) {
                    const products = cart.products//Guarda los productos del cart
                    const productIndex = products.findIndex((product) => product.id == productId)//Busca el producto por su indice
                    if (productIndex !== -1) {
                        products[productIndex].quantity++//Si el producto existe aumenta la cantidad en 1
                    } else {
                        const product = {
                            id: productId,
                            quantity: 1,
                        }
                        products.push(product)//Si no existe el producto, lo crea y lo agrega
                    }
                    this.carts[cartIndex].products = products//Actualiza los productos
                    this.saveProducts()//Guarda los cambios
                    console.log(`Producto agregado al carrito ${cartId}:`, productId, '\n', JSON.stringify(this.carts))
                    return this.carts
                } else {
                    console.log('No se encontró la propiedad "products" en el objeto "cart".')
                    return null
                }
            } else {
                console.log(`No se encontró el carrito con ID ${cartId}`)
                return null
            }
        } catch (error) {
            console.error(`Error al agregar producto al carrito: ${error}`)
            return null
        }
    }

    //Eliminar productos de un cart
    deleteProductToCart = async (cartId, productId) => {
        console.log('Se ejecutó deleteProductToCart (cartManager.js)')
        try {
            const cartIndex = this.carts.findIndex((cart) => cart.id === cartId)//Busca el cart con su indice
            if (cartIndex !== -1) {
                const cart = this.carts[cartIndex]//Si existe lo guarda en una constante
                if (typeof cart === 'object' && cart !== null && 'products' in cart) {
                    const products = cart.products // Guarda los productos del carrito
                    console.log('PRODUCTOS ANTES: ' + JSON.stringify(products))
                    const productIndex = products.findIndex(product => product.id === productId)// Encuentra el índice del producto en base a su id
                    if (productIndex !== -1) {
                        // Verifica la cantidad del producto
                        if (products[productIndex].quantity > 1) {
                            // Disminuye la cantidad en uno
                            products[productIndex].quantity--
                        } else {
                            // Si la cantidad es 1 o menos, elimina el producto del array
                            products.splice(productIndex, 1)
                        }
                        // Guarda los cambios
                        this.saveProducts()
                        console.log(`Producto modificado en el carrito ${cartId}:`, productId, '\n', JSON.stringify(this.carts))
                        return this.carts
                    } else {
                        console.log(`No se encontró el producto con ID ${productId} en el carrito ${cartId}`)
                        return null
                    }
                } else {
                    console.log('No se encontró la propiedad "products" en el objeto "cart".')
                    return null
                }
            } else {
                console.log(`No se encontró el carrito con ID ${cartId}`)
                return null
            }
        } catch (error) {
            console.error(`Error al agregar producto al carrito: ${error}`)
            return null
        }
    }

    // Obtener el cart con su índice
    getCartByIndex = (index) => {
        console.log('Se ejecutó getCartByIndex (cartManager.js)')
        if (index >= 0 && index < this.carts.length) {//Verifica que el indice sea válido
            return this.carts[index]//Retorna el cart
        } else {
            console.log(`Índice de carrito no válido: ${index}`)
            return null
        }
    }

    // Obtener los productos del carrito con su ID
    getProductsByCartId = (cartId) => {
        console.log('Se ejecutó getProductsByCartId (cartManager.js)')
        const cart = this.carts.find((cart) => cart.id === cartId)//Busca el cart
        if (cart) {
            console.log("LINEA 197: " + cart.products);
            return cart || []//retorna los productos del cart o un array vacio
        } else {
            console.log(`No se encontró el carrito con ID ${cartId}`)
            return null
        }
    }

    // Eliminar un carrito por su ID
    deleteCartById = async (cartId) => {
        console.log('Se ejecutó deleteCartById (cartManager.js)')
        const cartIndex = await this.carts.findIndex((cart) => cart.id === cartId)//Busca el cart por su indice
        if (cartIndex !== -1) {
            this.carts.splice(cartIndex, 1)//Lo elimina
            this.saveProducts()
            console.log(`Carrito con ID ${cartId} eliminado.`)
            return true
        } else {
            console.log(`No se encontró el carrito con ID ${cartId}`)
            return false
        }
    }
}

module.exports = CartManager

// const carrito = new CartManager('cart.json')
// carrito.readProductsSync()
// carrito.readProductsSync()
// carrito.addCart()
// carrito.addCart()
// carrito.addCart()
// carrito.addProductToCart(1,2)
// carrito.addProductToCart(1,2)
// carrito.addProductToCart(1,2)
// carrito.addProductToCart(1,2)
// carrito.readProductsSync()
// carrito.readProductsSync()
// carrito.deleteCarts()
// carrito.readProductsSync()
// carrito.readProductsSync()
