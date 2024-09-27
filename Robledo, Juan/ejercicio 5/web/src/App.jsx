import { useEffect, useState } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaId, setTareaId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [isCompletada, setIsCompletada] = useState(false);

  const tareasCompletadas = tareas.filter((tarea) => tarea.completada);
  const tareasNoCompletadas = tareas.filter((tarea) => !tarea.completada);

  console.log(tareasCompletadas);
  console.log(tareasNoCompletadas);

  const URL_API = "http://localhost:3000/tareas/";

  const getTareas = async () => {
    const response = await fetch(URL_API);
    if (response.ok) {
      const { data } = await response.json();
      setTareas(data);
    }
  };

  useEffect(() => {
    getTareas();
  }, []);

  // ------------------------------------------------

  const modificarTarea = (tarea) => {
    setTareaId(tarea.id);
    setNombre(tarea.nombre);
    setIsCompletada(tarea.completada);
  };

  const modificarTareaApi = async () => {
    const response = await fetch(`${URL_API}${tareaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, completada: isCompletada }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setTareas(tareas.map((tarea) => (tarea.id == data.id ? data : tarea)));
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  const quitarTarea = async (id) => {
    if (confirm("¿Desea eliminar esta tarea?")) {
      const response = await fetch(`${URL_API}${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTareas(tareas.filter((tarea) => tarea.id !== id));
      }
    }
  };

  //--------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(URL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, completada: isCompletada }),
    });
    if (response.ok) {
      const { data } = await response.json();
      setTareas([...tareas, data]);
      setNombre("");
      setIsCompletada(false);
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <div>
          <label htmlFor="nombre" style={{ marginRight: 10 }}>
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Comprar pan"
            required
          />
        </div>
        <div>
          <label htmlFor="completada" style={{ marginRight: 10 }}>
            Completada
          </label>
          <input
            type="checkbox"
            id="completada"
            checked={isCompletada}
            onChange={(e) => setIsCompletada(e.target.checked)}
          />
        </div>
        {tareaId === 0 && (
          <button type="submit" style={styles.button}>
            Agregar
          </button>
        )}
        {tareaId !== 0 && (
          <div>
            <button
              onClick={modificarTareaApi}
              type="button"
              style={styles.button}
            >
              Modificar
            </button>
            <button
              onClick={() => {
                setTareaId(0);
                setNombre("");
                setIsCompletada(false);
              }}
              style={styles.button}
            >
              Cancelar
            </button>
          </div>
        )}
      </form>

      <h1 style={styles.title}>Alumnos</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Tarea</th>
            <th style={styles.th}>Completada</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea.id}>
              <td style={styles.td}>{tarea.nombre}</td>
              <td style={styles.td}>{tarea.completada ? "✅" : "❌"}</td>
              <td style={styles.td}>
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() => modificarTarea(tarea)}
                    disabled={tareaId !== 0}
                    style={styles.button}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => quitarTarea(tarea.id)}
                    disabled={tareaId !== 0}
                    style={styles.button}
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td style={styles.th} colSpan={3}>
              <b>Tareas:</b> {tareas.length}
            </td>
          </tr>
          <tr>
            <td style={styles.th} colSpan={3}>
              <b>Tareas completadas:</b> {tareasCompletadas.length}
            </td>
          </tr>
          <tr>
            <td style={styles.th} colSpan={3}>
              <b>Tareas no completadas:</b> {tareasNoCompletadas.length}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",
    padding: 20,
    maxWidth: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f2f2f2",
    border: "1px solid #ddd",
    padding: 12,
  },
  td: {
    border: "1px solid #ddd",
    padding: 12,
  },
  button: {
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: 5,
    padding: 5,
    marginLeft: 15,
    cursor: "pointer",
    verticalAlign: "top",
  },
};

export default App;
