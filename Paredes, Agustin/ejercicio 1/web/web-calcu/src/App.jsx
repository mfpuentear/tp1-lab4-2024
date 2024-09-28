import { useState } from "react";

function App(){
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [resultado, setResultado] = useState(0)

  const sumar = async () => {
    const response = await fetch("http://localhost:3000/sumas", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ a, b})
    }
    )

    if (response.ok) {
      const suma = await response.json()
      setResultado(suma.resultado)
      setA(0)
      setB(0)
    }
  }


  const restar = async () => {
    const response = await fetch("http://localhost:3000/restas", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ a, b})
    }
    )

    if (response.ok) {
      const resta = await response.json()
      setResultado(resta.resultado)
      setA(0)
      setB(0)
      console.log(resta)
    }
  }


  const multiplicar = async () => {
    const response = await fetch("http://localhost:3000/multiplicaciones", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ a, b})
    }
    )

    if (response.ok) {
      const multiplicacion = await response.json()
      setResultado(multiplicacion.resultado)
      setA(0)
      setB(0)
      console.log(multiplicacion)
    }
  }


  const division = async () => {
    if (b===0) {
      alert("No se puede dividir por cero.")
      return
    }
    const response = await fetch("http://localhost:3000/divisiones", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ a, b})
    }
    )

    if (response.ok) {
      const dividir = await response.json()
      setResultado(dividir.resultado)
      setA(0)
      setB(0)
      console.log(dividir)
    }
  }


  return(
  <>
  <form action="">
    <div>
      <label htmlFor="a">A</label>
      <input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value))} />
    </div>

    <div>
    <label htmlFor="b">B</label>
    <input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value))} />
    </div>

    <button type="button" onClick={sumar}>SUMAR</button>
    <button type="button" onClick={restar}>RESTAR</button>
    <button type="button" onClick={multiplicar}>MULTIPLICAR</button>
    <button type="button" onClick={division}>DIVIDIR</button>
  </form>
  
  <p>RESULTADO: {resultado}</p>
  </>

  
)
}

export default App