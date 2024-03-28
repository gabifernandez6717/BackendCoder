//Importaciones
const express = require('express')
const { __dirname: rootDir } = require('./path/path')
const handlebars = require('express-handlebars')
const productsHandlebarsRoutes = require('./routes/productsHandlebarsRoutes')
const http = require('http')
const {Server} = require('socket.io')
const realTimeProducts = require('./routes/realTimeProductsHandlebarsRoutes')
const PORT = 8080
const Database  = require('./dao/db/index')
const app = express()
const views = __dirname + '/views'//Path de carpeta views
const server = http.createServer(app)//Por socket.io
const productsRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.routes')
const chatRoute = require('./routes/chat.route')
const ChatManager = require('./dao/db/managers/chatManager')
const chatManager = new ChatManager()


// Motor de plantilla Handlebars
app.engine('handlebars', handlebars.engine())// Inicializa handlebars dentro de la app
app.set('view engine', 'handlebars')// Los archivos de views van a tener la extension .handlebars
app.set('views', views)// Configurar la carpeta views

// Middlewares
app.use(express.json())// Para enviar y recibir archivos JSON
app.use(express.urlencoded({ extended: true }))// Permitir extensiones en la URL

// Routes
app.use('/prod', productsRoute )//DATABASE
app.use('/cart', cartRoute )//DATABASE
app.use('/chat', chatRoute)
app.use('/realTimeProducts', realTimeProducts)//Con websocket
app.use('/allProducts', productsHandlebarsRoutes)//Con handlebars

//Public
app.use('/public', express.static(__dirname + '/public'))//Declara los archivos de public, staticos

const io = new Server (server)

io.on('connection', async (socket)=>{
    console.log('User conectado')
    const chat = await chatManager.readMessage()
    socket.emit("chat", chat)
    socket.on('newMessage', (data)=>{
        console.log(data.user)
        console.log(data.message)
        chatManager.createMessage(data)
    })
    socket.on('deleteMessage', async ()=>{
        await chatManager.deleteMessages()
        console.log("Mensajes eliminados")
        socket.emit('messagesDeleted')
    })
})

server.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT)
    Database.connect()
})