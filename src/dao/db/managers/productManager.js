//Manager MongoDB
const Producto = require("../models/product.model")

class productManager {

    //Crear un producto
    async createProduct (prod){
        try {
            await Producto.create(prod)
            return "producto creado"
        } catch (error) {
            console.log(error)
        }
    }

    //Leer los productos
    async readProducts (){
        try {
            const products = await Producto.find()
            return products
        } catch (error) {
            console.log(error)
        }
    }

    //Actualizar un producto
    async updateProduct (id, data){
        try {
            await Producto.updateOne({ _id: id }, data)
            return "producto actualizado"
        } catch (error) {
            console.log(error)
        }
    }

    //Eliminar un producto
    async deleteProduct (id){
        try {
            await Producto.deleteOne({ _id: id })
            return "producto eliminado"
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = productManager