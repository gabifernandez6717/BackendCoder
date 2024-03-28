const Mensaje = require('../models/mensajes.model')

class chatManager{
    //Crear un mensaje
    async createMessage (data){
        console.log('la data que llego a cartManager es: '+ data.user, data.message)
        try {
            await Mensaje.create(data)
            return "Mensaje creado"
        } catch (error) {
            console.log(error)
        }
    }
    //mostrar los mensajes
    async readMessage (){
        try {
            const mensajes = await Mensaje.find()
            //console.log('los mensajes son: '+ mensajes);
            return mensajes
        } catch (error) {
            console.log(error)
        }
    }
    //Actualizar un mensaje
    async updateMessage (id, data){
        try {
            await Mensaje.updateOne({_id:id}, data)
            return "Mensaje actualizado"
        } catch (error) {
            console.log(error)
        }
    }
    //Eliminar un mensaje por su id
    async deleteMessage (id){
        try {
            await Mensaje.deleteOne({_id:id})
            return "Mensaje eliminado"
        } catch (error) {
            console.log(error)
        }
    }
    //Eliminar  mensajes
    async deleteMessages (){
        try {
            await Mensaje.deleteMany()
            return "Mensajes eliminado"
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = chatManager