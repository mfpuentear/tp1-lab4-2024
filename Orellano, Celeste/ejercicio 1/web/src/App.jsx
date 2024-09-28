import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [n1, setN1] = useState(0)
  const [n2, setN2] = useState(0)
  const [resultado, setResultado] = useState(0)
  const [sumas, setSumas] = useState([])
  const [restas, setRestas] = useState([])
  const [multiplicaciones, setMultiplicaciones] = useState([])
  const [divisiones, setDivisiones] = useState([])

  useEffect(() => {
    const fetchSumas = async () => {
      const res = await fetch("http://localhost:3000/api/suma")
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
      const res = await fetch("http://localhost:3000/api/resta")
      if (res.ok) {
        const restas = await res.json()
        setRestas(restas)
      }
    }
    fetchRestas()
  }, [])

  useEffect(() => {
    const fetchMultiplicaciones = async () => {
      const res = await fetch("http://localhost:3000/api/multiplicacion")
      if (res.ok) {
        const multiplicaciones = await res.json()
        setMultiplicaciones(multiplicaciones)
      }
    }
    fetchMultiplicaciones()
  }, [])

  useEffect(() => {
    const fetchDivisiones = async () => {
      const res = await fetch("http://localhost:3000/api/division")
      if (res.ok) {
        const divisiones = await res.json()
        setDivisiones(divisiones)
      }
    }
    fetchDivisiones()
  }, [])

  const sumar = async () => {
    const res = await fetch("http://localhost:3000/api/suma", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        n1,
        n2,
      }),
    })

    if (res.ok) {
      const nuevaSuma = await res.json()
      setResultado(nuevaSuma.resultado)

      setSumas([...sumas, nuevaSuma])
      limpiar()
    }
  }

  const restar = async () => {
    const res = await fetch("http://localhost:3000/api/resta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ n1, n2 }),
    })

    if (res.ok) {
      const nuevaResta = await res.json()
      setResultado(nuevaResta.resultado)
      setRestas([...restas, nuevaResta])
      limpiar()
    }
  }

  const multiplicar = async () => {
    const res = await fetch("http://localhost:3000/api/multiplicacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ n1, n2 }),
    })

    if (res.ok) {
      const nuevaMultiplicacion = await res.json()
      setResultado(nuevaMultiplicacion.resultado)
      setMultiplicaciones([...multiplicaciones, nuevaMultiplicacion])
      limpiar()
    }
  }

  const dividir = async () => {
    const res = await fetch("http://localhost:3000/api/division", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ n1, n2 }),
    })

    if (res.ok) {
      const nuevaDivision = await res.json()
      setResultado(nuevaDivision.resultado)
      setDivisiones([...divisiones, nuevaDivision])
      limpiar()
    }
  }

  const limpiar = () => {
    setN1(0)
    setN2(0)
  }

  return (
    <>
      <form action="">
        <div>
          <label htmlFor="n1">N1: </label>
          <input
            type="number"
            value={n1}
            onChange={(e) => setN1(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="n2">N2: </label>
          <input
            type="number"
            value={n2}
            onChange={(e) => setN2(parseFloat(e.target.value))}
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
      <div className="resultados">
        <div>
          <p>Sumas</p>
          <ul>
            {sumas.map((s) => (
              <li key={s.id}>
                {s.id}) {s.n1} + {s.n2} = {s.resultado}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p>Restas</p>
          <ul>
            {restas.map((r) => (
              <li key={r.id}>
                {r.id}) {r.n1} - {r.n2} = {r.resultado}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p>Multiplicaciones</p>
          <ul>
            {multiplicaciones.map((item, index) => (
              <li key={index}>
                {item.id}) {item.n1} x {item.n2} = {item.resultado}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p>Divisiones</p>
          <ul>
            {divisiones.map((d) => (
              <li key={d.id}>
                {d.id}) {d.n1} / {d.n2} = {d.resultado}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App