const socket = io()
const productList = document.getElementById('product-list');




const updateProducts =(productos) =>{
fetch("/list.hbs")
    .then(data => data.text()) 
    .then(text =>{
    
        const template = Handlebars.compile(text)
  
        productList.innerHTML = template(productos)
        

    })
}

const updateMessages =(mensajes) =>{
    fetch("/chat.hbs")
        
        .then(data => data.text()) 
        .then(text =>{
         
            const template = Handlebars.compile(text)
      
          chat.innerHTML = template(mensajes)
            
    
        })
    }

socket.on("updateProducts",(data)=>updateProducts(data))
socket.on("updateMessages",(data)=>updateMessages(data))


document.getElementById('product-form').addEventListener('submit',(e)=>{

    e.preventDefault()
    const formData = new FormData(e.target);
    const inputsData = Object.fromEntries(formData);
    document.getElementById('product-form').reset()
    socket.emit('newProduct', inputsData )
})

document.getElementById('chat-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log("chat")
    const formData = new FormData(e.target);
    const inputsData = Object.fromEntries(formData);
    inputsData.timestamp = new Date(Date.now()).toUTCString()
    socket.emit('newMessage', inputsData )
    
})