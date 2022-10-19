const dbConfig = require("./config")
const knex = require("knex")(dbConfig.sqlite)

const create = async ()=>{


    try{
        const tableExists = await knex.schema.hasTable("messages")
        if(!tableExists){
            await knex.schema.createTable("messages",(table)=>{
                table.increments("id")
                table.string("mail")
                table.string("texto")
                table.string("timestampa")
            })
        }
    

    }
    catch(error){console.log(error)}
    finally{knex.destroy()}
}

create()