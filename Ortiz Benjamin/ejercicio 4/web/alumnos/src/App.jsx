import { useState, useEffect } from "react";

function App() {
  const [nombre, setNombre] = useState("");
  const [nota1, setNota1] = useState(0);
  const [nota2, setNota2] = useState(0);
  const [nota3, setNota3] = useState(0);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoId, setAlumnoId] = useState(null);

  const getAlumnos = async () => {
    const response = await fetch("http://localhost:3000/alumnos");
    if (response.ok) {
      const data = await response.json();
      setAlumnos(data.alumnos);
    }
  };

  useEffect(() => {
    getAlumnos();
  }, [alumnos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/alumnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      setAlumnos([...alumnos, data]);
      setNombre("");
      setNota1(0);
      setNota2(0);
      setNota3(0);
      setAlumnoId(null);
    }
  };

  const modificarAlumno = (alumno) => {
    setAlumnoId(alumno.id);
    setNombre(alumno.nombre);
    setNota1(alumno.nota1);
    setNota2(alumno.nota2);
    setNota3(alumno.nota3);
  };

  const modificarProductoApi = async () => {
    const response = await fetch(`http://localhost:3000/alumnos/${alumnoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, notas: [nota1, nota2, nota3] }),
    });
    if (response.ok) {
      const { data } = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      setAlumnos(alumnos.map((al) => (al.id === data.id ? data : al)));
      setNombre("");
      setNota1(0);
      setNota2(0);
      setNota3(0);
      setAlumnoId(null);
    }
  };

  const calcularPromedio = (alumno) => {
    const promedio = (alumno.nota1 + alumno.nota2 + alumno.nota3) / 3;
    let condicion = "Libre";
    if (promedio >= 8) {
      condicion = "Promocionado";
    } else if (promedio >= 6) {
      condicion = "Aprobado";
    }
    return { promedio, condicion };
  };

  const eliminar = async (id) => {
    if (confirm("desea eliminar el alumno?")) {
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setAlumnos(alumnos.filter((al) => al.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Alumnos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nota">Nota 1</label>
          <input
            type="number"
            id="nota"
            value={nota1}
            onChange={(e) => setNota1(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota">Nota 2</label>
          <input
            type="number"
            id="nota2"
            value={nota2}
            onChange={(e) => setNota2(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota">Nota 3</label>
          <input
            type="number"
            id="nota3"
            value={nota3}
            onChange={(e) => setNota3(parseFloat(e.target.value))}
          />
        </div>
        {alumnoId === null && <button type="submit">Agregar</button>}
      </form>
      {alumnoId !== null && (
        <>
          <button onClick={() => modificarProductoApi()}>Editar</button>
          <button
            onClick={() => {
              setAlumnoId(null);
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

      <ul>
        {alumnos.map((alumno) => {
          const { promedio, condicion } = calcularPromedio(alumno);
          return (
            <li key={alumno.id}>
              {`Alumno ${alumno.id}:`}
              <br />
              {`Nombre: ${alumno.nombre}`} <br />
              {`Nota 1: ${alumno.nota1}`} <br />
              {`Nota 2: ${alumno.nota2}`} <br />
              {`Nota 3: ${alumno.nota3}`} <br />
              {`Promedio: ${promedio.toFixed(2)}`} <br />
              {`condicion: ${condicion}`} <br />
              <br />
              <button onClick={() => eliminar(alumno.id)}>X</button>
              <button onClick={() => modificarAlumno(alumno)}>e</button>
              <br />
              <br />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
