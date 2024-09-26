import { useState, useEffect } from "react";

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [nota1, setNota1] = useState(0);
  const [nota2, setNota2] = useState(0);
  const [nota3, setNota3] = useState(0);
  const [alumnoId, setAlumnoId] = useState(0);

  const getAlumnos = async () => {
    const response = await fetch(`http://localhost:3004/alumnos`);
    if (response.ok) {
      const { data } = await response.json();
      setAlumnos(data);
    }
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3004/alumnos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setAlumnos([...alumnos, data]);
      setNombre("");
      setNota1(0);
      setNota2(0);
      setNota3(0);
    }
  };

  const modificarAlumno = (alumno) => {
    setAlumnoId(alumno.id);
    setNombre(alumno.nombre);
    setNota1(alumno.nota1);
    setNota2(alumno.nota2);
    setNota3(alumno.nota3);
  };

  const modificarAlumnoApi = async () => {
    const response = await fetch(`http://localhost:3004/alumnos/${alumnoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    });
    if (response.ok) {
      const { data } = await response.json();
      setAlumnos(alumnos.map((a) => (a.id === data.id ? data : a)));
      setNombre("");
      setNota1(0);
      setNota2(0);
      setNota3(0);
      setAlumnoId(0);
    }
  };

  const quitarAlumno = async (id) => {
    if (confirm("¿Quiere borrar el alumno?")) {
      const response = await fetch(`http://localhost:3004/alumnos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
      }
    }
  };

  const calcularPromedio = (nota1, nota2, nota3) => {
    return (nota1 + nota2 + nota3) / 3;
  };

  const obtenerEstado = (promedio) => {
    if (promedio >= 8) {
      return "Promocionado";
    } else if (promedio >= 6) {
      return "Aprobado";
    } else {
      return "Desaprobado";
    }
  };

  return (
    <div>
      <h1>Lista de Alumnos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre del alumno: </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nota1">Nota 1:</label>
          <input
            type="number"
            id="nota1"
            value={nota1}
            onChange={(e) => setNota1(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota2">Nota 2:</label>
          <input
            type="number"
            id="nota2"
            value={nota2}
            onChange={(e) => setNota2(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota3">Nota 3:</label>
          <input
            type="number"
            id="nota3"
            value={nota3}
            onChange={(e) => setNota3(parseFloat(e.target.value))}
          />
        </div>
        {alumnoId === 0 && <button type="submit">Agregar Alumno</button>}
      </form>
      {alumnoId !== 0 && (
        <>
          <button onClick={modificarAlumnoApi}>Modificar</button>
          <button
            onClick={() => {
              setAlumnoId(0);
              setNombre("");
              setNota1(0);
              setNota2(0);
              setNota3(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}

      <h3>Lista de alumnos</h3>
      <ul>
        {alumnos.map((alumno) => {
          const promedio = calcularPromedio(
            alumno.nota1,
            alumno.nota2,
            alumno.nota3
          );
          const estado = obtenerEstado(promedio);

          return (
            <li key={alumno.id}>
              {`Alumno ${alumno.id}:`} <br />
              {`Nombre: ${alumno.nombre}`} <br />
              {`Nota 1: ${alumno.nota1}`} <br />
              {`Nota 2: ${alumno.nota2}`} <br />
              {`Nota 3: ${alumno.nota3}`} <br />
              {`Promedio: ${promedio.toFixed(2)}`} <br />
              {`Estado: ${estado}`} <br />
              <br />
              <button
                onClick={() => modificarAlumno(alumno)}
                disabled={alumnoId !== 0}
              >
                Editar
              </button>
              <button
                onClick={() => quitarAlumno(alumno.id)}
                disabled={alumnoId !== 0}
              >
                Eliminar
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
