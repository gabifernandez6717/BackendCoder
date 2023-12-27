class ProductManager{
    constructor(){
        this.producto=[]
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
}
const products= new ProductManager()

//añadir productos
products.addProduct('el rey leon', 'un libro de reyes leones', 600, 'www.elrey.com', 123, 8)
products.addProduct('la bella y la besta', 'un libro de bella y bestia', 500, 'www.labestia.com', 456, 5)

console.log('-------------------------------------------------------')

//obtener todos los productos
products.getproducts()

console.log('-------------------------------------------------------')

//obtener producto por el ID
products.getProductById(2)