const Router = require( "express")
const ProductManager = require( "../../productManager")
const productManager=new ProductManager (`../../products.JSON`)


//Crud de productos (Create, Read, Update, Delete)
const routerProd= Router()

routerProd.get('/', async(req, res)=>{
    const limit= req.query.limit //Busca el limite
    let productos= await productManager.getProducts()//Obtiene los productos
    const cantidadDeProductos= productos.length//Guarda cuantos productos hay
    let mensaje="Todos los productos"
    if (limit <= productos.length)//Verifica que no se solicite mas productos que los disponibles
    {
        if (limit) {
            let productsLimit= productos.slice(0, parseInt(limit))//Extrae una porcion de el array con el limite
            mensaje=`Limite de productos: ${limit} <br> Cantidad de productos disponibles: ${cantidadDeProductos}`
            productos=productsLimit
        }
    }else{
        mensaje = `Los productos disponibles son ${cantidadDeProductos}`//En caso que se soliciten mas productos de los que hay se muestra este mensaje y todos los productos
    }
    if (productos) {
        res.status(200).send(`
        <div>
            <h1 style="color: red">
                ${mensaje}
            </h1>
            <h2 style="color: blue">
                ${productos}
            </h2>
        </div> `)
    }else{
        res.status(404).send(`
            <div>
                <h1 style="color: red">
                    Producto no encontrado
                </h1>
            </div>
        `)
    }


})

routerProd.get('/:id', async(req, res)=>{
    const id = Number(req.params.id)//lo convierte a Number para usarlo en getProductById
    const product = await productManager.getProductById(id)
    if (product) {
        res.status(200).send(`
        <div>
            <h1 style="color: red">
                Producto con ID: ${id}
            </h1>
            <h2>
                ${product}
            </h2>
        </div>`)
    }else{
        res.status(404).send(`
            <div>
                <h1 style="color: red">
                    Producto no encontrado
                </h1>
            </div>
        `)
    }
})

routerProd.post('/', async(req, res)=>{
    const title = req.query.title
    const description = req.query.description
    const price = req.query.price
    const thumbnail = req.query.thumbnail
    const code = req.query.code
    const stock = req.query.stock
    if (title && description && price && thumbnail && code && stock) {
        await productManager.addProduct(title, description, price, thumbnail, code, stock)
        res.status(200).send(`
            <div>
                <h1>
                    Producto añadido correctamnte
                </h1>
            </div>
        `)
    }else{
        res.status(404).send(`
            <div>
                <h1 style="color: red">
                    Hubo un error, todos los campos son obligatorios
                </h1>
            </div>
        `)
    }
})

routerProd.put('/:id/', async (req, res) => {
    const id = req.params.id;
    const { title, description, price, thumbnail, code, stock } = req.query;

    // Verificar si al menos uno de los campos está presente en la solicitud
    if (title || description || price || thumbnail || code || stock) {
        const updatedFields = {};
        // Verificar cada campo y agregarlo a updatedFields si está presente en la solicitud
        if (title) updatedFields.title = title;
        if (description) updatedFields.description = description;
        if (price) updatedFields.price = price;
        if (thumbnail) updatedFields.thumbnail = thumbnail;
        if (code) updatedFields.code = code;
        if (stock) updatedFields.stock = stock;

        try {
            // Llamar a la función updateProduct con el ID y los campos actualizados
            await productManager.updateProduct(id, updatedFields);
            res.status(200).send(`Producto con ID: ${id} actualizado correctamente`);
        } catch (error) {
            console.log(`Error al actualizar el producto con ID ${id}: ${error}`);
            res.status(500).send('Error interno del servidor' );
        }
    } else {
        // Si no se proporciona ningún campo válido, devolver un mensaje de error
        res.status(400).send('Se requiere al menos un campo para actualizar');
    }
});

routerProd.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    const eliminado = await productManager.deleteProduct(id)
    if (eliminado) {
        res.status(200).send("Producto eliminado con éxito")
    } else {
        res.status(400).send("Ocurrió un error")
    }
})
module.exports = routerProd