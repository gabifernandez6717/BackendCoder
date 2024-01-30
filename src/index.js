// C:\Users\Gabri\Desktop\CoderBackend\src\index.js
const express = require('express')
const { __dirname: rootDir } = require('./path')
const handlebars = require('express-handlebars')
const routerProd = require('./routes/products.routes')
const routerCart = require('./routes/cart.routes')
const usersRouter = require('./routes/users.routes')

const PORT = 8080
const app = express()
const views = __dirname+'/views'//Path de carpeta views

// Motor de plantilla Handlebars
app.engine('handlebars', handlebars.engine())// Inicializa handlebars dentro de la app
app.set('view engine', 'handlebars')// Los archivos de views van a tener la extension .handlebars
app.set('views', views)// Configurar la carpeta views

// Middlewares
app.use(express.json())// Para enviar y recibir archivos JSON
app.use(express.urlencoded({ extended: true }))// Permitir extensiones en la URL

// Routes
app.use('/api/users', usersRouter)
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/static', express.static(rootDir + '/public'))

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})
