
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
        try{
            const contenido = await fs.promises.readFile("productos.txt","utf-8")
            console.log(contenido.length)

            if(contenido.length == 0)
            {   
                
                    product.id=1
                  
                    await fs.promises.appendFile("productos.txt",JSON.stringify([product]))
                    return product.id
            }
            else{
                
                   
                    const contenidoJson = JSON.parse(contenido.toString().trim())
                    product.id = contenidoJson.length + 1
                    contenidoJson.push(product)
                    await fs.promises.writeFile("productos.txt",JSON.stringify(contenidoJson))
                    console.log(contenidoJson)
                    return product.id
                
                
                
            }

        }
        catch(err){
            console.log(err)
            
        }
    }

    async getById(number){
        try{
            const contenido = await fs.promises.readFile("productos.txt","utf-8")
            const contenidoJson = JSON.parse(contenido.toString().trim())
            console.log(contenidoJson[number-1])
            return contenidoJson[number-1]
        }
        catch(err){
            console.log(err)
        }

    }

    async getAll(){
        try{
            const contenido = await fs.promises.readFile("productos.txt","utf-8")
            const contenidoJson = JSON.parse(contenido.toString().trim())
            console.log(contenidoJson)
            return(contenidoJson)
        }
        catch(err){

            console.log(err)

        }

    }

    async deleteById(number){
    
        try{
            const contenido = await fs.promises.readFile("productos.txt","utf-8")
            const contenidoJson = JSON.parse(contenido.toString().trim())
            console.log(contenidoJson)
            contenidoJson.splice(number-1,1)
            console.log(contenidoJson)
            await fs.promises.writeFile("productos.txt",JSON.stringify(contenidoJson))
        }
        catch(err){
            console.log(err)
        }
    }

    async deleteAll(){

        try{
            await fs.promises.unlink("productos.txt")
        }
        catch(err){
            console.log(err)
        }
    }
}

let producto = new Producto ("apples",10,"foto de manzanas")
let producto1 = new Producto ("banana",20,"foto de bananas")
let producto2 = new Producto ("naranjas",120,"foto de naranjas")
let contenedor = new Contenedor("productos.txt")


contenedor.save(producto)




