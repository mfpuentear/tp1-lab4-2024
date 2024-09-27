import express from "express";
import sumasRouter from "./sumas.js";
import divisionesRouter from "./divisiones.js";
const operacionesRouter = express.Router();
operacionesRouter.use(express.json());
let operaciones = [{divisiones: {divisionesRouter}}, {sumas : {sumasRouter}}] 

operacionesRouter.get("/", (req, res) => {
    res.send({ sumas });
  });
operacionesRouter.use("/sumas", sumasRouter);
operacionesRouter.use("/divisiones", divisionesRouter);

export default operacionesRouter;