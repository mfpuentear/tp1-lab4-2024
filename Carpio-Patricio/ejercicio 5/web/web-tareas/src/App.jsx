import { useState, useEffect } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [editandoTarea, setEditandoTarea] = useState(null); // Guardará la tarea que se está editando

  // Obtener las tareas del backend
  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const respuesta = await fetch(`http://localhost:3005/tareas`);
        const datos = await respuesta.json();
        setTareas(datos); // Suponiendo que la API retorna todas las tareas
      } catch (error) {
        console.error("Error obteniendo tareas:", error);
      }
    };

    obtenerTareas();
  }, []);

  // Agregar una nueva tarea
  const agregarTarea = async (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      alert("Por favor, ingresa una tarea.");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3005/tareas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion: tarea, completada: false }),
      });

      if (respuesta.ok) {
        const nuevaTarea = await respuesta.json();
        setTareas([...tareas, nuevaTarea]); // Actualizar lista de tareas
        setTarea(""); // Limpiar campo de texto
      }
    } catch (error) {
      console.error("Error agregando tarea:", error);
    }
  };

  // Marcar tarea como completada
  const completarTarea = async (id) => {
    try {
      const respuesta = await fetch(
        `http://localhost:3005/tareas/${id}/completar`,
        {
          method: "PUT",
        }
      );

      if (respuesta.ok) {
        const tareaActualizada = await respuesta.json();
        setTareas(
          tareas.map((tarea) => (tarea.id === id ? tareaActualizada : tarea))
        );
      }
    } catch (error) {
      console.error("Error completando tarea:", error);
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta tarea?")) return;

    try {
      const respuesta = await fetch(`http://localhost:3005/tareas/${id}`, {
        method: "DELETE",
      });

      if (respuesta.ok) {
        setTareas(tareas.filter((tarea) => tarea.id !== id));
      }
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  // Editar tarea
  const editarTarea = (tarea) => {
    setEditandoTarea(tarea);
    setTarea(tarea.descripcion);
  };

  // Guardar cambios en la tarea editada
  const guardarTareaEditada = async (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      alert("Por favor, ingresa una descripción.");
      return;
    }

    try {
      const respuesta = await fetch(
        `http://localhost:3005/tareas/${editandoTarea.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ descripcion: tarea }),
        }
      );

      if (respuesta.ok) {
        const tareaActualizada = await respuesta.json();
        setTareas(
          tareas.map((t) =>
            t.id === tareaActualizada.id ? tareaActualizada : t
          )
        );
        setEditandoTarea(null);
        setTarea(""); // Limpiar campo de texto
      }
    } catch (error) {
      console.error("Error guardando tarea editada:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>

      <form onSubmit={editandoTarea ? guardarTareaEditada : agregarTarea}>
        <input
          type="text"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          placeholder="Escribe una tarea"
        />
        <button type="submit">
          {editandoTarea ? "Guardar Cambios" : "Agregar Tarea"}
        </button>
        {editandoTarea && (
          <button
            type="button"
            onClick={() => {
              setEditandoTarea(null);
              setTarea("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h3>Tareas</h3>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tarea.descripcion} {tarea.completada ? "(Completada)" : ""}
            <button onClick={() => completarTarea(tarea.id)}>Completar</button>
            <button onClick={() => editarTarea(tarea)}>Editar</button>
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
