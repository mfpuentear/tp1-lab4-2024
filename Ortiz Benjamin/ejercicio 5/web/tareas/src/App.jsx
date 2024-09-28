import { useState, useEffect } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [completado, setCompletado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [tareasId, setTareasId] = useState(null);

  const getTareas = async () => {
    const response = await fetch("http://localhost:3000/tareas");
    if (response.ok) {
      const data = await response.json();
      setTareas(data.tareas);
    }
  };

  useEffect(() => {
    getTareas();
  }, [tareas]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, completado }),
    });
    if (response.ok) {
      const data = await response.json();
      setTareas([...tareas, data]);
      setNombre("");
      setCompletado(false);
      setTareasId(null);
    }
  };

  const modificarTarea = (tarea) => {
    setTareasId(tarea.id);
    setNombre(tarea.nombre);
    setCompletado(tarea.completado);
  };

  const modificarTareaApi = async () => {
    const response = await fetch(`http://localhost:3000/tareas/${tareasId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, completado }),
    });
    if (response.ok) {
      const data = await response.json();
      setTareas(tareas.map((tar) => (tar.id === data.id ? data : tar)));
      setNombre("");
      setCompletado(false);
      setTareasId(null);
    }
  };

  const eliminar = async (id) => {
    if (confirm("¿Desea eliminar la tarea?")) {
      // Agregado acento en "desea"
      const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTareas(tareas.filter((al) => al.id !== id));
      }
    }
  };
  const total = tareas.length;
  const siCompletado = tareas.filter((t) => t.completado).length;
  const noCompletado = total - siCompletado;

  return (
    <>
      <h1>Tareas</h1>
      <div>
        <p>Total de Tareas: {total}</p>
        <p>Tareas Completadas: {siCompletado}</p>
        <p>Tareas No Completadas: {noCompletado}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Tareas</label>{" "}
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="completado">Completado</label>
          <input
            type="checkbox"
            id="completado"
            checked={completado}
            onChange={(e) => setCompletado(e.target.checked)}
          />
        </div>
        {tareasId === null && <button type="submit">Agregar</button>}
      </form>
      {tareasId !== null && (
        <>
          <button onClick={modificarTareaApi}>Editar</button>
          <button
            onClick={() => {
              setTareasId(null);
              setNombre("");
              setCompletado(false);
            }}
          >
            Cancelar
          </button>
        </>
      )}

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {`Tarea ${tarea.id}:`}
            <br />
            {`Nombre: ${tarea.nombre}`} <br />
            {`Completado: ${tarea.completado}`} <br />
            <br />
            <button onClick={() => eliminar(tarea.id)}>X</button>
            <button onClick={() => modificarTarea(tarea)}>e</button> <br />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
