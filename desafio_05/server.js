
const express = require('express');
const {engine} = require('express-handlebars');
const app = express()
const PORT = process.env.port || 8080;
const productsRoutes = require('./routers/products/products.routes')



if(process.argv[2]==='hbs'){

    app.engine(
        "hbs",
        engine({
            extname: ".hbs",
            defaultLayout: 'layout.hbs',
            layoutsDir:__dirname + "/views/hbs/layouts",
            partialsDir:__dirname + "/views/hbs/partials"
        })
    )
    
    app.set("view engine", "hbs")

}
if(process.argv[2]==='pug'){
    app.set("view engine", "pug")

}
if(process.argv[2]==='ejs'){
    
    app.set("view engine", "ejs")

}

app.set("views","./views")

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

//Routes
app.use('/',productsRoutes)



//Server Initialization
const server = app.listen(PORT,() => {
    console.log(`Servidor activo y escuchando en el puerto ${server.address().port}`)
})

server.on('error',(error)=> console.log(`se registró el siguiente error: ${error.message}`))