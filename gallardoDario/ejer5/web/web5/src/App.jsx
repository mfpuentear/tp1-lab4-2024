import { useState, useEffect } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [tar, setTar] = useState("");
  const [est, setEst] = useState("");
  const [tareaId, setTareaId] = useState(0);

  const getTareas = async () => {
    const response = await fetch("http://localhost:3000/tareas/");
    if (response.ok) {
      const { tareas } = await response.json();
      setTareas(tareas);
    }
  };

  useEffect(() => {
    getTareas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (est !== "completo" && est !== "por completar") {
      alert("El estado debe ser 'completo' o 'por completar'.");
      return;
    }

    const response = await fetch("http://localhost:3000/tareas/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tar, est }),
    });

    if (response.status === 201) {
      const { tarea } = await response.json();
      setTareas([...tareas, tarea]);
      setTar("");
      setEst("");
    } else if (response.status === 400) {
      const errorData = await response.json();
      alert(`Error: ${errorData.mensaje}`);
    }
  };

  const modificarTarea = (tarea) => {
    setTareaId(tarea.id);
    setTar(tarea.tar);
    setEst(tarea.est);
  };

  const modificarTareaApi = async () => {
    if (est !== "completo" && est !== "falta") {
      alert("El estado debe ser 'completo' o 'por completar'.");
      return;
    }

    const response = await fetch(`http://localhost:3000/tareas/${tareaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tar, est }),
    });

    if (response.ok) {
      const { tarea } = await response.json();

      setTareas(tareas.map((s) => (s.id === tarea.id ? tarea : s)));
      setTar("");
      setEst("");
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

  const contarTareas = () => {
    const total = tareas.length;
    const completas = tareas.filter((tarea) => tarea.est === "completo").length;
    const faltantes = tareas.filter(
      (tarea) => tarea.est === "por completar"
    ).length;
    return { total, completas, faltantes };
  };

  const { total, completas, faltantes } = contarTareas();

  return (
    <>
      <h1>Tareas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tar">Tarea</label>
          <input
            type="text"
            id="tar"
            value={tar}
            onChange={(e) => setTar(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="est">Estado</label>
          <input
            type="text"
            id="est"
            value={est}
            onChange={(e) => setEst(e.target.value)}
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
              setTar("");
              setEst("");
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {`${tarea.id}: ${tarea.tar} , ${tarea.est}  `}
            <button
              onClick={() => modificarTarea(tarea)}
              disabled={tareaId !== 0}
            >
              Modificar
            </button>
            <button
              onClick={() => quitarTarea(tarea.id)}
              disabled={tareaId !== 0}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div>
        <p>Total de tareas: {total}</p>
        <p>Tareas completas: {completas}</p>
        <p>Tareas faltantes: {faltantes}</p>
      </div>
    </>
  );
}

export default App;
