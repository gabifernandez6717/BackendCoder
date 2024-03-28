const mongoose = require('mongoose')

module.exports = {
    connect: () => {
        console.log('Intentando conectarse')
        return mongoose.connect("mongodb+srv://gabito2005usa:dataContraseña@coderbackend.r4gf3ia.mongodb.net/ecomerce")
        .then(()=>{
            console.log('Base de datos conectada')
        }).catch( (err) =>{
            console.log(`ERROR: ${err} `)
        })
    }
}