const mongoose = require('mongoose')
const esquemaMensajes = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})
const Mensaje = mongoose.model('Message', esquemaMensajes)
module.exports = Mensaje