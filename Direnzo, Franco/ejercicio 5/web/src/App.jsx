import { useEffect, useState } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(false);
  const [tareaId, setTareaId] = useState(0);

  const getTareas = async () => {
    const response = await fetch("http://localhost:3000/tareas");
    if (response.ok) {
      const { tareas } = await response.json();
      setTareas(tareas);
      console.log(tareas)
    }
  };

  useEffect(() => {
    getTareas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      const { tarea } = await response.json();
      setTareas([...tareas, tarea]);
      setA(0);
      setB(false);
    }
  };

  const modificarTarea = (tarea) => {
    setTareaId(tarea.id);
    setA(tarea.a);
    setB(tarea.b);
  };

  const modificarTareaApi = async () => {
    const response = await fetch(`http://localhost:3000/tareas/${tareaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      const { tarea } = await response.json();
      setTareas(tareas.map((a) => (a.id == tarea.id ? tarea : a)));

      setA(0);
      setB(false);
      setTareaId(0);
    }
  };

  const quitarTarea = async (id) => {
    if (confirm("¿Desea quitar la tarea?")) {
      console.log(id);
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
          <label htmlFor="a">Descripción</label>
          <input
            type="text"
            id="a"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="b">Completada</label>
          <input
            type="checkbox"
            id="b"
            checked={b}
            onChange={() => setB(!b)}
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
              setA(0);
              setB(false);
            }}
          >
            Cancelar
          </button><br></br>
        </>
      )}<br></br>
        {`Tareas: ${tareas.length}`}
        <br></br>
        {`Completadas: ${tareas.filter((e)=>e.b==true).length}`}
        <br></br>
        {`Pendientes: ${tareas.filter((e)=>e.b==false).length}`}
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {`${tarea.id}: ${tarea.a} - ${tarea.b?'Completada':'Pendiente'}  `}
            <button onClick={() => modificarTarea(tarea)} disabled={tareaId !== 0}>
              E
            </button>
            <button onClick={() => quitarTarea(tarea.id)} disabled={tareaId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
