const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: SocketServer } = require('socket.io')
const productsRoutes = require('./routers/products/products.routes')
const {Contenedor} = require("./contenedor")

const PORT = process.env.PORT || 8080
const app = express();
const httpServer = new HttpServer(app)



const contenedor = new Contenedor("productos.json")
const chatHistory = new Contenedor("mensajes.json")

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

    chatHistory.getAll().then(mensajes =>{
        socket.emit("updateMessages",{mensajes})
    })

    socket.on('newProduct',(data)=>{

        contenedor.save(data)
        .then(()=>{
        contenedor.getAll()
            .then(productos =>{
                io.emit("updateProducts",{productos})
            })

        })
    })

})

