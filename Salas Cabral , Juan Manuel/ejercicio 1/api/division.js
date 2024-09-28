import express from "express"

const router = express.Router()

router.post("/",(req,res)=>{
    const{n1,n2} = req.body
    if (n2=== 0 ){
        res.status(400).send({error: "No se puede dividir en base 0"})
        return
    }
    res.status(201).send({resultado : n1/n2})
})

export default router