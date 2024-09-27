import { useEffect, useState } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaId, setTareaId] = useState(0);
  const [nombreTarea, setNombreTarea] = useState("");
  const [completada, setCompletada] = useState(false);

  // Obtener la lista de tareas desde la API.
  const getTareas = async () => {
    const response = await fetch("http://localhost:3000/tareas");
    if (response.ok) {
      const { tareas } = await response.json();
      setTareas(tareas);
    }
  };

  useEffect(() => {
    getTareas();
  }, []);

  // Maneja el envío del formulario para agregar una tarea.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: nombreTarea, completada }),
    });

    if (response.ok) {
      const { tarea } = await response.json();
      setTareas([...tareas, tarea]);
      setNombreTarea("");
      setCompletada(false);
    }
  };

  // Llena los campos para modificar una tarea.
  const modificarTarea = (tarea) => {
    setTareaId(tarea.id);
    setNombreTarea(tarea.task);
    setCompletada(tarea.completada);
  };

  // Llama a la API para modificar una tarea existente.
  const modificarTareaApi = async () => {
    const response = await fetch(`http://localhost:3000/tareas/${tareaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: nombreTarea, completada }),
    });

    if (response.ok) {
      const { tarea } = await response.json();
      setTareas(tareas.map((t) => (t.id === tarea.id ? tarea : t)));
      setNombreTarea("");
      setCompletada(false);
      setTareaId(0);
    }
  };

  // Llama a la API para eliminar una tarea.
  const quitarTarea = async (id) => {
    if (confirm("¿Desea quitar la tarea?")) {
      const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTareas(tareas.filter((t) => t.id !== id));
      }
    }
  };

  // Contar el total de tareas completadas y no completadas.
  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter((t) => t.completada).length;
  const tareasNoCompletadas = totalTareas - tareasCompletadas;

  return (
    <>
      <h1>Tareas Ej 5 Ramirez</h1>
      <h2>Lista de Tareas</h2>
      <h3>Agregar una nueva Tarea</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Tarea: </label>
          <input
            type="text"
            id="nombre"
            value={nombreTarea}
            onChange={(e) => setNombreTarea(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="completada">Completada? : </label>
          <input
            type="checkbox"
            id="completada"
            checked={completada}
            onChange={(e) => setCompletada(e.target.checked)}
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
              setNombreTarea("");
              setCompletada(false);
            }}
          >
            Cancelar
          </button>
        </>
      )}

      <h3>Resumen</h3>
      <p>Total de tareas: {totalTareas}</p>
      <p>Tareas completadas ✅: {tareasCompletadas}</p>
      <p>Tareas no completadas ❌: {tareasNoCompletadas}</p>

      <h3>Lista de Tareas</h3>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {`${tarea.id}: ${tarea.task} - ${tarea.completada ? "Completada ✅" : "No Completada ❌"}`}
            <button onClick={() => modificarTarea(tarea)} disabled={tareaId !== 0}>
              Editar
            </button>
            <button onClick={() => quitarTarea(tarea.id)} disabled={tareaId !== 0}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
