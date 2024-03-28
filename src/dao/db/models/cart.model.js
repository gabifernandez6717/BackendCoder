const mongoose = require ('mongoose')

const esquemaCart = new mongoose.Schema({
    id:{
        type: String
    },
    products: {
        type: Array
    }
})
const Cart = mongoose.model('Cart', esquemaCart)
module.exports = Cart