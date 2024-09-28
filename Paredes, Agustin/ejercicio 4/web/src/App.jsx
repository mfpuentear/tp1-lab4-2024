import { useState } from "react"


function App() {
  const [alumnos, setAlumnos] = useState([""])
  const [nombre, setNombre] = useState("")
  const [nota1, setNota1] = useState(0)
  const [nota2, setNota2] = useState(0)
  const [nota3, setNota3] = useState(0)
  const [alumnoId, setAlumnoId] = useState(0)
  const [datNota, setDatNota] = useState("")


  const verNotas = (nota) => {
    if (nota < 0 || nota > 10) {
      setDatNota("Ingreso de nota incorrecto.")
      return false
    }
    setDatNota("")
    return true
  }


  const añadirAlumno = async () => {
    if (!verNotas(nota1) || !verNotas(nota2) || !verNotas(nota3)) {
      return
    }

    const response = await fetch(`http://localhost:3000/alumnos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {nombre, nota1, nota2, nota3} )
    })

    if (response.ok) {
      const individuo = await response.json()
      setAlumnos([...alumnos, individuo])
      setNombre("")
      setNota1(0)
      setNota2(0)
      setNota3(0)
    }
  }

  const modificarAlumno = (alumno) => {
    setAlumnoId(alumno.id)
    setNombre(alumno.nombre)
    setNota1(alumno.nota1)
    setNota2(alumno.nota2)
    setNota3(alumno.nota3)
  }

  const modificarAlumnoApi = async () => {
    if (!verNotas(nota1) || !verNotas(nota2) || !verNotas(nota3)) {
      return;
    }

    const response = await fetch(`http://localhost:3000/alumnos/${alumnoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( nombre, nota1, nota2, nota3 ),
    })

    if (response.ok) {
      const individuo = await response.json();
      setAlumnos(alumnos.map((e) => (e.id === individuo.id ? individuo : e)));
      setNombre("");
      setNota1(0);
      setNota2(0);
      setNota3(0);
      setAlumnoId(0);
    }
  }

  const eliminarAlumno = async (id) => {
    if (confirm("¿Desea eliminar alumno?")) { // Error de duplicación corregido "alumno alumno" (línea 54)
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
      }
    }
  }

  const calcularPromedio = (nota1, nota2, nota3) => {
    return (nota1 + nota2 + nota3) / 3;
  }

  const condicionAlumno = (promedio) => {
    if (promedio >= 8) {
      return "Promocionado.";
    } else if (promedio >= 6) {
      return "Aprobado.";
    } else {
      return "Desaprobado.";
    }
  };

  return (
    <div>
      <h3>Listado de Alumnos: </h3>
      <div>
        <label htmlFor="nombre">Nombre del alumno: </label>
        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>

      <div>
        <label htmlFor="nota1">Nota 1:</label>
        <input type="number" id="nota1" value={nota1} onChange={(e) => setNota1(parseFloat(e.target.value))} />
      </div>
      <div>
        <label htmlFor="nota2">Nota 2:</label>
        <input type="number" id="nota2" value={nota2} onChange={(e) => setNota2(parseFloat(e.target.value))} />
      </div>
      <div>
        <label htmlFor="nota3">Nota 3:</label>
        <input type="number" id="nota3" value={nota3} onChange={(e) => setNota3(parseFloat(e.target.value))} />
      </div>

      {datNota && <p>{datNota}</p>}
      {alumnoId === 0 && <button type="button" onClick={añadirAlumno}>Agregar Alumno</button>} 

      {alumnoId !== 0 && (
        <>
          <button onClick={modificarAlumnoApi}>Modificar</button>
          <button onClick={() => { setAlumnoId(0); setNombre(""); setNota1(0); setNota2(0); setNota3(0); }}>Cancelar</button>
        </>
      )}

      <h4>Lista de alumnos</h4>
      <ul>
        {alumnos.map((alumno) => {
          const promedio = calcularPromedio( 
            alumno.nota1,
            alumno.nota2,
            alumno.nota3
          )
          const estado = condicionAlumno(promedio)
          return (
            <li key={alumno.id}>
              {`Alumno ${alumno.id}:`} <br />
              {`Nombre: ${alumno.nombre}`} <br />
              {`Nota 1: ${alumno.nota1}`} <br />
              {`Nota 2: ${alumno.nota2}`} <br />
              {`Nota 3: ${alumno.nota3}`} <br />
              {`Promedio: ${promedio.toFixed(2)}`} <br />
              {`Estado: ${estado}`} <br />
              <br />

              <button onClick={() => modificarAlumno(alumno)} disabled={alumnoId !== 0}>Editar</button>
              <button onClick={() => eliminarAlumno(alumno.id)} disabled={alumnoId !== 0}>Eliminar</button> 
            </li>
          )
        })}
      </ul>

    </div>
  )
}

export default App
