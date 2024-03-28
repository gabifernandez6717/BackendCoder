//REAL TIME PRODUCTS
const socket = io()

//Funcion para renderizar en el front los productos agregados
const render =  (data)=>{
    const output = JSON.stringify(data, null, 2)
    document.getElementById('ProductsContainer').innerHTML = output
    }

//Escucha el servidor
socket.on("chat", (data)=>{
    render(data)//Le pasa la data a la funcion render para verla en el front
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