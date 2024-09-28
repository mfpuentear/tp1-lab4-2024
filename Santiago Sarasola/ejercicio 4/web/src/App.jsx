import { useEffect } from 'react'
import { useState } from 'react';
import './App.css'

function App() {
  const[alumnos, setAlumnos] = useState([]);
  const [operacionDesactivada, setOperacionDesactivada] = useState(false);
  const[nombre, setNombre] = useState(null);
  const[nota1, setNota1] = useState(0);
  const[nota2, setNota2] = useState(0);
  const[nota3, setNota3] = useState(0);
  const[alumnoACambiar, setAlumnoACambiar] = useState(null);

  const getAlumnos =async()=>{
    const response = await fetch("http://localhost:3000/alumnos");
    if(response.ok){
      const {alumnos} = await response.json();
      setAlumnos(alumnos);
    };
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!nombre){
      alert("Por favor provea nombre para el alumno!");
      return;
    }
    const response = await fetch("http://localhost:3000/alumnos",{
      method:"POST", 
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ nombre, nota1, nota2, nota3})
    });
    if(response.ok){
        const {nuevoAlumno} = await response.json();
        setAlumnos([...alumnos, nuevoAlumno]);
        setNombre('');
        setNota1(0);
        setNota2(0);
        setNota3(0);
      }else{
        const errorData = await response.json();
        alert(errorData.mensaje);
      }
  }

  const quitarAlumno = async(id) => {
    if(confirm("¿Desea quitar el alumno?")){
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method:"DELETE",
      });
      if(response.ok){
        setAlumnos(alumnos.filter((alumno) => alumno.id != id));
      };
    };
  };

  const modificarAlumno = (alumno) => {
    setAlumnoACambiar(alumno);
    setNombre(alumno.nombre);
    setNota1(alumno.nota1);
    setNota2(alumno.nota2);
    setNota3(alumno.nota3);
    setOperacionDesactivada(true);
  };

  const modificarAlumnoApi = async ()=> {
    const response = await fetch(`http://localhost:3000/alumnos/${alumnoACambiar.id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify( {nombre, nota1, nota2, nota3 } )
    });
    if(response.ok){
      const {alumnoModificado} = await response.json();
      setAlumnos(alumnos.map((a) => (a.id == alumnoModificado.id ? alumnoModificado : a)));
      setNombre('');
      setNota1(0);
      setNota2(0);
      setNota3(0);
      setAlumnoACambiar(null);
      setOperacionDesactivada(false);
    }else{
      const errorData = await response.json();
      alert(errorData.mensaje);
    }
  }

  return (
    <>
    <div className='conteiner'>
      <h1>Alumnos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input 
            type="text"
            id="nombre" 
            value={nombre} 
            onChange={(e) => setNombre((e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota1">Nota 1: </label>
          <input 
            type="number"
            id="nota1" 
            value={nota1} 
            max={10}
            onChange={(e) => setNota1(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota2">Nota 2: </label>
          <input 
            type="number"
            id="nota2" 
            value={nota2} 
            max={10}
            onChange={(e) => setNota2(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="nota3">Nota 3: </label>
          <input 
            type="number"
            id="nota3" 
            value={nota3} 
            max={10}
            onChange={(e) => setNota3(parseFloat(e.target.value))}
          />
        </div>
        <br></br>
        {alumnoACambiar === null && <button type='submit'>Agregar Alumno</button>}
      </form>
        {alumnoACambiar != null && 
          (
          <>
          <button onClick={() => modificarAlumnoApi()}>Modificar Alumno</button>
          <button onClick={() => {
            setAlumnoACambiar(null);
            setNombre('');
            setNota1(0);
            setNota2(0);
            setNota3(0);
            setOperacionDesactivada(false);
          }}>Cancelar</button>
          </>
          )
        }
    </div>
    <br></br>
    <div className="operaciones-container">
      <div className="operacion">
        <h3>Listado de Alumnos!</h3>
        <ul>
          {alumnos.map((alumno) => {
            const promedio = ((alumno.nota1 + alumno.nota2 + alumno.nota3) / 3).toFixed(1);
            const situacionFinal = promedio < 6 ? 'Desaprobado ✖️' : promedio >= 6 && promedio < 8 ? 'Aprobado ✅' : 'Promocionado ⭐';

            return (
              <li key={alumno.id}>
                <span>{`Id:${alumno.id} ➡️ Nombre: ${alumno.nombre} | 1º Nota: ${alumno.nota1} | 2º Nota: ${alumno.nota2} | 3º Nota: ${alumno.nota3}`}</span>
                <br></br>
                <span>{`📝 Promedio: ${promedio} | Situación final: ${situacionFinal}`}</span>
                <button disabled={operacionDesactivada} onClick={() => modificarAlumno(alumno)}>✏️</button>
                <button disabled={operacionDesactivada} onClick={() => quitarAlumno(alumno.id)}>❌</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App