import { useState, useEffect } from "react"

export default function Suma() {

  const [sumas, setSumas] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [sumaId, setSumaId] = useState(0);
  
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
      setA(0);
      setB(0);
    }else{
      const errorData = await response.json();
      alert(errorData.error)
    }
  }

  const handleEdit = (suma) =>{
    setSumaId(suma.id);
    setA(suma.a);
    setB(suma.b);
  }

  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:3000/sumas/${sumaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las sumas a la api
      // getSumas();

      // Modificar la suma devuelta por la api
      const { suma } = await response.json();
      setSumas(sumas.map((s) => (s.id == suma.id ? suma : s)));

      setA(0);
      setB(0);
      setSumaId(0);
    }else{
      const errorData = await response.json();
      alert(errorData.error)
    }
  };

  const handleRemove = async (id) => {
    if(confirm("¿Desea quitar una suma?")){
      const response = await fetch(`http://localhost:3000/sumas/${id}`, {
        method: "DELETE"
      });

      if(response.ok){
        // Opcion 1: Quitar todas las sumas a la API.
        // getSumas()

        // Opcion 2: Quitamos la suma de sumas
        setSumas(sumas.filter((suma) => suma.id != id));
      }

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
        {sumaId === 0 && <button type="submit">Agregar</button>}
      </form>
      {sumaId !== 0 && (
        <>
          <button onClick={() => handleUpdate()}>Modificar</button>
          <button
            onClick={() => {
              setSumaId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {sumas.map((suma)=>( <li key={suma.id}>{`${suma.id}: ${suma.a} + ${suma.b} = ${suma.resultado} `} 
          <button onClick={()=>handleEdit(suma)} disabled={sumaId !== 0}>E</button>
          <button onClick={()=>handleRemove(suma.id)}  disabled={sumaId !== 0}>X</button></li>))}
      </ul>
    </>
  )
}


