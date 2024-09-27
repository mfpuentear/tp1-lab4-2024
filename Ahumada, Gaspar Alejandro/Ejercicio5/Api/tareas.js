import express from "express";

export const tareasRouter = express.Router();

let tareas = [
   { id: 1, nombre: "codear", completa: true},
   { id: 2, nombre: "commiteear", completa: true },
];
let tareasMaxId = tareas.length;

// GET /tareas
tareasRouter.get("/", (req, res) => {
  res.send({ data: tareas });
});
// POST /tareas
tareasRouter.post("/", (req, res) => {
    // Obtengo nombre y completa
    const { nombre, completa } = req.body;
  
    // Verifico si ya existe un tarea con el mismo nombre
    const nombreRepetido = tareas.some((tarea) => tarea.nombre === nombre);
  
    if (nombreRepetido) {
        return res.status(400).send({ error: "tarea repetida" });
    }

    // Creo objeto tarea y lo agrego al arreglo y al cliente
    const tarea = {
      id: ++tareasMaxId,
      nombre,
      completa,
      fecha: new Date(),
    };
  
    tareas.push(tarea);
    res.status(201).send({ data: tarea });
  });

  

// PUT /tareas/:id
tareasRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, completa } = req.body;
    // Crear el tarea modificado
    const tareaModificado = { id, nombre, completa, fecha: new Date() };

    // Actualizar la lista de tareas
    tareas = tareas.map((tarea) => (tarea.id === id ? tareaModificado : tarea));

    // Enviar la respuesta con el tarea actualizado
    res.status(200).send({ data: tareaModificado });
});


// DELETE /tareas/:id
tareasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter((tarea) => tarea.id !== id);
  res.status(200).send({ id });
});