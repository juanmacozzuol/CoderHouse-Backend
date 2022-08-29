
fs = require('fs')

class Producto {
    constructor(title,price,thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}
    
class Contenedor{
    constructor(fileName){
         this.fileName = fileName
        
      
    }
        
    async save(product){
        if(fs.existsSync('productos.txt'))  
        {
            try{
                const contenido = await this.getAll()

                if(contenido.length == 0)
                {   
                    
                        product.id=1
                    
                        await fs.promises.appendFile("productos.txt",JSON.stringify([product]))
                        return product.id
                }
                else{
                    
                        
                        
                        product.id = contenido.slice(-1)[0].id+1
                        contenido.push(product)
                        await fs.promises.writeFile("productos.txt",JSON.stringify(contenido))
                    console.log("nuevo producto guardado:",contenido)
                        return product.id
                    
                    
                    
                }

            }
            catch(err){
                console.log(err)
                
            }
        }
        else{
            console.log("el archivo no existe.")
        }     
    }

    async getById(number){
        try{
            const contenido = await fs.promises.readFile("productos.txt","utf-8")
            const contenidoJson = JSON.parse(contenido)
            console.log("elemento pedido por id:",contenidoJson[number-1])
            if (number <=contenidoJson.length){ 
                return contenidoJson[number-1]
            }
            else{
                 console.log("no se encontró el item deseado")
            }
           
        }
        catch(err){
            console.log(err)
        }

    }

    async getAll(){
        try{
            const contenido = await fs.promises.readFile("productos.txt","utf-8")
            const contenidoJson = JSON.parse(contenido)
            console.log("contenido completo:",contenidoJson)
            return(contenidoJson)
        }
        catch(err){

            console.log(err)

        }

    }

    async deleteById(number){
    
        try{
            const contenido = await fs.promises.readFile("productos.txt","utf-8")
            const contenidoJson = JSON.parse(contenido)
            console.log(contenidoJson)
            if (number <= contenidoJson.length){
                contenidoJson.splice(number-1,1)
                console.log("elemento borrado por id:",contenidoJson)
                await fs.promises.writeFile("productos.txt",JSON.stringify(contenidoJson))
            }
           else{
                console.log("no se encontró el item deseado")
           }
        }
        catch(err){
            console.log(err)
        }
    }

    async deleteAll(){

        try{
            await fs.promises.unlink("productos.txt")
            console.log("revisar archivo")
        }
        catch(err){
            console.log(err)
        }
    }
}

let producto = new Producto ("apples",10,"https://www.collinsdictionary.com/images/full/apple_158989157.jpg")
let producto1 = new Producto ("banana",20,"foto de bananas")
let producto2 = new Producto ("naranjas",120,"foto de naranjas")
let contenedor = new Contenedor("productos.txt")



//Probar metodos uno a uno, todos muestran por consola lo que hacen.
contenedor.save(producto)
// contenedor.getById(2)
// contenedor.getAll()
// contenedor.deleteById(2)
// contenedor.deleteAll()