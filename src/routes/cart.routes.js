/////////////CRUD de Carts/////////////
const express = require('express')
const {Router} = express
const CartManager = require('../dao/db/managers/cartManager')
const cartManager = new CartManager()
const route = new Router()
// Mostrar todos los carts
// http://localhost:8080/cart/todosLosCart
route.get('/', async (req, res) =>{
    try {
        let response = await cartManager.readCarts()
        console.log(response)
        res.send({
            msg : "Carts encontrados",
            data: response
        })
    } catch (error) {
        console.log(error)
    }
})

// Crear productos
// http://localhost:8080/cart/createCart

route.post('/createCart', async (req, res) =>{
    try {
        await cartManager.createCart(req.body)
        res.status(201).send({
            msg: 'Cart creado',
            data: req.body
        })
    } catch (error) {
        console.log(error, req.body)
    }
})

// Actualizar productos
// http://localhost:8080/cart/:uid
route.put('/:uid', async (req, res) =>{
    let uid = req.params.uid
    let userReplace = req.body
    if(!userReplace){
        return res.send({
            mensaje: "Hubo un error al completar los campos",
            data: req.body
        })
    }
    let result = await cartManager.updateCart(uid, userReplace)
    res.send({
        mensaje : "Actualizado",
        data : result
    })
})

// Eliminar carts
// http://localhost:8080/cart/:uid
route.delete('/', async (req, res) =>{
    let result = await cartManager.deleteAllCarts()
    res.send({
        mensaje : "Carts eliminados",
        data : result
    })
})

// Eliminar carts por su id
// http://localhost:8080/cart/:uid
route.delete('/:uid', async (req, res) =>{
    let uid = req.params.uid
    let result = await cartManager.deleteCart(uid)
    res.send({
        mensaje : "Eliminado",
        data : result
    })
})

module.exports = route