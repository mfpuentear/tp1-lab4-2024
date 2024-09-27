import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [nota1, setNota1] = useState(5);
  const [nota2, setNota2] = useState(5);
  const [nota3, setNota3] = useState(5);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const fetchAlumnos = async () => {
    const response = await fetch("http://localhost:3000/alumnos/listaAlumnos");
    if (response.ok) {
      const data = await response.json();
      setAlumnos(data);
    }
  };

  const agregarAlumno = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:3000/alumnos/listaAlumnos",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, nota1, nota2, nota3 }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setAlumnos([...alumnos, data.alumno]);
      setNombre("");
      setApellido("");
      setNota1(5);
      setNota2(5);
      setNota3(5);
    }
  };

  const quitarAlumno = async (id) => {
    if (confirm("¿Está seguro?")) {
      const response = await fetch(
        `http://localhost:3000/alumnos/listaAlumnos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
      }
    }
  };

  const activarModoEdicion = (id, apellido, nombre, nota1, nota2, nota3) => {
    setModoEdicion(true);
    setIdEditar(id);
    setApellido(apellido)
    setNombre(nombre)
    setNota1(nota1)
    setNota2(nota2)
    setNota3(nota3)
  };

  const modificarAlumno = async (id) => {
    const response = await fetch(
      `http://localhost:3000/alumnos/listaAlumnos/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apellido, nombre, nota1, nota2, nota3 }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data.alumno) {
        setAlumnos(
          alumnos.map((alumno) =>
            alumno.id === id ? data.alumno : alumno
          )
        );
      }

      setApellido("")
      setNombre("")
      setNota1(5)
      setNota2(5)
      setNota3(5)
      setModoEdicion(false);
      setIdEditar(null);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  return (
    <>
      <div className="App-container">
        <form onSubmit={agregarAlumno} className="card">
          <span>Apellido</span>
          <input
            required
            type="text"
            id="apellido"
            value={apellido}
            onChange={(event) => setApellido(event.target.value)}
          />

          <span>Nombre</span>
          <input
            required
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />

          <span>Nota 1</span>
          <input
            type="number"
            id="nombre"
            value={nota1}
            onChange={(event) => setNota1(parseFloat(event.target.value))}
          />
          <span>Nota 2</span>
          <input
            type="number"
            id="nombre"
            value={nota2}
            onChange={(event) => setNota2(parseFloat(event.target.value))}
          />
          <span>Nota 3</span>
          <input
            type="number"
            id="nombre"
            value={nota3}
            onChange={(event) => setNota3(parseFloat(event.target.value))}
          />

          <div className="botones">
            <button type="submit" disabled={modoEdicion}>
              Enviar
            </button>
            <button
              type="button"
              onClick={() => modificarAlumno(idEditar)}
              disabled={!modoEdicion}
            >
              Modificar
            </button>
          </div>
          {(nota1 < 0 || nota2 < 0 || nota3 < 0) && (
            <p style={{ color: "red" }}>
              Las notas no deben contener un número negativo
            </p>
          )}
        </form>

        <div className="listas-container">
          <div className="lista card">
            <span>Lista de alumnos:</span>
            <ul>
              {alumnos.map((alumno) => (
                <li key={alumno.id}>
                  <span>
                    {alumno.apellido} {alumno.nombre}
                  </span>
                  <button
                    onClick={() =>
                      activarModoEdicion(
                        alumno.id,
                        alumno.apellido,
                        alumno.nombre,
                        alumno.nota1,
                        alumno.nota2,
                        alumno.nota3,
                      )
                    }
                  >
                    ✏️
                  </button>
                  <button onClick={() => quitarAlumno(alumno.id)}>❌</button>
                  <br />
                  <span>Nota 1: {alumno.nota1}</span>
                  <br />
                  <span>Nota 2: {alumno.nota2}</span>
                  <br />
                  <span>Nota 3: {alumno.nota3}</span>
                  <br />
                  <span>Promedio: {alumno.condicion}</span>

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
