import { useState, useEffect } from "react"

export default function Resta() {

  const [restas, setRestas] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [restaId, setRestaId] = useState(0);
  
  // Obtenemos listado de restas cuando se carga por primera vez el componente.
  const getRestas = async() =>{
    const response = await fetch("http://localhost:3000/restas");
    if(response.ok){
      const {restas} = await response.json();
      setRestas(restas);
    }
  };

  useEffect(()=>{
    getRestas();
  }, []);


  const handleSubmit = async (e) =>{
    e.preventDefault();
    // POST http://localhost:3000/restas (body: a, b).
    const response = await fetch("http://localhost:3000/restas", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({a, b})
    });
    if(response.ok){
      // Pedir todas las restas a la api.
      // Esta opcion nos trae todos los datos de la api actualizada.
      // getRestas();

      // Agregar la resta creada devuelta por la api.
      // Ventaja: es rapido.
      // Desventaja: Esta opcion no nos devuelve los datos de la api actualizada.
      const {resta} = await response.json();
      setRestas([...restas, resta]);
      setA(0);
      setB(0);
    }
  }

  const handleEdit = (resta) =>{
    setRestaId(resta.id);
    setA(resta.a);
    setB(resta.b);
  }

  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:3000/restas/${restaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las restas a la api
      // getRestas();

      // Modificar la resta devuelta por la api
      const { resta } = await response.json();
      setRestas(restas.map((r) => (r.id == resta.id ? resta : r)));

      setA(0);
      setB(0);
      setRestaId(0);
    }
  };

  const handleRemove = async (id) => {
    if(confirm("¿Desea quitar una resta?")){
      const response = await fetch(`http://localhost:3000/restas/${id}`, {
        method: "DELETE"
      });

      if(response.ok){
        // Opcion 1: Quitar todas las restas a la API.
        // getRestas()

        // Opcion 2: Quitamos la resta de restas
        setRestas(restas.filter((resta) => resta.id != id));
      }

    }
  }


  return (
    <>
      <h1>Restas</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">a:</label>
          <input type="number" id="a" value={a} onChange={e => setA(parseFloat(e.target.value))}/>
        </div>
        <div>
          <label htmlFor="b">b:</label>
          <input type="number" id="b" value={b} onChange={e=> setB(parseFloat(e.target.value))} />
        </div>
        {restaId === 0 && <button type="submit">Agregar</button>}
      </form>
      {restaId !== 0 && (
        <>
          <button onClick={() => handleUpdate()}>Modificar</button>
          <button
            onClick={() => {
              setRestaId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {restas.map((resta)=>( <li key={resta.id}>{`${resta.id}: ${resta.a} - ${resta.b} = ${resta.resultado} `} 
          <button onClick={()=>handleEdit(resta)} disabled={restaId !== 0}>E</button>
          <button onClick={()=>handleRemove(resta.id)}  disabled={restaId !== 0}>X</button></li>))}
      </ul>
    </>
  )
}


