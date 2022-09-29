const socket = io()
const productList = document.getElementById('product-list');


const updateProducts =(productos) =>{
fetch("/list.hbs")
    .then(data => data.text()) 
    .then(text =>{
        console.log(productos)
        const template = Handlebars.compile(text)
  
        productList.innerHTML = template(productos)
        

    })
}

socket.on("updateProducts",(data)=>updateProducts(data))



document.getElementById('product-form').addEventListener('submit',(e)=>{

    e.preventDefault()
    const formData = new FormData(e.target);
    const inputsData = Object.fromEntries(formData);
    document.getElementById('product-form').reset()
    socket.emit('newProduct', inputsData )
})