import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [completado, setCompletado] = useState(false);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const obtenerTareas = async () => {
      const respuesta = await fetch("http://localhost:3000/api/tareas");
      if (respuesta.ok) {
        const listaTareas = await respuesta.json();
        setTareas(listaTareas);
      }
    };
    obtenerTareas();
  }, []);

  const limpiarFormulario = () => {
    setNombre("");
    setCompletado(false);
    setEditando(null);
  };

  const agregarTarea = async () => {
    const nuevaTarea = {
      nombre,
      completado,
    };

    const respuesta = await fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaTarea),
    });

    if (respuesta.ok) {
      const tareaGuardada = await respuesta.json();
      setTareas([...tareas, tareaGuardada]);
      limpiarFormulario();
    }
  };

  const actualizarTarea = async () => {
    const tareaActualizada = {
      nombre,
      completado,
    };

    const respuesta = await fetch(
      `http://localhost:3000/api/tareas/${editando.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tareaActualizada),
      }
    );

    if (respuesta.ok) {
      const index = tareas.findIndex((t) => t.id === editando.id);
      const tareasActualizadas = [...tareas];
      tareasActualizadas[index] = { ...tareasActualizadas[index], ...tareaActualizada };
      setTareas(tareasActualizadas);
      limpiarFormulario();
    }
  };

  const eliminarTarea = async (id) => {
    const respuesta = await fetch(`http://localhost:3000/api/tareas/${id}`, {
      method: "DELETE",
    });

    if (respuesta.ok) {
      const tareasRestantes = tareas.filter((tarea) => tarea.id !== id);
      setTareas(tareasRestantes);
      limpiarFormulario();
    }
  };

  const editarTarea = (tarea) => {
    setEditando(tarea);
    setNombre(tarea.nombre);
    setCompletado(tarea.completado);
  };

  return (
    <>
      <form>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Completado: </label>
          <input
            type="checkbox"
            checked={completado}
            onChange={(e) => setCompletado(e.target.checked)}
          />
        </div>
        {editando ? (
          <button type="button" onClick={actualizarTarea}>
            Guardar
          </button>
        ) : (
          <button type="button" onClick={agregarTarea}>
            Agregar
          </button>
        )}
        <button type="button" onClick={limpiarFormulario}>
          Cancelar
        </button>
      </form>

      <h3>Lista de Tareas</h3>
      <p>
        Tareas Completadas: {tareas.filter((t) => t.completado).length} <br />
        Tareas Incompletas: {tareas.filter((t) => !t.completado).length}
      </p>

      {tareas.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Completado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id}>
                <td>{tarea.id}</td>
                <td>{tarea.nombre}</td>
                <td>{tarea.completado ? "completada" : "Nocompletada"}</td>
                <td>
                  <button onClick={() => editarTarea(tarea)}>Editar</button>
                  <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
