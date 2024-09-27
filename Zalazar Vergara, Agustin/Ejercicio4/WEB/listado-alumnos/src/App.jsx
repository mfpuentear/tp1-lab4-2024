import { useState, useEffect } from "react"

function App() {

  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [nota1, setNota1] = useState(0);
  const [nota2, setNota2] = useState(0);
  const [nota3, setNota3] = useState(0);
  const [alumnoId, setAlumnoId] = useState(0);
  const [promedio, setPromedio] = useState(0);

  const getAlumnos = async() =>{
    const response = await fetch("http://localhost:3000/alumnos");
    if(response.ok){
      const {alumnos} = await response.json();
      setAlumnos(alumnos);
    }
  }

  useEffect(()=>{
    getAlumnos();
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/alumnos", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nombre, nota1, nota2, nota3})
    })
    if(response.ok){
      getAlumnos();
      setNombre("");
      setNota1(0);
      setNota2(0);
      setNota3(0);
    }else{
      const errorData = await response.json();
      alert(errorData.error);
    }
  }

  const handleRemove = async(id) =>{
    const alumno = alumnos.find((alumno) => alumno.id == id);
    if(confirm(`¿Desea eliminar al alumno ${alumno.nombre} de la lista?`)){
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "DELETE"
      });
      if(response.ok){
        getAlumnos();
      }
    }
  }

  const handleEdit = (alumno) =>{
    setNombre(alumno.nombre);
    setNota1(alumno.nota1);
    setNota2(alumno.nota2);
    setNota3(alumno.nota3);
    setAlumnoId(alumno.id);
  }

  const handleUpdate = async() =>{
    const response = await fetch(`http://localhost:3000/alumnos/${alumnoId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nombre, nota1, nota2, nota3})
    });
    if(response.ok){
      getAlumnos();
      setNombre("");
      setNota1(0);
      setNota2(0);
      setNota3(0);
      setAlumnoId(0);
    }else{
      const errorData = await response.json();
      alert(errorData.error);
    }
  }

  return (
    <>
      <h1>Alumnos de Materia</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
        </div>
        <div>
          <label htmlFor="nota1">Nota 1:</label>
          <input type="number" id="nota1" value={nota1} onChange={(e)=>setNota1(parseFloat(e.target.value))} />
        </div>
        <div>
          <label htmlFor="nota2">Nota 2:</label>
          <input type="number" id="nota2" value={nota2} onChange={(e)=>setNota2(parseFloat(e.target.value))} />
        </div>
        <div>
          <label htmlFor="nota3">Nota 3:</label>
          <input type="number" id="nota3" value={nota3} onChange={(e)=>setNota3(parseFloat(e.target.value))} />
        </div>
        {alumnoId == 0 && <button type="submit">Agregar</button>}
      </form>
      {alumnoId !== 0 && (
        <>
          <button onClick={()=>handleUpdate()}>Modificar</button>
          <button onClick={()=>{
            setNombre("");
            setNota1(0);
            setNota2(0);
            setNota3(0);
            setAlumnoId(0);
          }}>Cancelar</button>
        </>
      )}
      <ul>
        {alumnos.map((alumno)=>{
          const promedio = ((alumno.nota1+alumno.nota2+alumno.nota3) / 3).toFixed(2);
          let estado;
          if (promedio >= 8) {
            estado = 'Promocionado';
          } else if (promedio >= 6) {
            estado = 'Aprobado';
          } else {
            estado = 'Desaprobado';
          }
          return (
          <li key={alumno.id}>{`${alumno.nombre} - Nota 1: ${alumno.nota1} Nota 2: ${alumno.nota2} Nota 3: ${alumno.nota3} Promedio: ${promedio} Estado: ${estado}`}
          <button onClick={()=> handleEdit(alumno)} disabled={alumnoId !== 0}>E</button>
          <button onClick={()=> handleRemove(alumno.id)} disabled={alumnoId !== 0}>X</button>
          </li>
        )})}
      </ul>
    </>
  )
}

export default App
