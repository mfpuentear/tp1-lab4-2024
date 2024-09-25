import { useState, useEffect } from "react"

export default function Division() {

  const [divisiones, setDivisiones] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [divisionId, setDivisionId] = useState(0);
  
  // Obtenemos listado de divisiones cuando se carga por primera vez el componente.
  const getDivisiones = async() =>{
    const response = await fetch("http://localhost:3000/divisiones");
    if(response.ok){
      const {divisiones} = await response.json();
      setDivisiones(divisiones);
    }
  };

  useEffect(()=>{
    getDivisiones();
  }, []);


  const handleSubmit = async (e) =>{
    e.preventDefault();
    // POST http://localhost:3000/divisiones (body: a, b).
    const response = await fetch("http://localhost:3000/divisiones", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({a, b})
    });
    if(response.ok){
      // Pedir todas las divisiones a la api.
      // Esta opcion nos trae todos los datos de la api actualizada.
      // getDivisiones();

      // Agregar la division creada devuelta por la api.
      // Ventaja: es rapido.
      // Desventaja: Esta opcion no nos devuelve los datos de la api actualizada.
      const {division} = await response.json();
      setDivisiones([...divisiones, division]);
      setA(0);
      setB(0);
    }
  }

  const handleEdit = (division) =>{
    setDivisionId(division.id);
    setA(division.a);
    setB(division.b);
  }

  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:3000/divisiones/${divisionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las divisiones a la api
      // getDivisiones();

      // Modificar la division devuelta por la api
      const { division } = await response.json();
      setDivisiones(divisiones.map((d) => (d.id == division.id ? division : d)));

      setA(0);
      setB(0);
      setDivisionId(0);
    }
  };

  const handleRemove = async (id) => {
    if(confirm("¿Desea quitar una division?")){
      const response = await fetch(`http://localhost:3000/divisiones/${id}`, {
        method: "DELETE"
      });

      if(response.ok){
        // Opcion 1: Quitar todas las divisiones a la API.
        // getDivisiones()

        // Opcion 2: Quitamos la division de divisiones
        setDivisiones(divisiones.filter((division) => division.id != id));
      }

    }
  }


  return (
    <>
      <h1>Divisiones</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">a:</label>
          <input type="number" id="a" value={a} onChange={e => setA(parseFloat(e.target.value))}/>
        </div>
        <div>
          <label htmlFor="b">b:</label>
          <input type="number" id="b" value={b} onChange={e=> setB(parseFloat(e.target.value))} />
        </div>
        {divisionId === 0 && <button type="submit">Agregar</button>}
      </form>
      {divisionId !== 0 && (
        <>
          <button onClick={() => handleUpdate()}>Modificar</button>
          <button
            onClick={() => {
              setDivisionId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {divisiones.map((division)=>( <li key={division.id}>{`${division.id}: ${division.a} / ${division.b} = ${division.resultado} `} 
          <button onClick={()=>handleEdit(division)} disabled={divisionId !== 0}>E</button>
          <button onClick={()=>handleRemove(division.id)}  disabled={divisionId !== 0}>X</button></li>))}
      </ul>
    </>
  )
}


