import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [alumnos, setAlumnos] = useState([])

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)
  const [notas, setNotas] = useState([0,0,0])
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null)

  useEffect(()=>{
    const getAlumnos = async ()=>{
      const response = await fetch('http://localhost:3000/alumnos')
      if (response.ok){
        const data = await response.json()
        const alumnosNuevos = data.data
        setAlumnos(alumnosNuevos)
      }
    }
    getAlumnos()
  },[])

  const agregarAlumno = async () => {
    let peticion = {
      method:"POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({nombre,notas})
    }
    const response = await fetch('http://localhost:3000/alumnos',peticion)
    if(response.ok){

      const data = await response.json()
      const nuevoalumno = data.data
      setAlumnos([...alumnos,nuevoalumno])
    }
  }

  const editarAlumno = (alumno) =>{
    setAlumnoSeleccionado(alumno)
    setNombre(alumno.nombre)
    setNotas(alumno.notas)
  }

  const editarAlumnoApi = async ()=>{
    let peticion = {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({nombre, notas})
    }

    const response = await fetch(`http://localhost:3000/alumnos/${alumnoSeleccionado.id}`,peticion)
    if (response.ok){
      const data = await response.json()
      const nuevoalumno = data.data
      const nuevaLista = alumnos.map((alumno)=> (alumno.id == alumnoSeleccionado.id) ? nuevoalumno : alumno)
      setAlumnos(nuevaLista)
      setAlumnoSeleccionado(null)
    }
  }

  const eliminarAlumno = async(alumno) =>{
   if(confirm('Desea Eliminar El alumno')){ let peticion = {
      method:'DELETE',
      headers:{'Content-Type':'application/json'}
    }
    const response = await fetch(`http://localhost:3000/alumnos/${alumno.id}`,peticion)
    if (response.ok){
      const nuevaLista = alumnos.filter((alumnoA) => alumnoA.id != alumno.id)
      setAlumnos(nuevaLista)
    }}
  }

  const handleNotas = (indice, valor) =>{
    const nuevasNotas = [...notas]
    nuevasNotas[indice] = valor
    setNotas(nuevasNotas)
  }
  return (
    <div className="container">
      <div className="listadoAlumnos">
        {alumnos.map((alumno)=>{
          let promedio = alumno.notas.reduce((valorAnterior, valorActual)=>{
            return parseFloat(valorAnterior) + parseFloat(valorActual)
          })
          promedio = promedio / 3
          console.log(promedio)
          return(
          <div className="alumno" key={alumno.id}>
            ID: {alumno.id} - {alumno.nombre} : Nota 1:{alumno.notas[0] } - Nota 2:{alumno.notas[1]} - Nota 3:{alumno.notas[2] } Promedio : {promedio} <p className="estado" style={{color:(promedio < 6 ) ? 'red' : (promedio < 8) ? 'black' : 'green'}}> <span style={{color:"black"}}>ESTADO :</span>{(promedio < 6 ) ? 'Desaprobado' : (promedio < 8) ? 'Regular' : 'Promocionado'}</p>
            <button className='editar' onClick={()=>editarAlumno(alumno)}>EDITAR</button>
            <button className='eliminar' onClick={()=>eliminarAlumno(alumno)}>ELIMINAR</button>
          </div>)} )}
            
      </div>
      <div className="agregarAlumnos">
        <form > 
          <label htmlFor="nombre">Nombre:
            <input type="text" name="nombre" id="nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
          </label>
          <label htmlFor="nota1">nota 1:
            <input type="number" name="nota1" id="nota1" value={notas[0]} onChange={(e)=>handleNotas(0,e.target.value)}/>
          </label>
          <label htmlFor="nota2">nota 2:
            <input type="number" name="nota2" id="nota2" value={notas[1]} onChange={(e)=>handleNotas(1,e.target.value)}/>
          </label>
          <label htmlFor="nota3">nota 3:
            <input type="number" name="nota3" id="nota3" value={notas[2]} onChange={(e)=>handleNotas(2,e.target.value)}/>
          </label>
          <button type="button" disabled={(alumnoSeleccionado != null)? true : false} onClick={()=>agregarAlumno()}>Agregar</button>
          <button type="button" disabled={(alumnoSeleccionado == null)? true : false} style={{opacity:(alumnoSeleccionado == null)? 0 : 1}} onClick={()=>editarAlumnoApi()}>Guardar</button>
          <button type="button" disabled={(alumnoSeleccionado == null)? true : false} style={{opacity:(alumnoSeleccionado == null)? 0 : 1}} onClick={()=>setAlumnoSeleccionado(null)}>Cancelar</button>
        </form>
      </div>

    </div>
  )
}

export default App
