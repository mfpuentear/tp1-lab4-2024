import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [completada, setCompletado] = useState(false);
  const [toalTarea, setToTalTarea] = useState(0);
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
  
  // Obtenemos listado de sumas cuando se carga por primera vez el componente
  useEffect(() => {
    getTareas();
  }, [tarJS]);
  
  // useEffect(()=> {
  //   if (tarJS){
  //     console.log(tarJS)
  //   }
  // },[tarJS])
  
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

  }


  return (
    <>
    <form action="" onSubmit={handleSubmit}>
      <h1>Lista Tareas </h1>
      <label>Tareas:</label> <br />
      <input type="text" id="a"
      value={task} 
      checked
      onChange={(e) => setTask(e.target.value)} /> <br />
      <label htmlFor="">Completada     </label>
      <input type="checkbox" value={completada} onChange={(e) => setCompletado(e.target.checked)} /><br />
      <button type="submit">Agregar</button>
    </form>
    <ul>
      {tarJS.map((ta) => {
        return ( <li key={ta.id}>{ta.task} - {ta.completada ? "✅" : "❌"} </li> )
      })}
    </ul>
    {/* {tarJS.reduce((acc, index) => acc++)
      return ()} */}
    </>
  );
}

export default App;