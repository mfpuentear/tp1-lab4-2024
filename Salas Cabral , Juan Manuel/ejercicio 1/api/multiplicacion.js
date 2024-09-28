import express from "express"

const router = express.Router()

router.post("/",(req,res)=>{
    const{n1,n2} = req.body
    res.status(201).send({resultado : n1*n2})
})

export default router