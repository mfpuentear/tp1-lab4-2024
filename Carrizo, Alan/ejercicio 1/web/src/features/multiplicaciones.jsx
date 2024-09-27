import { useState, useEffect } from 'react'

function Multiplicaciones() {
  const [multiplicaciones, setMultiplicaciones] = useState([]);
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [multMod, setMultMod] = useState(null)

  const getMult = async ()=>{
    const response = await fetch("http://localhost:3000/multiplicaciones");
    if(response.ok){
      const { multiplicaciones } = await response.json()
      console.log(multiplicaciones)
      setMultiplicaciones(multiplicaciones)
    }
  }

  useEffect(()=>{
    getMult()
  },[])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/multiplicaciones",{
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ a, b })
    })
    if (response.ok){
      console.log("Multiplicación agregada")
      getMult()
    }
  }
  const quitarMult = async (id)=> {
    if(confirm(`¿Desea quitar la multiplicación ${id}?`)){
      const response = await fetch(`http://localhost:3000/multiplicaciones/${id}`,{
        method: "DELETE"
      })
      if(response.ok){
        console.log("Multiplicación eliminada")
        getMult()
      }
    }
  }

  const selecMult = async (multiplicacion)=>{
    setMultMod(multiplicacion);
    setA(multiplicacion.a);
    setB(multiplicacion.b);
  }
  
  const modificarMult = async ()=>{
    const response = await fetch(`http://localhost:3000/multiplicaciones/${multMod.id}`,{
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ a, b })
    })
    if (response.ok){
      const { multiplicacion } = await response.json()
      setMultiplicaciones(multiplicaciones.map((s)=>s.id == multiplicacion.id ? multiplicacion : s))
      setA(0)
      setB(0)
      setMultMod(null)
    }
  }

  return (
    <> 
    <h2 style={{textAlign: "center"}}>Multiplicación</h2>
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexDirection: 'column'}}> 
      <div>
        <label htmlFor="a">Primer Numero: </label>
        <input type="number" id="a" value={a} onChange={(e)=>setA(parseFloat(e.target.value))}/>
      </div>
      <div>
        <label htmlFor="b">Segundo Número: </label>
        <input type="number" id="b" value={b} onChange={(e)=>setB(parseFloat(e.target.value))}/>
      </div>

      {multMod === null && <button type='submit'>Agregar</button>}
    </form>
    {multMod !== null && (
      <>
      <button onClick={modificarMult}>Modificar</button>
      <button onClick={()=>{
        setMultMod(null)
        setA(0)
        setB(0)
      }}>Cancelar</button>
      </>
    )}
    <ul>
      {multiplicaciones.map((multiplicacion)=>(
      <li key={multiplicacion.id}>
        {`Multiplicación Nº${multiplicacion.id}: ${multiplicacion.a} X ${multiplicacion.b} = ${multiplicacion.resultado}`}
        <button onClick={()=>quitarMult(multiplicacion.id)} disabled={multMod!==null}>X</button>
        <button onClick={()=>selecMult(multiplicacion)} disabled={multMod!==null}>E</button>
      </li>
    ))}
    </ul>
    <a href="/">Volver</a>
    </>
  )
}
export default Multiplicaciones;