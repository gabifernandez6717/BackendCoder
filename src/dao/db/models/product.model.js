const mongoose = require ('mongoose')

const esquemaProducto = new mongoose.Schema({
    name: {
        type: String, //Que sea un string
        unique: true, //Que los nombres de los productos no se repitan
        require: true, //Que todos los productos obligatoriamente tengan nombre
    },
    price: {
        type: Number,
        require: true,
    },
    category:{
        type: String,
        require: true,
        enum: ['Terror', 'Comedia', 'Educacion', 'Cultura'] //Unicas categorias aceptadas
    },
    stock: {
        type: Number,
        default: 10 //Si no se le agrega stock, toma este valor por defecto
    }

})
const Producto = mongoose.model('Product', esquemaProducto)
module.exports = Producto