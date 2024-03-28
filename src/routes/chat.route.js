const express = require('express')
const ChatManager = require('../dao/db/managers/chatManager')
const chatManager = new ChatManager()
const {Router} = express
const route = new Router()

route.get('/', async (req, res) =>{
    try {
        await chatManager.readMessage()
        res.render('chat', {})
    } catch (error) {
        console.log(error)
    }
})
route.delete('/:id', async (req, res) =>{
    const id = req.params.id
    try {
        const eliminado = await chatManager.deleteMessage(id)
        console.log(eliminado);
        res.render('chat', {})
    } catch (error) {
        console.log(error)
    }
})
module.exports = route