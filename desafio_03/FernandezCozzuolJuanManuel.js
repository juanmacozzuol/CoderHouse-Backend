const {Contenedor} = require('../desafio_03/contenedor.js')
const express = require('express');

const app = express()
const PORT = 8080
const contenedor = new Contenedor("productos.txt")


const server = app.listen(PORT,() => {
    console.log(`Servidor activo y escuchando en el puerto ${server.address().port}`)
})

server.on('error',(error)=> console.log(`se registró el siguiente error: ${error.message}`))

app.get('/',async(req,res) => {res.send(await contenedor.getAll())})

app.get('/productoRandom',async(req,res) =>{
    const random = (parseInt(Math.random()*3)+1)    
    
    res.send(await contenedor.getById(random))
})