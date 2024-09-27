import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [descripcion, setDescripcion] = useState("");

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  let tareasCompletadas = tareas.filter((tarea) => tarea.completada).length;

  const fetchTareas = async () => {
    const response = await fetch("http://localhost:3000/tareas/listaTareas");
    if (response.ok) {
      const data = await response.json();
      setTareas(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/tareas/listaTareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion }),
    });

    if (response.ok) {
      const data = await response.json();
      setTareas([...tareas, data.tarea]);
      setDescripcion("");
    }
  };

  const quitarTarea = async (id) => {
    if (confirm("¿Desea quitar esta tarea?")) {
      const response = await fetch(
        `http://localhost:3000/tareas/listaTareas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setTareas(tareas.filter((tarea) => tarea.id !== id));
      }
    }
  };

  const marcarTarea = async (id, completada) => {
    const response = await fetch(
      `http://localhost:3000/tareas/listaTareas/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completada: !completada }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTareas(
        tareas.map((tarea) =>
          tarea.id === id
            ? { ...tarea, completada: data.tarea.completada }
            : tarea
        )
      );
    }
  };

  const activarModoEdicion = (id, descripcion) => {
    setModoEdicion(true);
    setIdEditar(id);
    setDescripcion(descripcion);
  };

  const modificarTarea = async (id) => {
    const response = await fetch(
      `http://localhost:3000/tareas/listaTareas/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data.tarea) {
        setTareas((prevTareas) =>
          prevTareas.map((tarea) =>
            tarea.id === id ? data.tarea : tarea
          )
        );
      }

      setDescripcion("");
      setModoEdicion(false);
      setIdEditar(null);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <>
      <div className="App-container">
        <form onSubmit={handleSubmit} className="card">
          <span>Agregar tarea:</span>
          <input
            required
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          />

          <div className="botones">
            <button type="submit" disabled={modoEdicion}>
              Enviar
            </button>
            <button
              type="button"
              onClick={() => modificarTarea(idEditar)}
              disabled={!modoEdicion}
            >
              Modificar
            </button>
          </div>
        </form>

        <div className="listas-container">
          <div className="lista card">
            <span>Lista de tareas:</span>
            <div className="tareas-info">
              <p>Cantidad de tareas: {tareas.length}</p>
              <p style={{ color: "green" }}>
                Tareas completadas: {tareasCompletadas}
              </p>
              <p style={{ color: "red" }}>
                Tareas sin completadar: {tareas.length - tareasCompletadas}
              </p>
            </div>

            <ul>
              {tareas.map((tarea) => (
                <li key={tarea.id}>
                  <span>{tarea.descripcion}</span>
                  <input
                    type="checkbox"
                    checked={tarea.completada}
                    onChange={() => marcarTarea(tarea.id, tarea.completada)}
                    id="checkbox"
                  />
                  <button
                    onClick={() =>
                      activarModoEdicion(tarea.id, tarea.descripcion)
                    }
                  >
                    ✏️
                  </button>
                  <button onClick={() => quitarTarea(tarea.id)}>❌</button>
                  <br />
                  <br />
                  <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
