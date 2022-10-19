const products_db = {

 
    client: 'mysql',
    connection:{
      host:"127.0.0.1",
      port: 3306,
      user:'root',
      database:'desafio_07'

  }
  


};

const messages_db = {

 
  client:"sqlite3",
  connection:{
      filename:"./db/sqlite/messages.sqlite"
  },
  useNullAsDefault:true



};


module.exports = {products_db,messages_db}