import { useState, useEffect } from 'react'

function Sumas() {
  const [sumas, setSumas] = useState([]);
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [sumaMod, setSumaMod] = useState(null)

  const getSumas = async ()=>{
    const response = await fetch("http://localhost:3000/sumas");
    if(response.ok){
      const { sumas } = await response.json()
      console.log(sumas)
      setSumas(sumas)
    }
  }

  useEffect(()=>{
    getSumas()
  },[])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/sumas",{
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ a, b })
    })
    if (response.ok){
      console.log("Suma agregada")
      getSumas()
    }
  }
  const quitarSuma = async (id)=> {
    if(confirm(`¿Desea quitar la suma ${id}?`)){
      const response = await fetch(`http://localhost:3000/sumas/${id}`,{
        method: "DELETE"
      })
      if(response.ok){
        console.log("Suma eliminada")
        getSumas()
      }
    }
  }

  const selecSuma = async (suma)=>{
    setSumaMod(suma);
    setA(suma.a);
    setB(suma.b);
  }
  
  const modificarSuma = async ()=>{
    const response = await fetch(`http://localhost:3000/sumas/${sumaMod.id}`,{
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ a, b })
    })
    if (response.ok){
      const { suma } = await response.json()
      setSumas(sumas.map((s)=>s.id == suma.id ? suma : s))
      setA(0)
      setB(0)
      setSumaMod(null)
    }
  }

  return (
    <> 
    <h2>Suma</h2>
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexDirection: 'column'}}> 
      <div>
        <label htmlFor="a">Primer Numero:</label>
        <input type="number" id="a" value={a} onChange={(e)=>setA(parseFloat(e.target.value))}/>
      </div>
      <div>
        <label htmlFor="b">Segundo Número:</label>
        <input type="number" id="b" value={b} onChange={(e)=>setB(parseFloat(e.target.value))}/>
      </div>

      {sumaMod === null && <button type='submit'>Agregar</button>}
    </form>
    {sumaMod !== null && (
      <>
      <button onClick={modificarSuma}>Modificar</button>
      <button onClick={()=>{
        setSumaMod(null)
        setA(0)
        setB(0)
      }}>Cancelar</button>
      </>
    )}
    <ul>
      {sumas.map((suma)=>(
      <li key={suma.id}>
        {`Suma Nº${suma.id}: ${suma.a} + ${suma.b} = ${suma.resultado}`}
        <button onClick={()=>quitarSuma(suma.id)} disabled={sumaMod!==null}>X</button>
        <button onClick={()=>selecSuma(suma)} disabled={sumaMod!==null}>E</button>
      </li>
    ))}
    </ul>
    <a href="/">Volver</a>
    </>
  )
}
export default Sumas;