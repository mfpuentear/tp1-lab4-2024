import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [completada, setCompletado] = useState(false);
  const [tarJS, setTarJS] = useState([])

  const getTareas = async () => {
    const res = await fetch("http://localhost:3000/tareas");
    console.log(res)
    if (res.ok) {
      const data = await res.json();
      console.log(data.tareas)
      setTarJS(data.tareas);
    }
  };
  
  useEffect(() => {
    getTareas();
  }, []);
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:3000/tareas",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({ task , completada})
    });

  if(res.ok){
    const { data } = await res.json()
    getTareas([...tarJS, data])
  }
  };
  
  const calcTarea = tarJS.reduce(
    (acc, tarea) => {
      acc.total += 1;
      if (tarea.completada) acc.completadas += 1;
      return acc;
    },
    { total: 0, completadas: 0 }
  );

  const eliminarTarea = async (id) => {
    if (confirm("¿Quiere borrar la tarea?")) {
      const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTarJS(tarJS.filter((tarea) => tarea.id !== id));
      }
    }
  };

  return (
    <>
    <h2>Ejercicio 5</h2>
    <h3>Tareas</h3>
    <form action="" onSubmit={handleSubmit}>
      <div>
        <label>Tareas:</label> <br/>
        <input 
        type="text" 
        id="a"
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        /> <br />
      </div>
      <div>
        <label htmlFor="">Completada</label>
        <input 
        type="checkbox" 
        value={completada} 
        onChange={(e) => setCompletado(e.target.checked)} 
        /><br/>
      </div>
        <button 
        type="submit">
          Agregar
        </button>
    </form>
    <ul>
      {tarJS.map((tarea) => {
        return ( 
        <li key = {tarea.id}>
          {tarea.task} - 
          {tarea.completada 
          ? "✅" 
          : "❌"} 
        <button 
        onClick={() => eliminarTarea(tarea.id)}>
          X
        </button> 
        </li> )
      })}
    </ul>
      <p>
        Tareas: {calcTarea.total} - 
        Completadas: {calcTarea.completadas} - 
        Incompletas:{" "}
        {calcTarea.total - calcTarea.completadas}
      </p>
    </>
  );
}

export default App;