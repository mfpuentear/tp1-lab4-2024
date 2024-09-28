import { useState, useEffect } from "react"

function App() {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [sumas, setSumas] = useState([])
  const [restas, setRestas] = useState([])
  const [multiplicaciones, setMultiplicaciones] = useState([])
  const [divisiones, setDivisiones] = useState([])
  const [resultado, setResultado] = useState(0)

  useEffect(() => {
    const fetchSumas = async () => {
      const res = await fetch("http://localhost:3000/suma")
      if (res.ok) {
        const sumas = await res.json()
        console.log(sumas)
        setSumas(sumas)
      }
    }
    fetchSumas()
  }, [])

  useEffect(() => {
    const fetchRestas = async () => {
      const res = await fetch("http://localhost:3000/resta")
      if (res.ok) {
        const restas = await res.json()
        setRestas(restas)
      }
    }
    fetchRestas()
  }, [])

  useEffect(() => {
    const fetchMultiplicaciones = async () => {
      const res = await fetch("http://localhost:3000/multiplicacion")
      if (res.ok) {
        const multiplicaciones = await res.json()
        setMultiplicaciones(multiplicaciones)
      }
    }
    fetchMultiplicaciones()
  }, [])

  useEffect(() => {
    const fetchDivisiones = async () => {
      const res = await fetch("http://localhost:3000/division")
      if (res.ok) {
        const divisiones = await res.json()
        setDivisiones(divisiones)
      }
    }
    fetchDivisiones()
  }, [])

  const sumar = async () => {
    const res = await fetch("http://localhost:3000/suma", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        num1,
        num2,
      }),
    })

    if (res.ok) {
      const nuevaSuma = await res.json()
      setResultado(nuevaSuma.resultado)

      setHistorial([...historial, nuevaSuma])
      limpiart()
    }
  }

  const restar = async () => {
    const res = await fetch("http://localhost:3000/resta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ num1, num2 }),
    })

    if (res.ok) {
      const resta = await res.json()
      setResultado(resta.resultado)
      setHistorial([
        ...historial,
        {
          id: historial.length,
          num1: num1,
          num2: num2,
          resultado: resta.resultado,
        },
      ])
      setNum1(0)
      setNum2(0)
    }
  }

  const multiplicar = async () => {
    const res = await fetch("http://localhost:3000/multiplicacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ num1, num2 }),
    })

    if (res.ok) {
      const multiplicacion = await res.json()
      setResultado(multiplicacion.resultado)
      setNum1(0)
      setNum2(0)
      console.log(multiplicacion)
    }
  }

  const dividir = async () => {
    const res = await fetch("http://localhost:3000/division", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ num1, num2 }),
    })

    if (res.ok) {
      const division = await res.json()
      setNum1(0)
      setNum2(0)
      setResultado(division.resultado)
      console.log(division)
    } else {
      const error = await res.json()
      setNum1(0)
      setNum2(0)
      setResultado(error.error)
    }
  }

  return (
    <>
      <form action="">
        <div>
          <label htmlFor="num1">N1: </label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="num2">N2: </label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(parseFloat(e.target.value))}
          />
        </div>

        <button type="button" onClick={sumar}>
          +
        </button>
        <button type="button" onClick={restar}>
          -
        </button>
        <button type="button" onClick={multiplicar}>
          x
        </button>
        <button type="button" onClick={dividir}>
          /
        </button>
      </form>

      <p>Resultado: {resultado}</p>
      <div>
        <p>Sumas</p>
        <ul>
          {sumas.map((item, index) => <li key={index}>
              {item.id}) {item.num1} + {item.num2} = {item.resultado}
            </li>
          )}
        </ul>
      </div>

      <div>
        <p>Restas</p>
        <ul>
          {restas.map((item, index) => (
            <li key={index}>
              {item.id}) {item.num1} - {item.num2} = {item.resultado}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>Multiplicaciones</p>
        <ul>
          {multiplicaciones.map((item, index) => (
            <li key={index}>
              {item.id}) {item.num1} x {item.num2} = {item.resultado}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>Divisiones</p>
        <ul>
          {divisiones.map((item, index) => (
            <li key={index}>
              {item.id}) {item.num1} / {item.num2} = {item.resultado}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
