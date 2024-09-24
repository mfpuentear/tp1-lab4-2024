import { useState, useEffect } from 'react'

function Restas() {
  const [restas, setRestas] = useState([]);
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [restaMod, setRestaMod] = useState(null)

  const getRestas = async ()=>{
    const response = await fetch("http://localhost:3000/restas");
    if(response.ok){
      const { restas } = await response.json()
      console.log(restas)
      setRestas(restas)
    }
  }

  useEffect(()=>{
    getRestas()
  },[])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/restas",{
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ a, b })
    })
    if (response.ok){
      console.log("Suma agregada")
      getRestas()
    }
  }
  const quitarResta = async (id)=> {
    if(confirm(`¿Desea quitar la resta ${id}?`)){
      const response = await fetch(`http://localhost:3000/restas/${id}`,{
        method: "DELETE"
      })
      if(response.ok){
        console.log("Resta eliminada")
        getRestas()
      }
    }
  }

  const selecResta = async (resta)=>{
    setRestaMod(resta);
    setA(resta.a);
    setB(resta.b);
  }
  
  const modificarResta = async ()=>{
    const response = await fetch(`http://localhost:3000/restas/${restaMod.id}`,{
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ a, b })
    })
    if (response.ok){
      const { resta } = await response.json()
      setRestas(restas.map((s)=>s.id == resta.id ? resta : s))
      setA(0)
      setB(0)
      setRestaMod(null)
    }
  }

  return (
    <> 
    <h2>Resta</h2>
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexDirection: 'column'}}> 
      <div>
        <label htmlFor="a">Primer Numero: </label>
        <input type="number" id="a" value={a} onChange={(e)=>setA(parseFloat(e.target.value))}/>
      </div>
      <div>
        <label htmlFor="b">Segundo Número: </label>
        <input type="number" id="b" value={b} onChange={(e)=>setB(parseFloat(e.target.value))}/>
      </div>

      {restaMod === null && <button type='submit'>Agregar</button>}
    </form>
    {restaMod !== null && (
      <>
      <button onClick={modificarResta}>Modificar</button>
      <button onClick={()=>{
        setRestaMod(null)
        setA(0)
        setB(0)
      }}>Cancelar</button>
      </>
    )}
    <ul>
      {restas.map((resta)=>(
      <li key={resta.id}>
        {`Resta Nº${resta.id}: ${resta.a} - ${resta.b} = ${resta.resultado}`}
        <button onClick={()=>quitarResta(resta.id)} disabled={restaMod!==null}>X</button>
        <button onClick={()=>selecResta(resta)} disabled={restaMod!==null}>E</button>
      </li>
    ))}
    </ul>
    <a href="/">Volver</a>
    </>
  )
}
export default Restas;