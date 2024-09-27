import express from "express"

export const divisionesRouter = express.Router()

let divisiones = []

let divisionesId = 0

divisionesRouter.get('/', (req, res) => {
    res.send({divisiones})
  })
  
divisionesRouter.get('/:id', (req, res) => {
      const id = req.params.id
      const division = divisiones.find((division)=> division.id==id)
      res.send({division})
    })
  
divisionesRouter.post("/",(req,res)=>{
      const {a,b}= req.body

      if (b==0){
        res.status(404).send({mensaje: "Division por cero"})
        return
      }

      const operacion = {
        id: ++divisionesId,
         a,b ,
         resultado: a/b}
  
      divisiones.push(operacion)
      res.status(201).send(operacion)
  })
  
divisionesRouter.put("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {a,b}=req.body

    if (b==0){
        res.status(404).send({mensaje : "Division por cero"})
        return
    }

    const divisionModificada = {id,a,b, resultado: a/b}
    divisiones = divisiones.map((division)=>(division.id===id ? divisionModificada : division))
    res.status(200).send({divisionModificada})
})