import { useState , useEffect} from 'react'
function App() {
  const [tareas , setTareas] = useState([])
  const [nombre , setNombre] = useState('')
  const [completadas , setCompletadas] = useState(0)
  const [noCompletadas , setNoCompletadas] = useState(0)

  useEffect(()=> {
    ObtenerPrimerasTareas()
  },[])

  const ObtenerPrimerasTareas = async() => {
    const res = await fetch("http://localhost:3000/tareas");
    if (res.ok) {
      const datos = await res.json();
      setTareas(datos.tareas); 
      contador(datos.tareas)
    }
  }

  const AgregarTarea = async()=> {
    const res = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre , completada : false }),
    });
    if(res.ok){
      ObtenerPrimerasTareas()
      setNombre('')
    }else{
      alert("No se puede agregar Tareas del mismo nombre")
    }
  }

  const EliminarTarea = async(id) => {
    const res = await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      await ObtenerPrimerasTareas();
    }else{
      alert('error')
    }
  };

  const CompletarTarea = async(id) => {
    const res = await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre  }),
    });
    if(res.ok){
      await ObtenerPrimerasTareas()
    }
  }

  const contador = (tareas) => {
    const TareasCompletadas = tareas.reduce((acc , tarea)=> acc + (tarea.completada ? 1 : 0) , 0)
    setCompletadas(TareasCompletadas)

    const TareasNoCompletadas = tareas.reduce((acc,tarea)=> acc + (tarea.completada ? 0 : 1),0)
    setNoCompletadas(TareasNoCompletadas)
  }

  return (
    <>
      <div style={{textAlign:"center"}}>
        <h1>Lista de Tareas</h1>

        <input type="text" placeholder='Nombre' value={nombre} onChange={(e)=> setNombre(e.target.value)} />

        <button onClick={AgregarTarea}>Agregar tarea</button>
        <ul>
          {tareas.map((tarea)=>(
            <li key={tarea.id} style={{color : tarea.completada ? 'green' : 'red'}}>{`Nombre:(${tarea.nombre}) con tareas:(${tarea.completada})`}
              <button onClick={()=> CompletarTarea(tarea.id)}>Completar Tarea</button>
              <button onClick={()=> EliminarTarea(tarea.id)}>Eliminar</button>
            </li>
          ))}
        </ul>

        <p>{`Cantidad de tareas ${tareas.length}`}</p>
        <p>{`Tareas completadas: ${completadas}`}</p>
        <p>{`Tareas NO completadas: ${noCompletadas}`}</p>
      </div>
    </>
  )
}

export default App