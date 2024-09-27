import { useState, useEffect } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState("");

  // obtener datos
  const getTareas = async () => {
    const response = await fetch(`http://localhost:3005/tareas`);
    if (response.ok) {
      const { data } = await response.json();
      setTareas(data);
    }
  };

  useEffect(() => {
    getTareas();
  }, []);

  // nueva tarea
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3005/tareas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, completada: false }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setTareas([...tareas, data]);
      setNombre("");
    }
  };

  const modificarTareaApi = async (tarea, estado) => {
    const response = await fetch(`http://localhost:3005/tareas/${tarea.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...tarea, completada: estado }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setTareas(tareas.map((t) => (t.id === data.id ? data : t)));
    }
  };

  // eliminar tarea
  const eliminarTarea = async (id) => {
    if (confirm("¿Quiere borrar la tarea?")) {
      const response = await fetch(`http://localhost:3005/tareas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTareas(tareas.filter((tarea) => tarea.id !== id));
      }
    }
  };
  const totalizarTareas = tareas.length;
  const tareasCompletas = tareas.filter((tarea) => tarea.completada).length;
  const tareasIncompletas = totalizarTareas - tareasCompletas;
  return (
    <div>
      <h1>Tareas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre del tarea: </label>
          <input
            required
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <button type="submit">Agregar tarea</button>
      </form>

      <h3>Lista de tareas</h3>
      <h5>Total tareas:{totalizarTareas}</h5>
      <h5>Tareas completas : {tareasCompletas}</h5>
      <h5>Tareas incompletas : {tareasIncompletas} </h5>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {`ID = ${tarea.id}`} <br />
            {`Nombre = ${tarea.nombre}`} <br />
            {`Completada = ${tarea.completada ? "Sí" : "No"}`} <br />
            <br />
            {tarea.completada ? (
              <button onClick={() => modificarTareaApi(tarea, false)}>
                ❌
              </button>
            ) : (
              <button onClick={() => modificarTareaApi(tarea, true)}>✔️</button>
            )}
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
