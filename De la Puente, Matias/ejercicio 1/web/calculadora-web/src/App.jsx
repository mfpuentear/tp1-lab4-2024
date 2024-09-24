import { useState, useEffect } from "react"

function App() {

  const [sumas, setSumas] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  // Obtenemos listado de sumas cuando se carga por primera vez el componente.
  const getSumas = async() =>{
    const response = await fetch("http://localhost:3000/sumas");
    if(response.ok){
      const {sumas} = await response.json();
      setSumas(sumas);
    }
  };

  useEffect(()=>{
    getSumas();
  }, []);


  const handleSubmit = async (e) =>{
    e.preventDefault();
    // POST http://localhost:3000/sumas (body: a, b).
    const response = await fetch("http://localhost:3000/sumas", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({a, b})
    });
    if(response.ok){
      // Pedir todas las sumas a la api.
      // Esta opcion nos trae todos los datos de la api actualizada.
      // getSumas();

      // Agregar la suma creada devuelta por la api.
      // Ventaja: es rapido.
      // Desventaja: Esta opcion no nos devuelve los datos de la api actualizada.
      const {suma} = await response.json();
      setSumas([...sumas, suma]);
    }
  }



  return (
    <>
      <h1>Sumas</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">a:</label>
          <input type="number" id="a" value={a} onChange={e => setA(parseFloat(e.target.value))}/>
        </div>
        <div>
          <label htmlFor="b">b:</label>
          <input type="number" id="b" value={b} onChange={e=> setB(parseFloat(e.target.value))} />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {sumas.map((suma)=> <li key={suma.id}>{suma.id}: {suma.a} + {suma.b} = {suma.resultado}</li>)}
      </ul>
    </>
  )
}

export default App
