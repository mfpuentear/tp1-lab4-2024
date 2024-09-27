import { useEffect, useState } from "react";
import './App.css'

function App() {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [completa, setCompleta] = useState(false);

  const getTareas = async () => {
    const response = await fetch(`http://localhost:3000/tareas`);
    if (response.ok) {
      const { data } = await response.json();
      setTareas(data || []);
    }
  };

  useEffect(() => {
    getTareas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre === "") {
      alert("El campo debe tener una tarea.");
      return;
    }

    const response = await fetch(`http://localhost:3000/tareas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, completa }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setTareas([...tareas, data]);
      setNombre("");
      setCompleta(false); // Restablecer a false después de agregar
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  const cambiarEstado = async (tarea) => {
    const updatedTarea = { ...tarea, completa: !tarea.completa }; // Invertir el estado de completa
    const response = await fetch(
      `http://localhost:3000/tareas/${tarea.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTarea),
      }
    );

    if (response.ok) {
      const { data } = await response.json();
      setTareas(
        tareas.map((t) => (t.id === data.id ? data : t))
      );
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  const quitarTarea = async (id) => {
    const response = await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    }
  };

  return (
    <>
      <h1>Tareas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id} style={{ color: tarea.completa ? "green" : "red" }}>
            {tarea.nombre}
            <button onClick={() => cambiarEstado(tarea)}>
              {tarea.completa ? "Desmarcar" : "Marcar"}
            </button>
            <button onClick={() => quitarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
