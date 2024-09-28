import { useEffect } from 'react'
import { useState } from 'react';
import './App.css'

function App() {
  const[tareas, setTareas] = useState([]);
  const [operacionDesactivada, setOperacionDesactivada] = useState(false);
  const[nombre, setNombre] = useState(null);
  const[completada, setCompletada] = useState(false);
  const[total, setTotal] = useState(0);
  const[completadas, setCompletadas] = useState(0);
  const[incompletas, setIncompletas] = useState(0);
  const[tareaACambiar, setTareaACambiar] = useState(null);

  const getTareas =async()=>{
    const response = await fetch("http://localhost:3000/tareas");
    if(response.ok){
      const {tareas} = await response.json();
      setTareas(tareas);
      setTotal(tareas.length);
      const tareasCompletadas = tareas.filter((tarea) => tarea.completada === true);
      const tareasIncompletas = tareas.filter((tarea) => tarea.completada === false);
      setCompletadas(tareasCompletadas.length);
      setIncompletas(tareasIncompletas.length);
    };
  };

  useEffect(() => {
    getTareas();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!nombre){
      alert("Por favor provea nombre para la tarea!");
      return;
    }
    const response = await fetch("http://localhost:3000/tareas",{
      method:"POST", 
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ nombre, completada})
    });
    if(response.ok){
        const {nuevaTarea} = await response.json();
        setTareas([...tareas, nuevaTarea]);
        setNombre('');
        setCompletada(false);
        setTotal(prevTotal => prevTotal + 1);
        if(nuevaTarea.completada){
          setCompletadas(prevCompletadas => prevCompletadas + 1);
        }else if(!nuevaTarea.completada){
          setIncompletas(prevCompletadas => prevCompletadas + 1);
        }
      }else{
        const errorData = await response.json();
        alert(errorData.mensaje);
      }
  }

  const quitarTarea = async(id) => {
    if(confirm("¿Desea quitar la tarea?")){
      const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method:"DELETE",
      });
      if(response.ok){
        const tareaEliminada = tareas.find((tarea) => tarea.id == id);
        if(tareaEliminada.completada){
          setCompletadas(prevCompletadas => prevCompletadas - 1);
        }else if(!tareaEliminada.completada){
          setIncompletas(prevCompletadas => prevCompletadas - 1);
        }
        setTareas(tareas.filter((tarea) => tarea.id != id));
        setTotal(prevTotal => prevTotal - 1);
      };
    };
  };

  const modificarTarea = (tarea) => {
    console.log('tarea.completada');
    console.log(tarea.completada);
    setTareaACambiar(tarea);
    setNombre(tarea.nombre);
    setCompletada(tarea.completada);
    setOperacionDesactivada(true);
  };

  const modificarTareaApi = async ()=> {
    console.log('completada');
    console.log(completada);
    const response = await fetch(`http://localhost:3000/tareas/${tareaACambiar.id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify( {nombre, completada } )
    });
    if(response.ok){
      const {tareaModificada} = await response.json();
      const valorAnteriorModificada = tareas.find((tarea) => tarea.id == tareaModificada.id);
      if(tareaModificada.completada != valorAnteriorModificada.completada){
        if(tareaModificada.completada){
          setCompletadas(prevCompletadas => prevCompletadas + 1);
          setIncompletas(prevCompletadas => prevCompletadas - 1);
        }else{
            setCompletadas(prevCompletadas => prevCompletadas - 1);
            setIncompletas(prevCompletadas => prevCompletadas + 1);
        }
      }
      setTareas(tareas.map((t) => (t.id == tareaModificada.id ? tareaModificada : t)));
      setNombre('');
      setCompletada(false);
      setTareaACambiar(null);
      setOperacionDesactivada(false);
    }else{
      const errorData = await response.json();
      alert(errorData.mensaje);
    }
  }

  return (
    <>
    <div className='conteiner'>
      <h1>Tareas!</h1>
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
          <label htmlFor="completada">Completada? </label>
          <input 
            type="checkbox"
            id="completada" 
            checked={completada} 
            onChange={(e) =>setCompletada(e.target.checked)}
          />
        </div>
        <br></br>
        {tareaACambiar === null && <button type='submit'>Agregar Tarea</button>}
      </form>
        {tareaACambiar != null && 
          (
          <>
          <button onClick={() => modificarTareaApi()}>Modificar Tarea</button>
          <button onClick={() => {
            setTareaACambiar(null);
            setNombre('');
            setCompletada(false);
            setOperacionDesactivada(false);
          }}>Cancelar</button>
          </>
          )
        }
    </div>
    <br></br>
    <div className="operaciones-container">
      <div className="operacion">
      <span>{`Total: ${total} | Completadas: ${completadas} | Incompletas: ${incompletas}`}</span> 
        <h3>Listado de Tareas!</h3>
        <ul>
          {tareas.map((tarea) => {
            const tareaCompletada = tarea.completada == true  ? '👍🏼' : '👎🏼';

            return (
              <li key={tarea.id}>
                <span>{`Id:${tarea.id} ➡️ Nombre: ${tarea.nombre} | Completada? ${tareaCompletada}`}</span> 
                <br></br>
                <button disabled={operacionDesactivada} onClick={() => modificarTarea(tarea)}>✏️</button>
                <button disabled={operacionDesactivada} onClick={() => quitarTarea(tarea.id)}>❌</button>
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