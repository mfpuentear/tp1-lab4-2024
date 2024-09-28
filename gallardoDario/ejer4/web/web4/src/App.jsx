import { useEffect, useState } from "react";

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [nota1, setNota1] = useState(0);
  const [nota2, setNota2] = useState(0);
  const [nota3, setNota3] = useState(0);
  const [alumnoId, setAlumnoId] = useState(0);

  // Obtener alumnos desde la API
  const getAlumnos = async () => {
    const response = await fetch("http://localhost:3000/alumnos/");
    if (response.ok) {
      const { alumnos } = await response.json();
      setAlumnos(alumnos);
    }
  };

  // Cargar alumnos al montar el componente
  useEffect(() => {
    getAlumnos();
  }, []);

  // Agregar un nuevo alumno
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/alumnos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    });
    if (response.ok) {
      const { alumno } = await response.json();
      setAlumnos([...alumnos, alumno]);
      resetForm();
    }
  };

  // Modificar los valores del formulario para un alumno existente
  const modificarAlumno = (alumno) => {
    setAlumnoId(alumno.id);
    setNombre(alumno.nombre);
    setNota1(alumno.nota1);
    setNota2(alumno.nota2);
    setNota3(alumno.nota3);
  };

  // Enviar datos modificados a la API
  const modificarAlumnoApi = async () => {
    const response = await fetch(`http://localhost:3000/alumnos/${alumnoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    });

    if (response.ok) {
      const { alumno } = await response.json();

      // Actualizar el estado con el alumno modificado
      setAlumnos(alumnos.map((s) => (s.id === alumno.id ? alumno : s)));

      resetForm();
    }
  };

  // Función para eliminar alumno
  const quitarAlumno = async (id) => {
    if (confirm("¿Desea quitar este alumno?")) {
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
      }
    }
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setAlumnoId(0);
    setNombre("");
    setNota1(0);
    setNota2(0);
    setNota3(0);
  };

  return (
    <>
      <h1>Listado de Alumnos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre y Apellido del Alumno</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="nota1">Nota 1</label>
          <input
            type="number"
            id="nota1"
            value={nota1}
            onChange={(e) => setNota1(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="nota2">Nota 2</label>
          <input
            type="number"
            id="nota2"
            value={nota2}
            onChange={(e) => setNota2(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="nota3">Nota 3</label>
          <input
            type="number"
            id="nota3"
            value={nota3}
            onChange={(e) => setNota3(parseFloat(e.target.value))}
          />
        </div>

        {alumnoId === 0 ? (
          <button type="submit">Agregar</button>
        ) : (
          <>
            <button onClick={modificarAlumnoApi}>Modificar</button>
            <button onClick={resetForm}>Cancelar</button>
          </>
        )}
      </form>

      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno.id}>
            {`Nombre: ${alumno.nombre} | Notas: ${alumno.nota1}, ${alumno.nota2}, ${alumno.nota3} | Promedio: ${alumno.promedio} | Estado: ${alumno.estado}`}
            <button onClick={() => modificarAlumno(alumno)}>Editar</button>
            <button onClick={() => quitarAlumno(alumno.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
