import { useEffect, useState } from "react";

function App() {
  const [nombres, setNombres] = useState([]);
  const [nombre, setNombre] = useState("");
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [nota3, setNota3] = useState("");
  const [sumaId, setSumaId] = useState(0);

  const getAlumnos = async () => {
    const res = await fetch("http://localhost:3000/alumnos");
    if (res.ok) {
      const data = await res.json();
      setNombres(data.alumnos);
    }
  };

  useEffect(() => {
    getAlumnos();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sumaId) {
      await modificarAlumno(sumaId);
      setSumaId(0);
    } else {
      const res = await fetch("http://localhost:3000/alumnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
      });
      if (res.ok) {
        const { data } = await res.json();
        setNombres([...nombres, data]);
      }
    }
    setNombre("");
    setNota1("");
    setNota2("");
    setNota3("");
  };

  const modificarAlumno = async (id) => {
    const alumno = nombres.find((alumn) => alumn.id === id);
    if (alumno) {
      setNombre(alumno.nombre);
      setNota1(alumno.nota1);
      setNota2(alumno.nota2);
      setNota3(alumno.nota3);
      setSumaId(id);
    }
  };

  const eliminarAlumno = async (id) => {
    if (confirm("¿Quiere borrar Alumno?")) {
      const res = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNombres(nombres.filter((alumn) => alumn.id !== id));
      }
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h1>Nota de Alumnos</h1>
        <label htmlFor="nombre">Alumno: </label>
        <input
          type="text"
          id="nombre"
          placeholder="Nombre y Apellido"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <br />
        <label htmlFor="nota1">Nota 1: </label>
        <input
          type="number"
          id="nota1"
          value={nota1}
          onChange={(e) => setNota1(e.target.value)}
        />
        <br />
        <label htmlFor="nota2">Nota 2: </label>
        <input
          type="number"
          id="nota2"
          value={nota2}
          onChange={(e) => setNota2(e.target.value)}
        />
        <br />
        <label htmlFor="nota3">Nota 3: </label>
        <input
          type="number"
          id="nota3"
          value={nota3}
          onChange={(e) => setNota3(e.target.value)}
        />
        <br />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {nombres.map((ele) => {
          const promedio =
            (parseInt(ele.nota1) + parseInt(ele.nota2) + parseInt(ele.nota3)) / 3;
          const condicion =
            promedio < 6
              ? "Reprobado"
              : promedio >= 8
              ? "Promocionado"
              : "Aprobado";
          return (
            <li key={ele.id}>
              {ele.nombre} | Notas: {ele.nota1} - {ele.nota2} - {ele.nota3} | <br />
              Promedio: {promedio.toFixed(2)} | Condición: {condicion}
              <button onClick={() => eliminarAlumno(ele.id)}>Eliminar</button>
              <button onClick={() => modificarAlumno(ele.id)}>Editar</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
