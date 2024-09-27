import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tareas, setTareas] = useState([{id:1,nombre:"Estudiar",completada:false}])

  const [nombre, setNombre] = useState('')
  const [tareaSeleccionado, setTareaSeleccionado] = useState(null)

  useEffect(()=>{
    const getTareas = async ()=>{
      const response = await fetch('http://localhost:3000/tareas')
      if (response.ok){
        const data = await response.json()
        const tareasNuevas = data.data
        setTareas(tareasNuevas)
      }
    }
    getTareas()

  },[])

  const agregartarea = async () => {
    let peticion = {
      method:"POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({nombre,completada:false})
    }
    const response = await fetch('http://localhost:3000/tareas',peticion)
    if(response.ok){

      const data = await response.json()
      const nuevaTarea = data.data
      setTareas([...tareas,nuevaTarea])
    }
  }


  const editarTareaApi = async (tarea)=>{
    const nombre = tarea.nombre 
    const completada = !(tarea.completada)
    let peticion = {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({nombre,completada})
    }

    const response = await fetch(`http://localhost:3000/tareas/${tarea.id}`,peticion)
    if (response.ok){
      const data = await response.json()
      const nuevaTarea = data.data
      const nuevaLista = tareas.map((tareaA)=> (tareaA.id == tarea.id) ? nuevaTarea : tareaA)
      setTareas(nuevaLista)
    }
  }

  const eliminarTarea = async(tarea) =>{
  if(confirm('Desea Eliminar La tarea')){ let peticion = {
      method:'DELETE',
      headers:{'Content-Type':'application/json'}
    }
    const response = await fetch(`http://localhost:3000/tareas/${tarea.id}`,peticion)
    if (response.ok){
      const nuevaLista = tareas.filter((tareaA) => tareaA.id != tarea.id)
      setTareas(nuevaLista)
    }}
  }


  return (
    <div className="container">
      <div className="listadotareas">
        {tareas.map((tarea)=>{
          return(
            <div className="tareadiv" key={tarea.id}>
              <input type="checkbox" name="tarea" id="tarea"  checked={tarea.completada} onChange={()=>editarTareaApi(tarea)} /><p style={{textDecoration:(tarea.completada) ? 'line-through' : 'none'}}> Id: {tarea.id} Descripcion : {tarea.nombre}</p>
              <button type="button" className='eliminiar' onClick={()=>eliminarTarea(tarea)}>ELIMINAR</button>
            </div>
          )} )}
            
      </div>
      <div className="agregartareas">
        <form > 
          <label htmlFor="nombre">Nombre:
            <input type="text" name="nombre" id="nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
          </label>
          
          <button type="button" disabled={(tareaSeleccionado != null)? true : false} onClick={()=>agregartarea()}>Agregar</button>
        </form>
      </div>

    </div>
  )
}

export default App
