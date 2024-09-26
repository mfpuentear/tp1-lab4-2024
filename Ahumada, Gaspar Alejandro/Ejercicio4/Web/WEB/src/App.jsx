import { useEffect, useState } from "react";

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumno, setAlumno] = useState("");
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [nota3, setNota3] = useState("");
  const [alumnoId, setAlumnoId] = useState(0);

  const getAlumnos = async () => {
      const response = await fetch(`http://localhost:3000/alumnos`);
      if (response.ok) {
        const { data } = await response.json();
        setAlumnos(data || []);
      }else{
        const {error} = await response.json();
        alert(error)
      }
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!alumno || !nota1 || !nota2 || !nota3) {
      alert("Todos los campos deben tener un valor.");
      return;
    }

    const response = await fetch(`http://localhost:3000/alumnos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        alumno: alumno,
        notas: {
          nota1: parseFloat(nota1),
          nota2: parseFloat(nota2),
          nota3: parseFloat(nota3),
        },
      }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setAlumnos([...alumnos, data]);
      setAlumno("");
      setNota1("");
      setNota2("");
      setNota3("");
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  const modificarAlumno = (alumno) => {
    setAlumnoId(alumno.id);
    setAlumno(alumno.alumno);
    setNota1(alumno.notas.nota1);
    setNota2(alumno.notas.nota2);
    setNota3(alumno.notas.nota3);
  };

  const modificarAlumnoApi = async () => {
    if (!alumno || !nota1 || !nota2 || !nota3) {
      alert("Todos los campos deben tener un valor.");
      return;
    }

    const response = await fetch(`http://localhost:3000/alumnos/${alumnoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        alumno: alumno,
        notas: {
          nota1: parseFloat(nota1),
          nota2: parseFloat(nota2),
          nota3: parseFloat(nota3),
        },
      }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setAlumnos(alumnos.map((o) => (o.id === data.id ? data : o)));
      setAlumno("");
      setNota1("");
      setNota2("");
      setNota3("");
      setAlumnoId(0);
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  const quitarAlumno = async (id) => {
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
      }
  };

  return (
    <>
      <h1>Alumnos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="alumno">Alumno</label>
          <input
            type="text"
            id="alumno"
            value={alumno}
            onChange={(e) => setAlumno(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nota1">1° nota</label>
          <input
            type="number"
            id="nota1"
            value={nota1}
            onChange={(e) => setNota1(e.target.value)}
          />
          <br />
          <label htmlFor="nota2">2° nota</label>
          <input
            type="number"
            id="nota2"
            value={nota2}
            onChange={(e) => setNota2(e.target.value)}
          />
          <br />
          <label htmlFor="nota3">3° nota</label>
          <input
            type="number"
            id="nota3"
            value={nota3}
            onChange={(e) => setNota3(e.target.value)}
          />
        </div>
        {alumnoId === 0 && <button type="submit">Agregar</button>}
      </form>

      {alumnoId !== 0 && (
        <>
          <button onClick={modificarAlumnoApi}>Modificar</button>
          <button
            onClick={() => {
              setAlumnoId(0);
              setAlumno("");
              setNota1("");
              setNota2("");
              setNota3("");
            }}
          >
            Cancelar
          </button>
        </>
      )}

      <ul>
        {alumnos.map((alumno) => {
          const totalNotasAlumno = parseFloat(alumno.notas.nota1) + parseFloat(alumno.notas.nota2) + parseFloat(alumno.notas.nota3);
          const promedio = totalNotasAlumno / 3; // Calculamos el promedio del alumno

          return (
            <li key={alumno.id}>
              {`${alumno.id}: Alumno: ${alumno.alumno} 
              1° nota: ${alumno.notas.nota1} 
              2° nota: ${alumno.notas.nota2} 
              3° nota: ${alumno.notas.nota3}
              Promedio: ${promedio.toFixed(2)} 
              ${promedio >= 6 && promedio < 8 ? "Regular" : promedio >= 8 ? "Promocionado" : "Reprobado"}`}
              <button onClick={() => modificarAlumno(alumno)} disabled={alumnoId !== 0}>E</button>
              <button onClick={() => quitarAlumno(alumno.id)} disabled={alumnoId !== 0}>X</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
