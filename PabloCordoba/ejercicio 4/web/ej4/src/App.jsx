import React, { useState, useEffect } from 'react';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [notas, setNotas] = useState([0, 0, 0]);

  useEffect(() => {
    fetch('http://localhost:5300/alumnos')
      .then(res => res.json())
      .then(data => setAlumnos(data))
      .catch(error => console.log(error));
  }, []);

  const agregarAlumno = () => {
    fetch('http://localhost:5300/alumnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nombre, notas})
    })
    .then(res => {
      if (res.ok) {
        setAlumnos([...alumnos, { nombre, notas }])
        setNombre('')
        setNotas([0, 0, 0]);
      } else {
        response.json().then(data => alert(data.error))
      }
    })
    .catch(error => console.log(error))
  };

  const eliminarAlumno = (nombre) => {
    fetch(`http://localhost:5300/alumnos/${nombre}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        setAlumnos(alumnos.filter(alumno => alumno.nombre !== nombre))
      } else {
        response.json().then(data => alert(data.error))
      }
    })
    .catch(error => console.log(error))
  }

  const calcularPromedio = (notas) => {
    const promedio = notas.reduce((a, b) => a + b, 0) / notas.length;
    return promedio.toFixed(2)
  }

  const estadoAlumno = (promedio) => {
    if (promedio >= 8) 
      return 'Promocionado'
    if (promedio >= 6) 
      return 'Aprobado'
    return 'Desaprobado'
  }

  return (
    <>
      <h1>Listado de Alumnos</h1>
      <div>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}/>
        <input type="number" value={notas[0]} onChange={e => setNotas([parseInt(e.target.value), notas[1], notas[2]])}/>
        <input type="number" value={notas[1]} onChange={e => setNotas([notas[0], parseInt(e.target.value), notas[2]])}/>
        <inpup type="number" value={notas[2]} onChange={e => setNotas([notas[0], notas[1], parseInt(e.target.value)])}/>
        <button onClick={agregarAlumno}>Agregar Alumno</button>
      </div>

      <ul>
        {alumnos.map(alumno => {
          const promedio = calcularPromedio(alumno.notas);
          return (
            <li key={alumno.nombre}>
              {alumno.nombre}: Notas {alumno.notas.join(', ')} | Promedio: {promedio} | Estado: {estadoAlumno(promedio)}
              <button onClick={() => eliminarAlumno(alumno.nombre)}>Eliminar</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
