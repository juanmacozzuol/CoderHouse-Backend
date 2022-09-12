const express = require('express');
const {Contenedor} = require('../../contenedor')
const router = express.Router();

const contenedor = new Contenedor("productos.json")

//Middlewares


//Routes

router.get('/',async(req,res)=>{

    res.status(200).json(await contenedor.getAll())
})

router.get('/:id',async(req,res)=>{
    const products = await contenedor.getAll()
    if(+req.params.id > products.length )
    {
        res.status(400).json({error:'producto no encontrado'})
    }
    else{
    res.status(200).json(await contenedor.getById(req.params.id))
    }
})

router.post('/',async(req,res)=>{
    const {title,price,thumbnail} = req.body
    
    const products = await contenedor.getAll()
    
   const  newProduct = { title,
                    price,
                    thumbnail,
                    id:products.length +1
                }
   
    
    await contenedor.save(newProduct)
    res.status(200).json(newProduct) 
})

router.put('/:id',async(req,res)=>{

    const {title,price,thumbnail}=req.body
    const products =await contenedor.getAll()
    if(+req.params.id > products.length )
    {
        res.status(400).json({error:'producto no encontrado'})
    }
    else{
        const productIndex = products.findIndex((product) => product.id == parseInt(req.params.id));
    
        const newProduct = {
            ...products[productIndex],
            title,
            price,
            thumbnail
        }
        products[productIndex]=newProduct

        contenedor.modifyById(products)
        return res.json({ success: true, result: newProduct});
    }

})

router.delete('/:id',async(req,res)=>{
    const products = await contenedor.getAll()
    if(+req.params.id > products.length )
    {
        res.status(400).json({error:'producto no encontrado'})
    }
    else{
        await contenedor.deleteById(req.params.id)
        return res.json({ success: true, result: 'product correctly eliminated' });
    }
   
})



module.exports = router;