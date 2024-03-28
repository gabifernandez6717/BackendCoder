const socket = io()
const render = async (data) => {
    let output = ''
    data.forEach(message => {
        output += `<div class="message">
                        <hr/>
                        <p>User: ${message.user}</p>
                        <p>Message: ${message.message}</p>
                    </div>`
    })
    document.getElementById('messages-container').innerHTML = output
}

socket.on('chat', (data)=>{
    render(data)
})
const addMessages = ()=>{
    const user = document.getElementById('name-input').value
    const message = document.getElementById('message-input').value
    socket.emit('newMessage', {user, message})
    //return false
}
const deleteMessages = ()=>{
socket.emit("deleteMessage", {})
}
socket.on('messagesDeleted', () => {
    console.log("Mensajes eliminados")
})
