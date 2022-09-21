const express = require('express');
const {Contenedor} = require('../../contenedor')
const router = express.Router();

const contenedor = new Contenedor("productos.json")

//Middlewares


//Routes

router.get('/',(req,res)=>{
   

    res.render(`${process.argv[2]}/pages/form`)
})

router.get('/productos',async(req,res)=>{
    const productos = await contenedor.getAll()

    res.render(`${process.argv[2]}/pages/list`,{productos})
})

router.post('/productos',async(req,res)=>{
    const {title,price,thumbnail} = req.body
    
    const products = await contenedor.getAll()
    
   const  newProduct = { title,
                    price,
                    thumbnail,
                    id:products.length +1
                }
   
    
    await contenedor.save(newProduct)
    res.redirect('/productos')
})

    
  

module.exports = router;