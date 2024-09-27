import { useState, useEffect } from 'react';

function App() {
  const [Alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [IdEditar, setIdEditar] = useState(null);

  useEffect(() => {
    ObtenerAlumnos();
  }, []);

  const ObtenerAlumnos = async () => {
    const res = await fetch("http://localhost:3000/alumnos");
    if (res.ok) {
      const datos = await res.json();
      setAlumnos(datos.alumnos); // Asegúrate de que esto sea la lista de alumnos
    }
  };

  const AgregarNuevoAlumno = async () => {
    const res = await fetch("http://localhost:3000/alumnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    });
    if (res.ok) {
      ObtenerAlumnos();
      setNombre('');
      setNota1('');
      setNota2('');
      setNota3('');
    }
  };

  const EliminarAlumno = async (id) => {
    const res = await fetch(`http://localhost:3000/alumnos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      await ObtenerAlumnos();
    }
  };

  const InciarEdicion = (alumno) => {
    setNombre(alumno.nombre);
    setNota1(alumno.nota1);
    setNota2(alumno.nota2);
    setNota3(alumno.nota3);
    setIdEditar(alumno.id);
  };

  const EditarAlumno = async () => {
    const res = await fetch(`http://localhost:3000/alumnos/${IdEditar}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    });
    if (res.ok) {
      ObtenerAlumnos();
      setNombre('');
      setNota1('');
      setNota2('');
      setNota3('');
      setIdEditar(null);
    }
  };

  return (
    <>
      <div style={{display:"flex" , justifyContent:"center", alignItems:"center", flexDirection:"column" }}>
        <h1>wep Alumnos</h1>

        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Ingrese el Nombre' />

        <input type="number" value={nota1} onChange={(e) => setNota1(Number(e.target.value) || 0)} placeholder='Nota 1' />

        <input type="number" value={nota2} onChange={(e) => setNota2(Number(e.target.value) || 0)} placeholder='Nota 2' />

        <input type="number" value={nota3} onChange={(e) => setNota3(Number(e.target.value) || 0)} placeholder='Nota 3' />

        <button disabled={!nombre || nota1 <= 0 || nota2 <= 0 || nota3 <= 0} onClick={IdEditar ? EditarAlumno : AgregarNuevoAlumno}>
          {IdEditar ? "Actualizar" : "Agregar"}
        </button>

        <ul>
          {Alumnos.map((alumno) => (
            <li key={alumno.id}>
              {`Nombre: ${alumno.nombre} || Nota1: ${alumno.nota1} || Nota2: ${alumno.nota2} || Nota3: ${alumno.nota3} => Promedio de ${alumno.promedio} => Esta ${alumno.condicion}`}
              <button onClick={() => EliminarAlumno(alumno.id)}>Eliminar</button>
              <button onClick={() => InciarEdicion(alumno)}>Editar</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
