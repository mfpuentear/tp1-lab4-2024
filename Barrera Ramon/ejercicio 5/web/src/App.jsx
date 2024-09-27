import { useEffect, useState } from "react";

function App() {
  const [sumas, setSumas] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [sumaId, setSumaId] = useState(0);
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
  

  return (
    <>
    <h1>Tareas </h1>
    <ul>
      {tarJS.map((ta) => {
        return ( <li key={ta.id}>{ta.task} - {ta.completada ? "👌" : "🤦‍♀️"} </li> )
      })}
    </ul>
    </>
  );
}

export default App;