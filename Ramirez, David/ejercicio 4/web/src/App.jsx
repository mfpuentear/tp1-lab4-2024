import { useEffect, useState } from "react";

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoId, setAlumnoId] = useState(0);
  const [nombreAlumno, setNombreAlumno] = useState("");
  const [nota1, setNota1] = useState(0);
  const [nota2, setNota2] = useState(0);
  const [nota3, setNota3] = useState(0);

  // Obtener la lista de alumnos desde la API.
  const getAlumnos = async () => {
    const response = await fetch("http://localhost:3000/alumnos");
    if (response.ok) {
      const { alumnos } = await response.json();
      setAlumnos(alumnos);
    }
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  // Calcula el promedio de notas.
  const calcularPromedio = (nota1, nota2, nota3) => {
    return (nota1 + nota2 + nota3) / 3;
  };

  // Determina si un alumno está aprobado o promocionado.
  const estadoAlumno = (promedio) => {
    if (promedio >= 8) return "Promocionado";
    if (promedio >= 6) return "Aprobado";
    return "Desaprobado";
  };

  // Maneja el envío del formulario para agregar un alumno.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/alumnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombreAlumno, nota1, nota2, nota3 }),
    });

    if (response.ok) {
      const { alum } = await response.json();
      setAlumnos([...alumnos, alum]);
      setNombreAlumno("");
      setNota1(0);
      setNota2(0);
      setNota3(0);
    }
  };

  // Llena los campos para modificar un alumno.
  const modificarAlumno = (alumno) => {
    setAlumnoId(alumno.id);
    setNombreAlumno(alumno.nombre);
    setNota1(alumno.nota1);
    setNota2(alumno.nota2);
    setNota3(alumno.nota3);
  };

  // Llama a la API para modificar un alumno existente.
  const modificarAlumnoApi = async () => {
    const response = await fetch(`http://localhost:3000/alumnos/${alumnoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombreAlumno, nota1, nota2, nota3 }),
    });
    if (response.ok) {
      const { alum } = await response.json();
      setAlumnos(alumnos.map((a) => (a.id === alum.id ? alum : a)));
      setNombreAlumno("");
      setNota1(0);
      setNota2(0);
      setNota3(0);
    }
  };

  // Llama a la API para eliminar un alumno.
  const quitarAlumno = async (id) => {
    if (confirm("¿Desea quitar al alumno?")) {
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAlumnos(alumnos.filter((a) => a.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Alumnos Ejercicio 4 Ramirez </h1>
      <br />
      <h2>Listado de Alumnos</h2>
      <h3>Agregar Alumno</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre y Apellido: </label>
          <input
            type="text"
            id="nombre"
            value={nombreAlumno}
            onChange={(e) => setNombreAlumno(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nota1">1er Trimestre: </label>
          <input
            type="number"
            id="nota1"
            value={nota1}
            onChange={(e) => setNota1(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota2">2do Trimestre: </label>
          <input
            type="number"
            id="nota2"
            value={nota2}
            onChange={(e) => setNota2(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota3">3er Trimestre: </label>
          <input
            type="number"
            id="nota3"
            value={nota3}
            onChange={(e) => setNota3(parseFloat(e.target.value))}
          />
        </div>
        {alumnoId === 0 && <button type="submit">Cargar Alumno</button>}
      </form>
      {alumnoId !== 0 && (
        <>
          <button onClick={() => modificarAlumnoApi()}>Modificar</button>
          <button
            onClick={() => {
              setAlumnoId(0);
              setNombreAlumno("");
              setNota1(0);
              setNota2(0);
              setNota3(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}

      <h3>Listado de Alumnos</h3>
      <ul>
        {alumnos.map((alumno) => {
          const promedio = calcularPromedio(alumno.nota1, alumno.nota2, alumno.nota3);
          return (
            <li key={alumno.id}>
              {`${alumno.id}: ${alumno.nombre} - Notas: ${alumno.nota1}, ${alumno.nota2}, ${alumno.nota3} 
              - Promedio: ${promedio.toFixed(2)} - Estado: ${estadoAlumno(promedio)}`}
              <button onClick={() => modificarAlumno(alumno)} disabled={alumnoId !== 0}>
                Editar
              </button>
              <button onClick={() => quitarAlumno(alumno.id)} disabled={alumnoId !== 0}>
                Eliminar
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
