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

















// const http = require('http')
// const server = http.createServer(app)
// const {Server} =require('socket.io')
// const io = new Server(server)
// const Chat = require('../db/models/mensajes.model')

// io.on('connection', (socket) => {
//     console.log('user conectado en index de socket')
//     socket.emit('wellcome', 'hola cliente!')
//     socket.on('newMessage', (data)=>{
//         console.log('desde index de socket: '+ data)
//         messages.push(data)
//         io.sockets.emit('allMessages', messages)
//         Chat.create({
//             user: data.user,
//             messages: data.messages
//         })
//         //funcion que guarde en la base de datos
//     })
// })