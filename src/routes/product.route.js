/////////////CLASE 14 CRUD de Productos/////////////
const express = require('express')
const {Router} = express
const ProductManager = require('../dao/db/managers/productManager')
const productManager = new ProductManager()
const route = new Router()
// Mostrar todos los productos
// http://localhost:8080/prod/todosLosProductos
route.get('/todosLosProductos', async (req, res) =>{
    try {
        let response = await productManager.readProducts()
        console.log(response)
        res.send({
            msg : "Productos encontrados",
            data: response
        })
    } catch (error) {
        console.log(error)
    }
})

// Crear productos
// http://localhost:8080/prod/createProducts

route.post('/createProducts', async (req, res) =>{
    try {
        await productManager.createProduct(req.body)
        res.status(201).send({
            msg: 'Producto creado',
            data: req.body
        })
    } catch (error) {
        console.log(error)
    }
})

// Actualizar productos
// http://localhost:8080/prod/:uid
route.put('/:uid', async (req, res) =>{
    let uid = req.params.uid
    let userReplace = req.body
    if(!userReplace){
        return res.send({
            mensaje: "Hubo un error al completar los campos",
            data: req.body
        })
    }
    let result = await productManager.updateProduct(uid, userReplace)
    res.send({
        mensaje : "Actualizado",
        data : result
    })
})

// Eliminar productos
// http://localhost:8080/prod/:uid
route.delete('/:uid', async (req, res) =>{
    let uid = req.params.uid
    let result = await productManager.deleteProduct(uid)
    res.send({
        mensaje : "Eliminado",
        data : result
    })
})

module.exports = route