const express = require('express');
const {Router} = express
const usersRouter = Router()

usersRouter.get('/', (req, res)=>{
    res.render(
        'home',//Renderiza home.handlebars
        { name: 'Gabi'}//Le asigna "Gabi" a name
        )
})

module.exports = usersRouter

