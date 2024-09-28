import express from "express"

const router = express.Router()

router.post("/",(req,res)=>{
    const{n1,n2} = req.body
    const total = n1 - n2
    res.status(201).send({resultado : total})
})

export default router