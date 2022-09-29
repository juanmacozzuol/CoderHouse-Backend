const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: SocketServer } = require('socket.io')
const productsRoutes = require('./routers/products/products.routes')
const {Contenedor} = require("./contenedor")

const PORT = process.env.PORT || 8080
const app = express();
const httpServer = new HttpServer(app)



const contenedor = new Contenedor("productos.json")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.set("view engine", "pug")
app.set("views","./views")

app.use(express.static('public'))

app.use('/',productsRoutes)
httpServer.listen(PORT, ()=>{

    console.log(`Server is up and running on port ${PORT}`)
})

const io = new SocketServer(httpServer)

//on, emit

io.on('connection', (socket) =>{


    console.log("Usuario Conectado")

    contenedor.getAll().then(productos =>{
        socket.emit("updateProducts",{productos})
    })

    // socket.emit("server-message","Este es un mensaje desde el servidor!")
    //servidor escuchando y re emitiendo
    socket.on("message",(data)=>{
        io.emit("server-message",data)
    })

})
