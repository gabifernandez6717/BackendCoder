const fs = require('fs') // Manejar el sistema de archivo
class CartManager {
    constructor(path) {
        this.path = path
        this.carts = this.getCarts()
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

    //Leer productos
    readProductsSync() {
        console.log('Se ejecutó readProductsSync (cartManager.js)')
        try {
            const response = fs.readFileSync(this.path, 'utf8')
            return JSON.parse(response)
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

    //Agregar un cart
    addCart = () => {
        console.log('Se ejecutó addCart (cartManager.js)')
        const id = this.carts.length + 1//Genera el Id
        const cart = { id, products: [] }//Genera el cart sin productos
        this.carts.push(cart)//Agrega el cart a this.carts
        this.saveProducts()//Guarda los cambios
        console.log(cart)//Muestra el cart agregado
        return cart
    }

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

    deleteProductToCart = async (cartId, productId) => {
        console.log('Se ejecutó deleteProductToCart (cartManager.js)')
        try {
            const cartIndex = this.carts.findIndex((cart) => cart.id === cartId)//Busca el cart con su indice
            if (cartIndex !== -1) {
                const cart = this.carts[cartIndex]//Si existe lo guarda en una constante
                if (typeof cart === 'object' && cart !== null && 'products' in cart) {
                    const products = cart.products // Guarda los productos del carrito
                    console.log('PRODUCTOS ANTES: ' + JSON.stringify(products))
                    // Encuentra el índice del producto en base a su id
                    const productIndex = products.findIndex(product => product.id === productId)
                    if (productIndex !== -1) {
                        // Elimina el producto del array
                        products.splice(productIndex, 1)
                        // Guarda los cambios
                        this.saveProducts()
                        console.log(`Producto eliminado del carrito ${cartId}:`, productId, '\n', JSON.stringify(this.carts))
                        return this.carts
                    } else {
                        console.log(`No se encontró el producto con ID ${productId} en el carrito ${cartId}`)
                        return null
                    }
                    // const products = cart.products//Guarda los productos del cart
                    // console.log('PRODUCTOS: ' + JSON.stringify(products))
                    // return false
                    // // this.carts[cartIndex].products = products//Actualiza los productos
                    // // this.saveProducts()//Guarda los cambios
                    // // console.log(`Producto agregado al carrito ${cartId}:`, productId, '\n', JSON.stringify(this.carts))
                    // // return this.carts
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

const carrito = new CartManager('cart.json')
carrito.deleteCarts()

// // Añadir un carrito
console.log('------------Agregar carrito------------')
carrito.addCart()

// Al carrito con ID=1 añadir un producto con ID=4
console.log('------------Agregar producto------------')
carrito.addProductToCart(1, 4)



































// //Ver todos los carts
// console.log('------------Ver todos los carts------------')
// carrito.getCarts().then((getcarts) => {
//     console.log('todos los carts', getcarts)
// })

// // Obtener el cart con su índice
// console.log('------------Ver el cart con su índice (1)------------')
// const cartAtIndex1 = carrito.getCartByIndex(1)
// console.log('LINEA 146 '+ cartAtIndex1.id, cartAtIndex1.products)

// // Obtener los productos del carrito con su ID
// console.log('------------Ver los productos del cart con su índice------------')
// const productsInCart2 = carrito.getProductsByCartId(2)
// console.log(productsInCart2)

// // // Eliminar el carrito con ID (2)
// // console.log('------------Eliminar carrito por su ID------------')
// // const isDeleted = carrito.deleteCartById(2)
// // console.log(isDeleted)

// //Ver todos los carts
// console.log('------------Ver todos los carts------------')
// carrito.getCarts().then((getcarts) => {
//     console.log('todos los carts', getcarts)
// })











// const fs = require('fs') // Manejar el sistema de archivo
// class CartManager {
//     constructor(path) {
//         this.path=path
//         this.carts=[]
//     }

//     // //Guardar productos en el archivo
//     // saveProducts() {
//     //     fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf8')
//     //     //console.log('Cambios guardados')
//     // }
//     saveProducts() {
//         fs.writeFileSync('./cart.json', JSON.stringify(this.carts, null, 2), 'utf8')
//         //console.log('Cambios guardados')
//     }
//     //Leer productos
//     readProducts () {
//         const response = fs.readFileSync('./cart.json', 'utf8')
//         return response
//     }

//     // Obtener todos los carts
//     getCarts = async () => {
//         try {
//             const response = await this.readProducts()//los obtiene de cart.json

//             //const response = await fs.promises.readFile(this.path, 'utf8')//los obtiene de cart.json
//             const carts = JSON.parse(response)
//             return carts
//         } catch (error) {
//             console.log('Error al obtener los carritos', error)
//             return null
//         }
//     }

//     // Obtener un carrito por su ID
//     getCartId = async (id) => {
//         const carts = await this.getCarts()//Obtiene los carts
//         if (carts) {
//             const cart = carts.find(cart => cart.id === id)//Si existe, busca el que coincida con el id
//             console.log(cart)
//             console.log('-----------obtener un carrito por su id----------')
//             return cart
//         } else {
//             console.log('Error al obtener los carritos')
//             return null//Si no existe devuelve null
//         }
//     }

//     //Añadir carrito
//     addCart = () => {
//         const id = this.carts.length + 1//Genera un id
//         const cart = { id, products: [] }//Genera un cart
//         this.carts.push(cart)
//         this.saveProducts()// Guarda después de agregar un carrito
//         console.log(cart)//Muestra por consola el cart agregado
//         return cart
//     }

//     // Eliminar un carrito por su ID
//     deleteCart = async (cartId) => {
//         try {
//             const carts = await this.getCarts()//Obtiene todos los carts
//             const cartIndex = carts.findIndex((cart) => cart.id === cartId)//Busca el cart a eliminar
//             if (cartIndex !== -1) {
//                 const deletedCart = carts.splice(cartIndex, 1)[0]//Si existe lo elimina
//                 this.saveProducts()// Guardar después de eliminar el carrito
//                 console.log(`Carrito con ID ${cartId} eliminado`)
//                 return deletedCart
//             } else {
//                 console.log(`No se encontró el carrito con ID ${cartId}`)
//                 return null
//             }
//         } catch (error) {
//             console.error(`Error al eliminar el carrito con ID ${cartId}: ${error}`)
//             return null
//         }
//     }

//     //Obtener los productos de un carrito
//     getCartProducts = async (id) => {
//         // const carts = await this.getCarts()//Obtiene todos los productos
//         const carts = await this.carts//Obtiene todos los productos
//         //console.log(carts)
//         console.log('LINEA 79'+this.readProducts())
//         if (carts) {
//             const cart = this.carts.find(cart => cart.id == id)//Busca el que coincida
//             if (cart) {
//                 console.log(`Productos del carrito ${id}:`, cart.products)
//                 return cart.products
//             } else {
//                 console.log(`No se encontró el carrito con ID ${id}`)
//                 return null
//             }
//         } else {
//             console.log('Error al obtener los carritos')
//             return null
//         }
//     }
    
//     // addProductToCart = async (cartId, productId) => {
//     //     const carts = await this.getCarts() // Obtiene todos los carritos
//     //     if (carts) {
//     //         const cartIndex = carts.findIndex((cart) => cart.id === cartId)//Busca el indice
//     //         console.log ('LINEA 160 '+ cartIndex)
//     //         if (cartIndex !== -1) {
//     //             const cart = carts[cartIndex]//Guarda el cart con ese indice
//     //             console.log('DESDE 163: ', cart, typeof cart, JSON.stringify(cart, null, 2), cart.products, cart.id)
//     //             if (typeof cart === 'object' && cart !== null && 'products' in cart) {
//     //                 const products = cart.products
//     //                 console.log('LINEA 172 ', products)//Muestra los productos
//     //                 // Verificar si el producto ya está en el carrito
//     //                 const productIndex = products.findIndex(products=> products.id == productId)
//     //                 if (productIndex !== -1) {
//     //                     // Si el producto ya está en el carrito, incrementar la cantidad
//     //                     products[productIndex].quantity ++
//     //                     console.log('Cantidad aumentada')
//     //                 } else {
//     //                     // Si el producto no está en el carrito, agregarlo con cantidad 1
//     //                     const product = {
//     //                         id: productId,
//     //                         quantity: 1,
//     //                     }
//     //                     products.push(product)
//     //                 }
//     //                 this.carts[cartIndex]={...cart}
//     //                 this.saveProducts() // Guardar después de agregar un producto al carrito
//     //                 console.log(`Producto agregado al carrito ${cartId}:`, productId, JSON.stringify(this.carts))
//     //                 return carts
//     //             } else {
//     //                 console.log('No se encontró la propiedad "products" en el objeto "cart".');
//     //             }
//     //         } else {
//     //             console.log(`No se encontró el carrito con ID ${cartId}`);
//     //             return null;
//     //         }
//     //     } else {
//     //         console.log('Error al obtener los carritos');
//     //         return null;
//     //     }
//     // }
//     addProductToCart = async (cartId, productId) => {
//         try {
//             const carts = await this.getCarts();
    
//             if (carts) {
//                 const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    
//                 if (cartIndex !== -1) {
//                     const cart = carts[cartIndex];
    
//                     if (typeof cart === 'object' && cart !== null && 'products' in cart) {
//                         const products = cart.products;
    
//                         const productIndex = products.findIndex((product) => product.id == productId);
    
//                         if (productIndex !== -1) {
//                             // Si el producto ya está en el carrito, incrementar la cantidad
//                             products[productIndex].quantity++;
//                         } else {
//                             // Si el producto no está en el carrito, agregarlo con cantidad 1
//                             const product = {
//                                 id: productId,
//                                 quantity: 1,
//                             };
//                             products.push(product);
//                         }
    
//                         // Actualizar solo el carrito específico en la lista completa de carritos
//                         carts[cartIndex].products = products;
    
//                         // Guardar después de actualizar solo el carrito específico
//                         this.saveProducts();
    
//                         // Mostrar mensaje de éxito
//                         console.log(`Producto agregado al carrito ${cartId}:`, productId, JSON.stringify(carts));
//                         return carts;
//                     } else {
//                         console.log('No se encontró la propiedad "products" en el objeto "cart".');
//                         return null;
//                     }
//                 } else {
//                     console.log(`No se encontró el carrito con ID ${cartId}`);
//                     return null;
//                 }
//             } else {
//                 console.log('Error al obtener los carritos');
//                 return null;
//             }
//         } catch (error) {
//             console.error(`Error al agregar producto al carrito: ${error}`);
//             return null;
//         }
//     };
    
    
    
    
    
// }

// module.exports = CartManager

// const carrito = new CartManager('cart.json')

// //Añadir un carrito
// carrito.addCart()
// carrito.addCart()
// carrito.addCart()
// carrito.addCart()
// console.log('------------agregar carrito------------')
// // //Eliminar un carrito
// // carrito.deleteCart(1)
// // console.log('------------eliminar carrito------------')

// // Añadir productos al carrito con ID 2
// carrito.addProductToCart(2, 4)
// carrito.addProductToCart(2, 4)
// carrito.addProductToCart(2, 4)
// carrito.addProductToCart(2, 5)






// carrito.addProductToCart(2, { id: 1, name: 'Producto 1', price: 10 })
// carrito.addProductToCart(2, { id: 2, name: 'Producto 2', price: 20 })

// // Obtener todos los carritos
// carrito.getCarts().then(carts => {
    //     console.log(carts)
    //     console.log('------------obtener todos los carritos------------')
    // })
    
    // //Obtener el cart con ID 2
    // carrito.getCartId(2)
    
    // // Obtener los productos del carrito con ID 2
    // carrito.getCartProducts(2)
    
    
    // // Añadir un producto a un carrito
    // addProductToCart = async (cartId, productId) => {
    //     const carts = await this.getCarts()// Obtiene todos los carritos
    //     if (carts) {
    //         const cartIndex = carts.findIndex((cart) => cart.id === cartId)
    //         if (cartIndex !== -1) {
    //             const cart = carts[cartIndex]
    //             // Verificar si el producto ya está en el carrito
    //             const productIndex = cart.products.findIndex(
    //                 (product) => product.id === productId
    //             )
    //             if (productIndex !== -1) {
    //                 // Si el producto ya está en el carrito, incrementar la cantidad
    //                 cart.products[productIndex].quantity++
    //             } else {
    //                 // Si el producto no está en el carrito, agregarlo con cantidad 1
    //                 const product = {
    //                     id: productId,
    //                     quantity: 1,
    //                 }
    //                 cart.products.push(product)
    //             }
    //             this.saveProducts(); // Guardar después de agregar un producto al carrito
    //             console.log(`Producto agregado al carrito ${cartId}:`, productId)
    //             return cart
    //         } else {
    //             console.log(`No se encontró el carrito con ID ${cartId}`)
    //             return null
    //         }
    //     } else {
    //         console.log('Error al obtener los carritos')
    //         return null
    //     }
    // }