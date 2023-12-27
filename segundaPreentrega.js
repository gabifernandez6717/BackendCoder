const fs = require('fs') // Manejar el sistema de archivos

class ProductManager {
    constructor(filePath) {
        this.producto = []
        this.filePath = filePath // Ruta del archivo
        this.loadProducts() // Cargar productos al inicializar la instancia
    }

    addProduct(title, description, price, thumbnail, code, stock){
        //verificar que esten todos los campos
        if (title||description||price||thumbnail||code||stock){
            //verificar el code
            if (!this.producto.some((product)=>product.code===code)) {
                //generar ID
                let idAutoincrementable=this.producto.length +1

                let newProduct={title, description, price, thumbnail, code, stock, idAutoincrementable}
                this.producto.push(newProduct)
                console.log(`-Libro añadido: ${title}, el id de este producto es ${newProduct.idAutoincrementable}`)
            }
            else{
                console.log(`el producto con el codigo: ${code} ya fue ingresado`)
            }
        }
        else{
            console.log('Todos los campos son obligatorios')
        }
    }

    getproducts(){
        if (this.producto.length) {
            let oldProducts= this.producto.forEach(products=>console.log(products))
            return oldProducts
        }
        else{
            console.log('No hay productos')
        }
    }

    getProductById(id){

        let productById=this.producto.find((producto)=>producto.idAutoincrementable===id)
        if(productById){
            console.log(productById)
        }
        if(!productById){
            console.log(`${id} Not found`)
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

const products = new ProductManager('aca va la ruta del archivo json')

//añadir productos
products.addProduct('el rey leon', 'un libro de reyes leones', 600, 'www.elrey.com', 123, 8)
products.addProduct('la bella y la besta', 'un libro de bella y bestia', 500, 'www.labestia.com', 456, 5)

console.log('-------------------------------------------------------')

//obtener todos los productos
products.getproducts()

console.log('-------------------------------------------------------')

//obtener producto por el ID
products.getProductById(2)

// Ejemplo de uso de los nuevos métodos
console.log('-------------------------------------------------------')

products.updateProduct(1, { price: 700, stock: 10 }); // Actualizar precio y stock del producto con ID 1

console.log('-------------------------------------------------------')

products.deleteProduct(2); // Eliminar el producto con ID 2

console.log('-------------------------------------------------------')

products.getproducts(); // Mostrar todos los productos después de las operaciones