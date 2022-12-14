
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
            
            if (number <=contenidoJson.length){ 
                return contenidoJson[number-1]
            }
            else{
                 console.log("no se encontrĂ³ el item deseado")
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
            
            if (number <= contenidoJson.length){
                contenidoJson.splice(number-1,1)
                
                await fs.promises.writeFile("productos.txt",JSON.stringify(contenidoJson))
            }
           else{
                console.log("no se encontrĂ³ el item deseado")
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





module.exports = {Contenedor}