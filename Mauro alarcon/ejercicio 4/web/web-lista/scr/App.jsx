import { useState, useEffect } from "react";

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [nota1, setNota1] = useState(0);
  const [nota2, setNota2] = useState(0);
  const [nota3, setNota3] = useState(0);
  const [alumnoId, setAlumnoId] = useState(0);
  const [errorNota, setErrorNota] = useState("");

  //-------------------------------------------------------------- Obtener alumnos
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

  //------------------------------------------------------------- validar las notas
  const validarNota = (nota) => {
    if (nota < 0 || nota > 10) {
      setErrorNota("solo notas entre 0 y 10");
      return false;
    }
    setErrorNota("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //--------------------------------------------------------- validar notas
    if (!validarNota(nota1) || !validarNota(nota2) || !validarNota(nota3)) {
      return;
    }

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
    if (!validarNota(nota1) || !validarNota(nota2) || !validarNota(nota3)) {
      return;
    }

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

  //----------------------------------------------- Eliminar
  const quitarAlumno = async (id) => {
    if (confirm("borrar el alumno?")) {
      const response = await fetch(`http://localhost:3004/alumnos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
      }
    }
  };

  // -----------------------------------Función para calcular el promedio
  const calcularPromedio = (nota1, nota2, nota3) => {
    return (nota1 + nota2 + nota3) / 3;
  };

  //----------------------------------- Función para determinar si está aprobado o promocionado
  const Estadoalum = (promedio) => {
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
      <h1>Listado de Alumnos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nota1">Nota N° 1:</label>
          <input
            type="number"
            id="nota1"
            value={nota1}
            onChange={(e) => setNota1(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota2">Nota N° 2:</label>
          <input
            type="number"
            id="nota2"
            value={nota2}
            onChange={(e) => setNota2(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota3">Nota N° 3:</label>
          <input
            type="number"
            id="nota3"
            value={nota3}
            onChange={(e) => setNota3(parseFloat(e.target.value))}
          />
        </div>
        {errorNota && <p style={{ color: "red" }}>{errorNota}</p>}
        {alumnoId === 0 && <button type="submit">AGREGAR</button>}
      </form>
      {alumnoId !== 0 && (
        <>
          <button onClick={modificarAlumnoApi}>EDITAR</button>
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

      <h3>Listado de alumnos</h3>
      <ul>
        {alumnos.map((alumno) => {
          const promedio = calcularPromedio(
            alumno.nota1,
            alumno.nota2,
            alumno.nota3
          );
          const estado = Estadoalum(promedio);

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
                EDITAR
              </button>
              <button
                onClick={() => quitarAlumno(alumno.id)}
                disabled={alumnoId !== 0}
              >
                ELIMINAR
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;