import { useEffect, useState } from "react";

const calcPromedio = (notas) => {
  const suma = notas.reduce((ac, nota) => ac + nota, 0);
  const promedio = suma / notas.length;
  return promedio.toFixed(2);
};

const calcEstado = (promedio) => {
  if (promedio >= 8) {
    return "Promocionado";
  } else if (promedio >= 6) {
    return "Regular";
  } else {
    return "Desaprobado";
  }
};

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoId, setAlumnoId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [notas, setNotas] = useState([0, 0, 0]);

  const URL = "http://localhost:3000/alumnos/";

  const getAlumnos = async () => {
    const response = await fetch(URL);
    if (response.ok) {
      const { data } = await response.json();
      setAlumnos(data);
    }
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  // ------------------------------------------------

  const modificarAlumno = (alumno) => {
    setAlumnoId(alumno.id);
    setNombre(alumno.nombre);
    setNotas(alumno.notas);
  };

  const modificarAlumnoApi = async () => {
    const response = await fetch(`${URL}${alumnoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, notas }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setAlumnos(
        alumnos.map((alumno) => (alumno.id == data.id ? data : alumno))
      );
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  const quitarAlumno = async (id) => {
    if (confirm("¿Desea quitar este alumno?")) {
      const response = await fetch(`${URL}${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
      }
    }
  };

  //--------------------------------------------

  const handleNotaChange = (e, index) => {
    const notasNuevas = [...notas];
    notasNuevas[index] = parseFloat(e.target.value);
    setNotas(notasNuevas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, notas }),
    });
    if (response.ok) {
      const { data } = await response.json();
      setAlumnos([...alumnos, data]);
      setNombre("");
      setNotas([0, 0, 0]);
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
            placeholder="Manuel"
            required
          />
        </div>
        {/* Genera inputs a partir del arreglo de notas 😲 */}
        {notas.map((nota, index) => (
          <div key={index}>
            <label htmlFor={`nota${index + 1}`} style={{ margin: "0 10px" }}>
              Nota {index + 1}
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step={0.1}
              id={`nota${index + 1}`}
              value={nota}
              onChange={(e) => {
                handleNotaChange(e, index);
              }}
              required
            />
          </div>
        ))}

        {alumnoId === 0 && (
          <button type="submit" style={styles.button}>
            Agregar
          </button>
        )}
        {alumnoId !== 0 && (
          <div>
            <button
              onClick={modificarAlumnoApi}
              type="button"
              style={styles.button}
            >
              Modificar
            </button>
            <button
              onClick={() => {
                setAlumnoId(0);
                setNombre("");
                setNotas([0, 0, 0]);
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
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Notas</th>
            <th style={styles.th}>Promedio</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumnos) => (
            <tr key={alumnos.id}>
              <td style={styles.td}>{alumnos.nombre}</td>
              <td style={styles.td}>{alumnos.notas.join(", ")}</td>
              <td style={styles.td}>{calcPromedio(alumnos.notas)}</td>
              <td style={styles.td}>
                {calcEstado(calcPromedio(alumnos.notas))}
              </td>
              <td style={styles.td}>
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() => modificarAlumno(alumnos)}
                    disabled={alumnoId !== 0}
                    style={styles.button}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => quitarAlumno(alumnos.id)}
                    disabled={alumnoId !== 0}
                    style={styles.button}
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
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
