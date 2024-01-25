const fs = require('fs') // Manejar el sistema de archivo

class ProductManager {
    constructor(filePath) {
        this.producto = []
        this.filePath = filePath // Ruta del archivo
        this.loadProducts() // Cargar productos al inicializar la instancia
    }

    addProduct(title, description, price, thumbnail, code, stock, category){
        //verificar que esten todos los campos
        if (title||description||price||thumbnail||code||stock||category){
            //verificar el code
            if (!this.producto.some((product)=>product.code===code)) {
                //generar ID
                let idAutoincrementable=this.producto.length +1
                let status= true
                let newProduct={title, description, price, thumbnail, code, stock, idAutoincrementable, status, category}
                this.producto.push(newProduct)
                console.log(`-Libro añadido: ${title}, el id de este producto es ${newProduct.idAutoincrementable}`)
                this.saveProducts()
            }
            else{
                console.log(`el producto con el codigo: ${code} ya fue ingresado`)
            }
        }
        else{
            console.log('Todos los campos son obligatorios')
        }
    }

    getProducts(){
        if (this.producto.length) {
            let oldProducts= this.producto.map(product=>{
                return `ID: ${product.idAutoincrementable}, Title: ${product.title}, Price: ${product.price}`
            })
            return oldProducts
        }
        else{
            console.log('No hay productos')
            return []
        }
    }

    getProductById(id){
        let productById=this.producto.find((producto)=>producto.idAutoincrementable==id)
        if(productById){
            return JSON.stringify(productById)
        }
        if(!productById){
            console.log(`${id} Not found`)
            return (`${id} Not found`)
        }
    }

    updateProduct(id, updatedFields) {
        const index = this.producto.findIndex((producto) => producto.idAutoincrementable === id)
        if (index !== -1) {
            // Actualizar solo los campos especificados en updatedFields
            this.producto[index] = { ...this.producto[index], ...updatedFields }
            this.saveProducts() // Guardar los productos actualizados en el archivo
            console.log(`Producto con ID ${id} actualizado`)
        } else {
            console.log(`Producto con ID ${id} no encontrado`)
        }
    }

    deleteProduct(id) {
        const index = this.producto.findIndex((producto) => producto.idAutoincrementable === id)
        if (index !== -1) {
            this.producto.splice(index, 1); // Eliminar el producto del array
            this.saveProducts(); // Guardar los productos actualizados en el archivo
            console.log(`Producto con ID ${id} eliminado`)
        } else {
            console.log(`Producto con ID ${id} no encontrado`)
        }
    }

    // Cargar productos desde el archivo
    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8')
            this.producto = JSON.parse(data)
        } catch (error) {
            // Si hay un error al leer el archivo, se asume que aún no hay productos
            this.producto = []
        }
    }

    // Guardar productos en el archivo
    saveProducts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.producto, null, 2), 'utf8')
    }
}
module.exports = ProductManager//Se exporta

const products = new ProductManager('products.JSON')

//añadir productos
products.addProduct('el rey leon', 'un libro de reyes leones', 600, 'www.elrey.com', 123, 8, 'Ficción Infantil')
products.addProduct('la bella y la besta', 'un libro de bella y bestia', 500, 'www.labestia.com', 456, 5, 'Ficción Infantil')
products.addProduct('Cien años de soledad','Obra maestra del realismo mágico escrita por Gabriel García Márquez.',30,'www.libro1.com',124,50, 'Ficción Clásica')
products.addProduct('1984','Distopía escrita por George Orwell que describe un futuro totalitario.',22,'www.libro2.com',454,30, 'Distopía')
products.addProduct('El Hobbit','Aventuras de Bilbo Bolsón escritas por J.R.R. Tolkien.',18,'www.libro3.com',789,40, 'Fantasía')
products.addProduct('Matar a un ruiseñor','Novela clásica escrita por Harper Lee sobre injusticia racial.',35,'www.libro4.com',234,20, 'Ficción Clásica')
products.addProduct('Don Quijote de la Mancha','Obra maestra de la literatura española escrita por Miguel de Cervantes.',28,'www.libro5.com',567,45, 'Ficción Clásica')
products.addProduct('Orgullo y prejuicio','Clásico de Jane Austen que aborda temas de amor y clase social.',15,'www.libro6.com',890,60, 'Ficción Clásica')
products.addProduct('Crónica de una muerte anunciada','Relato de Gabriel García Márquez sobre un asesinato premeditado.',42,'www.libro7.com',345,25,'Ficción Clásica')
products.addProduct('Harry Potter y la piedra filosofal','Primera entrega de la famosa serie escrita por J.K. Rowling.',20,'www.libro8.com',678,35, 'Fantasía')
products.addProduct('Sapiens: De animales a dioses','Historia de la humanidad escrita por Yuval Noah Harari.',25,'www.libro9.com',901,55,'Historia')
products.addProduct('El código Da Vinci','Thriller de misterio escrito por Dan Brown.',32,'www.libro10.com',125,48, 'Historia')

console.log('-------------------------------------------------------')

//obtener todos los productos
console.log(products.getProducts())

// console.log('-------------------------------------------------------')

//obtener producto por el ID
console.log(products.getProductById(4))

console.log('-------------------------------------------------------')
// Actualizar precio y stock del producto con ID 1
products.updateProduct(1, { price: 800, stock: 10 })

console.log('-------------------------------------------------------')
//Eliminar el producto con ID
products.deleteProduct(4); // Eliminar el producto con ID 4

console.log('-------------------------------------------------------')
// Mostrar todos los productos después de las operaciones
console.log(products.getProducts())