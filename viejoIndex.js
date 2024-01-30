// const express = require('express')
// const { __dirname: rootDir } = require('./src/path')
// const handlebars = require('express-handlebars')
// const routerProd = require('./src/routes/products.routes')
// const routerCart = require('./src/routes/cart.routes')
// const usersRouter = require('./src/routes/users.routes')

// const PORT = 8080
// const app = express()

// console.log('dirname:'+__dirname+'/src/views/home.handlebars')

// //Motor de plantilla Handlebars
// app.engine('handlebars', handlebars.engine())//Inicializa handlebars dentro de la app
// app.set('view engine', 'handlebars')//Los archivos de views van a tener la extension .handlebars
// app.set('views', './src/views')//Configurar la carpeta views


// // Middlewares
// app.use(express.json())// Para enviar y recibir archivos JSON
// app.use(express.urlencoded({ extended: true }))// Permitir extensiones en la URL

// // Routes
// app.use('/api/users', usersRouter)
// app.use('/api/products', routerProd)
// app.use('/api/carts', routerCart)
// app.use('/static', express.static(rootDir + '/public'))

// console.log(rootDir + '/public')

// app.listen(PORT, () => {
//     console.log('listening on port ' + PORT)
// })
