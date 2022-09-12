
const express = require('express');
const apiRoutes = require('./routers/app.routers')
 
const app = express()
const PORT = process.env.port || 8080;


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

//Routes
app.use('/api',apiRoutes)
//Server Initialization
const server = app.listen(PORT,() => {
    console.log(`Servidor activo y escuchando en el puerto ${server.address().port}`)
})

server.on('error',(error)=> console.log(`se registró el siguiente error: ${error.message}`))