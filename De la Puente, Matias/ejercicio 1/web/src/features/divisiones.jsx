import { useState, useEffect } from 'react'

function Divisiones() {
  const [divisiones, setDivisiones] = useState([]);
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [divisionMod, setDivisionMod] = useState(null)

  const getDivisiones = async ()=>{
    const response = await fetch("http://localhost:3000/divisiones");
    if(response.ok){
      const { divisiones } = await response.json()
      console.log(divisiones)
      setDivisiones(divisiones)
    }
  }

  useEffect(()=>{
    getDivisiones()
  },[])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/divisiones",{
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ a, b })
    })
    if (response.ok){
      console.log("División agregada")
      getDivisiones()
    } else {
        alert("No se puede dividir por 0 o el divisor es mayor al dividendo")
    }
  }
  const quitarDivision = async (id)=> {
    if(confirm(`¿Desea quitar la division ${id}?`)){
      const response = await fetch(`http://localhost:3000/divisiones/${id}`,{
        method: "DELETE"
      })
      if(response.ok){
        console.log("División eliminada")
        getDivisiones()
      }
    }
  }

  const selecDivision = async (division)=>{
    setDivisionMod(division);
    setA(division.a);
    setB(division.b);
  }
  
  const modificarDivision = async ()=>{
    const response = await fetch(`http://localhost:3000/divisiones/${divisionMod.id}`,{
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ a, b })
    })
    if (response.ok){
      const { division } = await response.json()
      setDivisiones(divisiones.map((s)=>s.id == division.id ? division : s))
      setA(0)
      setB(0)
      setDivisionMod(null)
    }
  }

  return (
    <> 
    <h2>Divisiones</h2>
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexDirection: 'column'}}> 
      <div>
        <label htmlFor="a">Dividendo: </label>
        <input type="number" id="a" value={a} onChange={(e)=>setA(parseFloat(e.target.value))}/>
      </div>
      <div>
        <label htmlFor="b">Divisor: </label>
        <input type="number" id="b" value={b} onChange={(e)=>setB(parseFloat(e.target.value))}/>
      </div>

      {divisionMod === null && <button type='submit'>Agregar</button>}
    </form>
    {divisionMod !== null && (
      <>
      <button onClick={modificarDivision}>Modificar</button>
      <button onClick={()=>{
        setDivisionMod(null)
        setA(0)
        setB(0)
      }}>Cancelar</button>
      </>
    )}
    <ul>
      {divisiones.map((division)=>(
      <li key={division.id}>
        {`División Nº${division.id}: ${division.a} % ${division.b} = ${division.resultado}`}
        <button onClick={()=>quitarDivision(division.id)} disabled={divisionMod!==null}>X</button>
        <button onClick={()=>selecDivision(division)} disabled={divisionMod!==null}>E</button>
      </li>
    ))}
    </ul>
    <a href="/">Volver</a>
    </>
  )
}
export default Divisiones;