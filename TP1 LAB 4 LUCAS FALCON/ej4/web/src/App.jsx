import { useEffect, useState } from "react";

function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [nota1, setNota1] = useState(0);
  const [nota2, setNota2] = useState(0);
  const [nota3, setNota3] = useState(0);
  const [alumnoId, setAlumnoId] = useState(0);

  const getAlumnos = async () => {
    const response = await fetch("http://localhost:3000/alumnos");
    if (response.ok) {
      const { alumnos } = await response.json();
      setAlumnos(alumnos);
    }
  };

  const obtenerPromedio = (n1,n2,n3)=>{
    return parseFloat((n1+n2+n3)/3)
  }
  
  const obtenerCondicion = (n1,n2,n3)=>{
    if(obtenerPromedio(n1,n2,n3) >= 8){
      return "Promocion"
    }
    else if (obtenerPromedio(n1,n2,n3) >= 6) {
      return "Regular"
    }else{
      return "Reprobado"
    }
  }

 
  useEffect(() => {
    getAlumnos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/alumnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    });
    if (response.ok) {
      
      const { alumno } = await response.json();
      setAlumnos([...alumnos, alumno]);
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
    const response = await fetch(`http://localhost:3000/alumnos/${alumnoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    });
    if (response.ok) {
      const { alumno } = await response.json();

      setAlumnos(alumnos.map((a) => (a.id == alumno.id ? alumno : a)));
    
      setNombre("");
      setNota1(0);
      setNota2(0)
      setNota3(0)
      setAlumnoId(0);
    }
  };

  const quitarAlumno = async (id) => {
    if (confirm("¿Desea quitar alumno?")) {
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
          <label htmlFor="nombre">nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre((e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota1">nota1</label>
          <input
            type="number"
            id="nota1"
            value={nota1}
            onChange={(e) => setNota1(parseFloat(e.target.value))}
            style={{marginLeft:"13px"}}
          />
        </div>
        <div>
          <label htmlFor="nota2">nota2</label>
          <input
            type="number"
            id="nota2"
            value={nota2}
            onChange={(e) => setNota2(parseFloat(e.target.value))}
            style={{marginLeft:"13px"}}

          />
        </div>
        <div>
          <label htmlFor="nota3">nota3</label>
          <input
            type="number"
            id="nota3"
            value={nota3}
            onChange={(e) => setNota3(parseFloat(e.target.value))}
            style={{marginLeft:"13px"}}
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
        {alumnos.map((alumno) => (
          <li key={alumno.id}>
            {`${alumno.id}: Nombre:${alumno.nombre} - Primera nota:${alumno.nota1} - Segunda nota:${alumno.nota2} - Tercer nota:${alumno.nota3} - Promedio: ${obtenerPromedio(alumno.nota1, alumno.nota2,alumno.nota3)} - ${obtenerCondicion(alumno.nota1, alumno.nota2,alumno.nota3)}`}
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

export default Alumnos;