import { useEffect, useState } from "react";

function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tareaCompletada, setTareaCompletada] = useState(false);
  const [tareaId, setTareaId] = useState(0);

  const getTareas = async () => {
    const response = await fetch("http://localhost:3000/tareas");
    if (response.ok) {
      const { tareas } = await response.json();
      setTareas(tareas);
    }
  };

  const obtenerCantidadDeTareas = () => {
    return tareas.length
  }
  const obtenerTareasCompletadas = () => {
    let tareasCompletadas = tareas.filter((tarea)=> tarea.tareaCompletada)
    return tareasCompletadas.length
  }
  const obtenerTareasNoCompletadas = () => {
    let tareasNoCompletadas = tareas.filter((tarea)=> !tarea.tareaCompletada)
    return tareasNoCompletadas.length
  }
 
  useEffect(() => {
    getTareas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, tareaCompletada }),
    });
    if (response.ok) {
      
      const { tarea } = await response.json();
      setTareas([...tareas, tarea]);
      setNombre("");
      setTareaCompletada(0);
    }
  };

  const modificarTarea = (tarea) => {
    setTareaId(tarea.id);
    setNombre(tarea.nombre);
    setTareaCompletada(tarea.tareaCompletada);
  };

  const modificarTareaApi = async () => {
    const response = await fetch(`http://localhost:3000/tareas/${tareaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, tareaCompletada }),
    });
    if (response.ok) {

      const { tarea } = await response.json();
      setTareas(tareas.map((t) => (t.id == tarea.id ? tarea : t)));

      setNombre("");
      setTareaCompletada(false);
      setTareaId(0);
    }
  };

  const quitarTarea = async (id) => {
    if (confirm("¿Desea quitar tarea?")) {
      const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {

        setTareas(tareas.filter((tarea) => tarea.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Tareas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre((e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="tareaCompletada">¿Tarea completada?: </label>
          <input
            type="checkbox"
            id="tareaCompletada"
            value={tareaCompletada}
            onChange={(e) => setTareaCompletada(e.target.checked)}
          />
        </div>
        {tareaId === 0 && <button type="submit">Agregar</button>}
      </form>
      {tareaId !== 0 && (
        <>
          <button onClick={() => modificarTareaApi()}>Modificar</button>
          <button
            onClick={() => {
              setTareaId(0);
              setNombre("");
              setTareaCompletada(false);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {`${tarea.id}: Nombre:${tarea.nombre} - Tarea Completada:${tarea.tareaCompletada ? "Si" : "No"}`}
            <button onClick={() => modificarTarea(tarea)} disabled={tareaId !== 0}>
              E
            </button>
            <button onClick={() => quitarTarea(tarea.id)} disabled={tareaId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
      <p>Cantidad de tareas: {obtenerCantidadDeTareas()} - Cantidad de tareas completadas: {obtenerTareasCompletadas()} - Cantidad de tareas no completadas: {obtenerTareasNoCompletadas()}</p>
    </>
  );
}

export default Tareas;