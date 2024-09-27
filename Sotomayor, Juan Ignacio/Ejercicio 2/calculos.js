import express from "express"

export const calculosRouter = express.Router()

let lista = []

let id = 0

calculosRouter.get("/",(req,res)=>{
    res.send({lista})
})

calculosRouter.get("/:id",(req,res)=>{
    const id = req.params.id
    const item = lista.find((item)=>item.id==id)
    res.send(item)
})

calculosRouter.post("/",(req,res)=>{
    const {base, altura} = req.body

    if (base>0 && altura>0){
        const figura = {id:++id, base, altura, 
            perimetro: 2*base+2*altura,
            superficie: base*altura , 
            }
        
        lista.push(figura)
        res.send(figura)
    }
    else{
        res.status(404).send("No se pueden ingresar numeros negativos")
    }
})

calculosRouter.put("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {base, altura} = req.body

    const calculoModificado = {id, base, altura, 
        perimetro: 2*base+2*altura,
        superficie: base*altura , 
    }
    
    lista = lista.map((item)=>(item.id == id ? calculoModificado : item))
    res.status(200).send(calculoModificado)
})

calculosRouter.delete("/:id",(req,res)=>{
    const id = parseInt(req.params.id)

    lista = lista.filter((item)=>item.id !==id)
    res.send("Elemento eliminado")
})