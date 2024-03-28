//Manager MongoDB
const uuid4 = require("uuid4")
const Cart = require("../models/cart.model")


class cartManager {

    //Crear un cart
    async createCart (products){
        let id = uuid4()
        console.log('id hecho: '+id)
        const newCart = {
            id: uuid4(),
            products: products
        }
        try {
            await Cart.create(newCart)
            return "cart creado"
        } catch (error) {
            console.log(error)
        }
    }

    //Leer los carts
    async readCarts (){
        try {
            const carts = await Cart.find()
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    //Actualizar un cart
    async updateCart (id, data){
        try {
            await Cart.updateOne({ _id: id }, data)
            return "cart actualizado"
        } catch (error) {
            console.log(error)
        }
    }

    //Eliminar un cart por su id
    async deleteCart (id){
        try {
            await Cart.deleteOne({ _id: id })
            return "Cart eliminado"
        } catch (error) {
            console.log(error)
        }
    }

    //Eliminar los carts
    async deleteAllCarts (){
        try {
            await Cart.deleteMany()
            return "Carts eliminados"
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = cartManager