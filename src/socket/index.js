//CLASE COMPLEMENTARIA QA
//servidor de socket
const Chat = require('../db/models/mensajes.model')
const socketServer = (socket, io) =>{
    console.log('user conectado (index de socket');
    socket.emit('messages', messages)
    socket.on('newMessage', (data)=>{
        console.log('data: '+ data)
        Chat.insertMany({
            user: data.user,
            message: data.message
        })
        let message = Chat.find()
        io.emit('messages', message)
    })
}
module.exports = socketServer

