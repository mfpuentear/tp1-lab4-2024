import { useState } from "react"

function App() {
  const[n1,setN1] = useState(0)
  const[n2,setN2] = useState(0)
  const[resultado,setResultado] = useState(null)

  const sumar = async ()=> {
    const res = await fetch("http://localhost:3000/api/suma",{
      method: "POST",
      headers: {"content-Type": "aplication/json"},
      body: JSON.stringify({n1,n2}),
    })

    if (res.ok){
      const suma = await res.json()
      setResultado(suma.resultado)
      setN1(0)
      setN2(0)
    }
  }

  const restar = async ()=> {
    const res = await fetch("http://localhost:3000/api/resta",{
      method: "POST",
      headers: {"content-Type": "aplication/json"},
      body: JSON.stringify({n1,n2}),
    })

    if (res.ok){
      const resta = await res.json()
      setResultado(resta.resultado)
      setN1(0)
      setN2(0)
    }
  }

  const division = async ()=> {
    const res = await fetch("http://localhost:3000/api/division",{
      method: "POST",
      headers: {"content-Type": "aplication/json"},
      body: JSON.stringify({n1,n2}),
    })

    if (res.ok){
      const division = await res.json()
      setResultado(division.resultado)
      setN1(0)
      setN2(0)
    }}

  const multiplicar = async ()=> {
    const res = await fetch("http://localhost:3000/api/multiplicacion",{
      method: "POST",
      headers: {"content-Type": "aplication/json"},
      body: JSON.stringify({n1,n2}),
    })

    if (res.ok){
      const multiplicacion = await res.json()
      setResultado(multiplicacion.resultado)
      setN1(0)
      setN2(0)
    }}
    
  return (
    <>
    <form >
      <div>
        <label htmlFor="n1">Valor Numero 1</label>
        <input type="number" value= {n1} onChange={(e)=> setN1(parseFloat(e.target.value))}/>
      </div>
      <div>
        <label htmlFor="n2">Valor Numero 2</label>
        <input type="number" value= {n2} onChange={(e)=> setN2(parseFloat(e.target.value))}/>
      </div>
      <div>
        <button type="button" onClick={sumar}>SUMA</button>
        <button type="button" onClick={restar} >RESTA</button>
        <button type="button" onClick={multiplicar} >MULTIPLICACION</button>
        <button type="button" onClick={division} >DIVISION</button>
      </div>
    </form>
    <p>Resultado: {resultado}</p>
    </>
  )
}

export default App
