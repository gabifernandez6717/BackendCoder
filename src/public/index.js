//REAL TIME PRODUCTS
const socket = io()

//Funcion para renderizar en el front los productos agregados
const render =  (data)=>{
    const output = data
    document.getElementById('ProductsContainer').innerHTML = output
    }

//Funcion para renderizar en el front los productos eliminados
const renderD =  (data)=>{
    const output = data
    document.getElementById('ProductsContainerD').innerHTML = output
    }

//Escucha el servidor (productos agregados)
socket.on("products", (data)=>{
    render(data)//Le pasa la data a la funcion render para verla en el front
})

//Escucha el servidor (productos eliminados)
socket.on("productsD", (data)=>{
    renderD(data)//Le pasa la data a la funcion renderD para verla en el front
})

//Agregar producto al cart
const addProductToCart = async () => {
    console.log('se ejecutó: addProductToCart')
    //Obtener el id del cart y del producto
    const IdCart = Number(document.getElementById('idCartInput').value)
    const IdPoduct = Number(document.getElementById('idProductInput').value)
    //Enviar los ids al index de src
    socket.emit("idCart&idProduct", {IdCart, IdPoduct})
    return false
}

//Eliminar producto al cart
const deleteProductToCart = async ()=> {
    console.log('se ejecutó: deleteProductToCart')
    //Obtener el id del cart y del producto
    const IdCart = Number(document.getElementById('idCartInputD').value)
    const IdPoduct = Number(document.getElementById('idProductInputD').value)
    //Enviar los ids al index de src
    socket.emit("idCart&idProductD", {IdCart, IdPoduct})
    return false
}