import { useState, useEffect } from "react"

function App() {

  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [completado, setCompletado] = useState("");
  const [tareaId, setTareaId] = useState(0);

  const getTareas = async() =>{
    const response = await fetch("http://localhost:3000/tareas");
    if(response.ok){
      const {tareas} = await response.json();
      setTareas(tareas);
    }
  }

  useEffect(()=>{
    getTareas();
  }, []);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if (!completado || !nombre) {
      alert("Debe llenar los campos correspondientes");
      return;
    }
    const response = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nombre, completado})
    })
    if(response.ok){
      getTareas();
      setNombre("");
      setCompletado("");
    }else{
      const errorData = await response.json();
      alert(errorData.error);
    }
  }

  const handleRemove = async (id) =>{
    const tarea = tareas.find((tarea) => tarea.id == id);
    if(confirm(`¿Desea eliminar la tarea ${tarea.nombre} de la lista?`)){
      const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: "DELETE"
      })
      if(response.ok){
        getTareas();
      }
    }
  }

  const handleEdit = (tarea) =>{
    setNombre(tarea.nombre);
    setCompletado(tarea.completado);
    setTareaId(tarea.id);
  }

  const handleActualizar = async() =>{
    const response = await fetch(`http://localhost:3000/tareas/${tareaId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nombre, completado})
    });
    if(response.ok){
      getTareas();
      setNombre("");
      setCompletado("");
      setTareaId(0);
    }else{
      const errorData = await response.json();
      alert(errorData.error);
    }
  }

  const infoTareas = () =>{
    const totalTareas = tareas.length;
    let totalCompletas = 0;
    let totalIncompletas = 0;

    tareas.forEach((tarea)=>{
      if(tarea.completado === "Si") totalCompletas++;
      else totalIncompletas++;
    })
    
    return `Hay ${totalTareas} tarea/s, ${totalCompletas} COMPLETAS y ${totalIncompletas} INCOMPLETAS`;
  }

  return (
    <>
      <h1>TAREAS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
        </div>
        <div>
          <label>Completada: </label>
          <label htmlFor="si">Si</label>
          <input type="radio" id="si" value="Si" name="completado" onChange={(e)=>setCompletado(e.target.value)} checked={completado === "Si"} style={{marginRight: "10px"}}/>
          <label htmlFor="no"> No</label>
          <input type="radio" id="no" value="No" name="completado" onChange={(e)=>setCompletado(e.target.value)} checked={completado === "No"}/>
        </div>
        {tareaId == 0 && <button type="submit">Agregar</button>}
      </form>
      {tareaId !== 0 && (
        <>
          <button onClick={()=> handleActualizar()}>Modificar</button>
          <button onClick={()=>{
            setNombre("");
            setCompletado("");
            setTareaId(0);
          }}>Cancelar</button>
        </>
      )}
      <ol>
        {tareas.map((tarea) =>(
          <li key={tarea.id}>{`Tarea: ${tarea.nombre} - Completada: ${tarea.completado} `}
          <button onClick={()=> handleEdit(tarea)} disabled={tareaId !== 0}>E</button>
          <button onClick={()=> handleRemove(tarea.id)} disabled={tareaId !== 0}>X</button>
          </li>
        ))}
      </ol>
      <h4>{infoTareas()}</h4>
    </>
  )
}

export default App
