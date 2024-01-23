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

    //Obtener los productos de un carrito
    getCartProducts = async (id) => {
        const carts = await this.getCarts()
        if (carts) {
            const cart = carts.find(cart => cart.id === id)
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
    addProductToCart = async (cartId, product) => {
        const carts = await this.getCarts()//Obtiene todos los carritos
        if (carts) {
            const cartIndex = carts.findIndex(cart => cart.id === cartId)
            if (cartIndex !== -1) {
                carts[cartIndex].products.push(product)// Agregar el producto al carrito encontrado
                this.saveProducts() // Guardar después de agregar un producto al carrito
                console.log(`Producto agregado al carrito ${cartId}:`, product)
                return carts[cartIndex]
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









































































// const fs = require('fs') // Manejar el sistema de archivo
// class CartManager {
//     constructor(path) {
//         this.path=path
//         this.carts=[]
//     }

//     //Guardar productos en el archivo
//     saveProducts() {
//         fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf8')
//         console.log('Cambios guardados')
//     }

//     //Obtener carts
//     getCarts= async ()=> {
//         const response= await this.carts//Obtiene los carts
//         if (response) {
//             const carts = JSON.stringify(response).split()
//             console.log( `Desde getCarts :${carts}, ${typeof carts}`)
//             return carts
//         }else{
//             console.log('Error al obtener los carritos')//si hay un error muestra esto
//         }
//     }

// getCartProducts = async (id) => {
//         const carts = await this.getCarts()//Todos los carritos
//         const cart = carts.find(cart => cart.id === id)//Busca el carrito con el mismo id de parametros
//         console.log(cart)
//     }
    
//     //Añadir carrito
//     addCart = () => {
//         const id = this.carts.length + 1
//         const cart = {id, products: []}
//         this.carts.push(cart)
//         this.saveProducts()// Guarda después de agregar un carrito
//         return console.log(cart)//Muestra por consola el cart agregado
//     }
//     //Bloque de codigo para ejecutar algunas pruebas y testeos
//     prueba = () => {
//         console.log(this.carts)
//         console.log(this.path)
//     }
    
    
// }

// module.exports = CartManager

// const carrito = new CartManager('cart.json')


// carrito.addCart()
// carrito.addCart()
// carrito.addCart()
// carrito.addCart()
// console.log('------------agregar carrito------------')
// //Obtener todos los carritos
// console.log(carrito.getCarts())
// console.log('----------obtener todos carritos (getCarts)-----------')
// //Obtener un producto de un carrito
// console.log(carrito.getCartProducts(2))
// console.log('----------obtener un producto de un carrito (getCartProducts)-----------')



// carrito.getCarts().then(result => {
//     console.log(`Desde getCarts: ${result}, ${typeof result}`)
//     console.log('----------obtener todos carritos-----------')
// }).catch(error => {
//     console.error('Error:', error);
// })


///////BLOQUE DE CODIGO DE GETCARTPRODUCTS///////////////
// if (cart) {
//     const product=cart.props
//     console.log(`Desde getCartsProducts, productos: ${product}`)
//     const carrito= JSON.stringify(cart)
//     console.log(`Desde getCartsProducts: ${carrito.products} ${typeof carrito}`)
// } else {
//     console.log('Carrito no encontrado');
//     return null; // Puedes devolver null o algún valor indicativo de que no se encontró el carrito
// }
        //ESTE CODIGO ANDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        // getCartProducts = async (id) => {
            //     try {
//         const carts = await this.getCarts();
//         console.log(`Desde getCartsProducts: ${carts}`)
//         const cart = await carts.find(cart => cart.id === id);
//         if (cart) {
//             return cart.products;
//         } else {
//             console.log('Carrito no encontrado');
//             return null; // Puedes devolver null o algún valor indicativo de que no se encontró el carrito
//         }
//     } catch (error) {
//         console.error('Error al obtener los productos del carrito:', error);
//         throw error;
//     }
// }



// getCarts = async () => {
//     try {
//         const response = await fs.readFile(this.path, 'utf8');
//         // const responseJSON = JSON.parse(response);
//         return response
//     } catch (error) {
//         console.error('Error al obtener los carritos:', error);
//         throw error;
//     }
// }





// const fs = require('fs');
// class CartManager {
//     constructor(path) {
//         this.carts = [];
//         this.path = path;
//         this.loadProducts();
//     }

//     // Guardar productos en el archivo
//     saveProducts() {
//         fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf8')
//     }
//     //Añadir carrito
//     addCart = () => {
//         const id = this.carts.length + 1
//         const cart = { id, products: [{"title":"desodorante"}] }
//         this.carts.push(cart)
//         console.log(this.carts)
//         this.saveProducts()// Guarda después de agregar un carrito
//     }

//     // Obtener todos los carts
//     getCarts=async()=>{
//         const res = await fs.readFile(this.path, 'utf8', (err, data) => {
//             if (err) {
//                 return console.error('Error al leer el archivo:', err)
//             }else{
//                 const carts = JSON.parse(data)
//                 return console.log('Carts:', carts, `res: ${res}`)
//             }
//         })
//     }



//     // Obtener los productos de un carrito
//     getCartProducts = async(id) => {
//         //obtener todos los carritos
//         const carritos= await this.getCarts()
//         console.log(carritos)




//         // const cart = await carritos.find(c => c.id === id)
//         // if (cart) {
//         //     return console.log(`Desde cart products: ${JSON.stringify(cart.products)}`)
//         // } else {
//         //     console.log(`Cart: ${id} no encontrado`)
//         // }
//     }
    
//     // Cargar productos desde el archivo
//     loadProducts() {
//         try {
//             const data = fs.readFileSync(this.path, 'utf8');
//             this.carts = JSON.parse(data);
//         } catch (error) {
//             // Si no hay productos
//             this.carts = []
//         }
//     }
//     //vaciar carrito
//     emptyCart=()=>{
//         this.carts=[]
//         this.saveProducts()
//         console.log('carrito vaciado')
//     }

//     addProductToCart=async (idCarrito, idProducto)=>{
//         const oldsCarts= await JSON.stringify(this.carts)
//         return console.log(`desde adproductstocart: ${oldsCarts}`)
//     }
// }

// module.exports = CartManager

// const carrito = new CartManager('cart.json')

// carrito.getCartProducts()
// // carrito.getCarts()
// // carrito.addCart()
// // carrito.addCart()
// // carrito.addCart()
// // carrito.addCart()
// // carrito.addCart()
// // carrito.addCart()
// // carrito.addCart()
// // console.log('---------------arriba se añadiero los productos------------------')
// // carrito.getCarts()
// // console.log('--------------arriba se ubtuvieron todos-------------------')
// // // carrito.getCartProducts(1)
// // // console.log('---------------arriba se ubtuvo el id 1------------------')
// // // carrito.emptyCart()
// // // console.log('---------------arriba se borraron todos los productos------------------')
// // // carrito.getCarts()
// // // console.log('----------------arriba se los obtuvo nuevamente-----------------')

