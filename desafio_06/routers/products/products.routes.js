const express = require('express');
const router = express.Router();



//Middlewares


//Routes

router.get('/',async(req,res)=>{
    
    res.render(`pug/pages/page`)
})



// router.post('/',async(req,res)=>{
//     const {title,price,thumbnail} = req.body
    
//     const products = await contenedor.getAll()
    
//    const  newProduct = { title,
//                     price,
//                     thumbnail,
//                     id:products.length +1
//                 }
   
    
//     await contenedor.save(newProduct)
 
// })

    
  

module.exports = router;