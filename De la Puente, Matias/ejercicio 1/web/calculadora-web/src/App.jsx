import { useState, useEffect } from "react"

function App() {
  const [sumas, setSumas] = useState([]);
  useEffect(()=>{
    const getSumas = async() =>{
      const response = await fetch("http://localhost:3000/sumas");
      if(response.ok){
        const json = await response.json();
        setSumas(json.sumas);
      }
    };
    getSumas();
  }, []);
  return (
    <>
      <h1>Sumas</h1>
      <ul>
        {sumas.map((suma)=> <li key={suma.id}>{suma.id}: {suma.a} + {suma.b} = {suma.resultado}</li>)}
      </ul>
    </>
  )
}

export default App
