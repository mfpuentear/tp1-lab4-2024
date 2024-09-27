import { useState, useEffect } from "react"

export default function Multiplicacion() {

  const [multiplicaciones, setMultiplicaciones] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [multiplicacionId, setMultiplicacionId] = useState(0);
  
  // Obtenemos listado de multiplicaciones cuando se carga por primera vez el componente.
  const getMultiplicaciones = async() =>{
    const response = await fetch("http://localhost:3000/multiplicaciones");
    if(response.ok){
      const {multiplicaciones} = await response.json();
      setMultiplicaciones(multiplicaciones);
    }
  };

  useEffect(()=>{
    getMultiplicaciones();
  }, []);


  const handleSubmit = async (e) =>{
    e.preventDefault();
    // POST http://localhost:3000/multiplicaciones (body: a, b).
    const response = await fetch("http://localhost:3000/multiplicaciones", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({a, b})
    });
    if(response.ok){
      // Pedir todas las multiplicaciones a la api.
      // Esta opcion nos trae todos los datos de la api actualizada.
      // getMultiplicaciones();

      // Agregar la multiplicacion creada devuelta por la api.
      // Ventaja: es rapido.
      // Desventaja: Esta opcion no nos devuelve los datos de la api actualizada.
      const {multiplicacion} = await response.json();
      setMultiplicaciones([...multiplicaciones, multiplicacion]);
      setA(0);
      setB(0);
    }else{
      const errorData = await response.json();
      alert(errorData.error)
    }
  }

  const handleEdit = (multiplicacion) =>{
    setMultiplicacionId(multiplicacion.id);
    setA(multiplicacion.a);
    setB(multiplicacion.b);
  }

  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:3000/multiplicaciones/${multiplicacionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las multiplicaciones a la api
      // getMultiplicaciones();

      // Modificar la multiplicacion devuelta por la api
      const { multiplicacion } = await response.json();
      setMultiplicaciones(multiplicaciones.map((m) => (m.id == multiplicacion.id ? multiplicacion : m)));

      setA(0);
      setB(0);
      setMultiplicacionId(0);
    }else{
      const errorData = await response.json();
      alert(errorData.error)
    }
  };

  const handleRemove = async (id) => {
    if(confirm("¿Desea quitar una multiplicacion?")){
      const response = await fetch(`http://localhost:3000/multiplicaciones/${id}`, {
        method: "DELETE"
      });

      if(response.ok){
        // Opcion 1: Quitar todas las multiplicaciones a la API.
        // getMultiplicaciones()

        // Opcion 2: Quitamos la multiplicacion de multiplicaciones
        setMultiplicaciones(multiplicaciones.filter((multiplicacion) => multiplicacion.id != id));
      }

    }
  }


  return (
    <>
      <h1>Multiplicaciones</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">a:</label>
          <input type="number" id="a" value={a} onChange={e => setA(parseFloat(e.target.value))}/>
        </div>
        <div>
          <label htmlFor="b">b:</label>
          <input type="number" id="b" value={b} onChange={e=> setB(parseFloat(e.target.value))} />
        </div>
        {multiplicacionId === 0 && <button type="submit">Agregar</button>}
      </form>
      {multiplicacionId !== 0 && (
        <>
          <button onClick={() => handleUpdate()}>Modificar</button>
          <button
            onClick={() => {
              setMultiplicacionId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {multiplicaciones.map((multiplicacion)=>( <li key={multiplicacion.id}>{`${multiplicacion.id}: ${multiplicacion.a} * ${multiplicacion.b} = ${multiplicacion.resultado} `} 
          <button onClick={()=>handleEdit(multiplicacion)} disabled={multiplicacionId !== 0}>E</button>
          <button onClick={()=>handleRemove(multiplicacion.id)}  disabled={multiplicacionId !== 0}>X</button></li>))}
      </ul>
    </>
  )
}


