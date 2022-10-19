const knex = require('knex')

class SQLClient{
    constructor(config,tableName){
        this.knex=knex(config)
        this.tableName=tableName
    }

    createTable(tableName)
    {
       return this.knex.schema.hasTable(tableName)
        .then((response)=>{
            if(!response){
                return this.knex.schema.createTable(tableName,(table)=>{

                })
            }
        })
    }

   async save(items){
        try{
            console.log(items)
            newItem = await this.knex(this.tableName).insert(items)
            return newItem
        }
        catch(error){console.log(error)}

    }


    async getAll(){
        try{
           const products = await this.knex.select().from(this.tableName)
            return products
        }
        catch(error){console.log(error)}

    }

    async getById(id) {
        try {
            const data = await this.knex.select().where('id', id).from(this.tableName)
            return data;
        }
        catch (error) { 
            console.log(error)
            
        }
    }

    async deleteById(id){
        try{
            const delation =await this.knex.from(this.tableName).where({id}).del()
            return delation
        }
        catch(error){console.log(error)

        }
        
    }




}

module.exports ={SQLClient}