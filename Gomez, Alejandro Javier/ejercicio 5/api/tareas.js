import express from "express";

export const tareas = express.Router();

let listaTareas = [];
let id = 0;

tareas.get("/listaTareas", (req, res) => {
  res.send(listaTareas);
});

tareas.post("/listaTareas", (req, res) => {
  const { descripcion } = req.body;

  if (
    descripcion.trim().length === 0 ||
    typeof descripcion != "string"
  ) {
    res.status(400).send("Verifique los datos enviados");
  } else {
    const tareaDuplicada = listaTareas.find(
      (item) => item.descripcion === descripcion
    );

    if (tareaDuplicada) {
      res.status(400).send("La tarea que está intentando agregar ya existe");
    } else {
      const tarea = {
        id: id++,
        descripcion: descripcion,
        completada: false
      };

      listaTareas.push(tarea);

      res.status(201).send({ tarea });
    }
  }
});

tareas.delete("/listaTareas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listaTareas = listaTareas.filter((item) => item.id !== id);
  res.status(200).send({ id });
});

tareas.put("/listaTareas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { descripcion, completada } = req.body;

  const tarea = listaTareas.find((item) => item.id === id);

  if (!tarea) {
    return res.status(400).send("Tarea no encontrada");
  }

  if (descripcion && (descripcion.trim().length === 0 || typeof descripcion !== "string")) {
    return res.status(400).send("Datos incorrectos o no encontrados");
  }

  if (descripcion) {
    const tareaDuplicada = listaTareas.find((item) => item.descripcion === descripcion && item.id !== id);

    if (tareaDuplicada) {
      return res.status(400).send("La tarea que está modificando ya existe en la lista");
    } else {
      tarea.descripcion = descripcion;
    }
  }

  if (typeof completada === "boolean") {
    tarea.completada = completada;
  }

  res.status(200).send({ tarea });
});
