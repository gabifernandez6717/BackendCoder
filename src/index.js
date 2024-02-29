//Importaciones
const express = require('express')
const { __dirname: rootDir } = require('./path')
const handlebars = require('express-handlebars')
const routerProd = require('./routes/products.routes')
const routerCart = require('./routes/cart.routes')
const productsHandlebarsRoutes = require('./routes/productsHandlebarsRoutes')
const allUsers = require('./allUsers')
const http = require('http')
const {Server} = require('socket.io')
const realTimeProducts = require('./routes/realTimeProductsHandlebarsRoutes')
const PORT = 8080
const app = express()
const views = __dirname+'/views'//Path de carpeta views
const server = http.createServer(app)//Linea es por socket.io
const CartManager = require('../cartManager')
const cartmanager = new CartManager('../../cart.json')

// Motor de plantilla Handlebars
app.engine('handlebars', handlebars.engine())// Inicializa handlebars dentro de la app
app.set('view engine', 'handlebars')// Los archivos de views van a tener la extension .handlebars
app.set('views', views)// Configurar la carpeta views

// Middlewares
app.use(express.json())// Para enviar y recibir archivos JSON
app.use(express.urlencoded({ extended: true }))// Permitir extensiones en la URL

// Routes
app.use('/allProducts', productsHandlebarsRoutes)//Con handlebars
app.use('/realTimeProducts', realTimeProducts)//Con websocket
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)

//Public
app.use('/public', express.static(rootDir + '/public'))//Declara los archivos de public, staticos

//Usuarios aleatorios
// http://localhost:8080/allUsers
app.get('/allUsers', (req, res)=>{
    const user = allUsers[Math.floor(Math.random()*allUsers.length)]//Genera un numero redondeado aleatorio entre 0 y allUsers.length
    res.render( 'allUsers',{nombre: 'Gabi' , user})
})

const io = new Server (server)

io.on('connection', async (socket)=>{
    console.log('User conectadisimo')

    //Mostrar un producto
    const productsCart = async (IdCart)=>{
        const cart = await cartmanager.getProductsByCartId(IdCart)//Obtiene los productos del cart
        const productsCart = cart.products.map(products=> `
            Id: ${products.id},
            Quantity: ${products.quantity}
            `).join('<br>')//Recorre los productos y muestra el id y la cantidad, separandolos con un salto de linea
        return productsCart
    }

    //Agregar un producto
    socket.on("idCart&idProduct", async (data)=>{
        //Obtiene los IDs
        const IdCart = data.IdCart
        const IdProduct = data.IdPoduct
        const addProductToCart = await cartmanager.addProductToCart (IdCart, IdProduct)//Agrega el producto al carrito
        const products = await productsCart(IdCart)//Llama a la funcion y le pasa el IdCart
        //Envia los productos al index public
        socket.emit("products", products)
        return false
    })

    //Eliminar un producto
    socket.on("idCart&idProductD", async (data)=>{
        //Obtiene los IDs
        const IdCart = data.IdCart
        const IdProduct = data.IdPoduct
        const deleteProductToCart = await cartmanager.deleteProductToCart (IdCart, IdProduct)//Elimina el producto del carrito
        const products = await productsCart(IdCart)//Llama a la funcion y le pasa el IdCart
        //Envia los productos al index public
        socket.emit("productsD", products )
        return false
    })
})

server.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT)
})