import { Router } from "express";
//crud productos

const routerProd=Router()

routerProd.get('/', async(req, res)=>{

})
routerProd.get('/:id', async(req, res)=>{

})
routerProd.post('/', async(req, res)=>{
    
})
routerProd.put('/:id', async(req, res)=>{
    
})
routerProd.delete('/:id', async(req, res)=>{
    const {id} = req.params
})

export default routerProd
