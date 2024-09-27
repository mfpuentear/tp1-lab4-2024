import { useEffect, useState } from "react";

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const [alumnoId, setAlumnoId] = useState(0);

  const getAlumnos = async () => {
    const response = await fetch("http://localhost:3000/alumnos");
    if (response.ok) {
      const { alumnos } = await response.json();
      setAlumnos(alumnos);
      console.log(alumnos)
    }
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/alumnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b,c,d }),
    });
    if (response.ok) {
      const { alumno } = await response.json();
      setAlumnos([...alumnos, alumno]);
      setA(0);
      setB(0);
      setC(0);
      setD(0);
    }
  };

  const modificarAlumno = (alumno) => {
    setAlumnoId(alumno.id);
    setA(alumno.a);
    setB(alumno.b);
    setC(alumno.c);
    setD(alumno.d);
  };

  const modificarAlumnoApi = async () => {
    const response = await fetch(`http://localhost:3000/alumnos/${alumnoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b, c, d }),
    });
    if (response.ok) {
      const { alumno } = await response.json();
      setAlumnos(alumnos.map((a) => (a.id == alumno.id ? alumno : a)));

      setA(0);
      setB(0);
      setC(0);
      setD(0);
      setAlumnoId(0);
    }
  };

  const quitarAlumno = async (id) => {
    if (confirm("¿Desea quitar el alumno?")) {
      console.log(id);
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Alumnos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">nombre</label>
          <input
            type="text"
            id="a"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="b">Nota1</label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="c">Nota2</label>
          <input
            type="number"
            id="c"
            value={c}
            onChange={(e) => setC(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="d">Nota3</label>
          <input
            type="number"
            id="d"
            value={d}
            onChange={(e) => setD(parseFloat(e.target.value))}
          />
        </div>
        {alumnoId === 0 && <button type="submit">Agregar</button>}
      </form>
      {alumnoId !== 0 && (
        <>
          <button onClick={() => modificarAlumnoApi()}>Modificar</button>
          <button
            onClick={() => {
              setAlumnoId(0);
              setA(0);
              setB(0);
              setC(0);
              setD(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno.id}>
            {`${alumno.id}: ${alumno.a} - Notas (${alumno.b},${alumno.c},${alumno.d}) Promedio ${parseFloat(alumno.b+alumno.c+alumno.d)/3} - ${parseFloat(alumno.b+alumno.c+alumno.d)/3>=8?'Promocionado':parseFloat(alumno.b+alumno.c+alumno.d)/3>=6?'Aprobado':'Reprobado'}`}
            <button onClick={() => modificarAlumno(alumno)} disabled={alumnoId !== 0}>
              E
            </button>
            <button onClick={() => quitarAlumno(alumno.id)} disabled={alumnoId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
