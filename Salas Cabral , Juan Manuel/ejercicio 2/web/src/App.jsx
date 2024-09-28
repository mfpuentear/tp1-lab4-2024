import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [base, setBase] = useState(0)
  const [altura, setAltura] = useState(0)
  const [calculos, setCalculos] = useState([])
  const [editar, setEditar] = useState(null)

  useEffect(() => {
    const fetchCalculos = async () => {
      const res = await fetch("http://localhost:3000/api/calculos")
      if (res.ok) {
        const calculito = await res.json()
        console.log(calculito)
        setCalculos(calculito)
      }}
    fetchCalculos()
  }, [])

  const agregarCalculo = async () => {
    const res = await fetch("http://localhost:3000/api/calculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base,
        altura,
      }),
    })

    if (res.ok) {
      const calc = await res.json()
      setCalculos([...calculos, calc])
      limpiar()
    }
  }

  const editarlo = (calc) => {
    setEditar(calc)
    setBase(calc.base)
    setAltura(calc.altura)
  }

  const guardarlos = async () => {
    const res = await fetch(`http://localhost:3000/api/calculos/${editar.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base,
        altura,
      }),
    })

    if (res.ok) {
      const calc = await res.json()
      setCalculos(calculos.map((c) => c.id === calc.id ? calc : c))
      limpiar()
    }
  }

  const eliminarlo = async (id) => {
    const res = await fetch(`http://localhost:3000/api/calculos/${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      setCalculos(calculos.filter((c) => c.id !== id))
    }
  }

  const limpiar = () => {setBase(0),setAltura(0),setEditar(null)}

  return (
    <>
      <form action="">
        <div>
          <label htmlFor="base">Base: </label>
          <input value={base} type="number" step={0.1} onChange={(e) => setBase(parseFloat(e.target.value))}/>
        </div>
        <div>
          <label htmlFor="altura">Altura: </label>
          <input value={altura} type="number" step={0.1} onChange={(e) => setAltura(parseFloat(e.target.value))}/>
        </div>
          {!editar && (<button type="button" onClick={agregarCalculo}>Agregar</button>)}
          {editar && (<button type="button" onClick={guardarlos}>Guardar</button>)}
        <button type="button" onClick={limpiar}>Cancelar</button>
      </form>
      <h6>Historial</h6>
      <ul>
        {calculos.map((c) => (
          <li key={c.id}>
            {c.id} Base: {c.base} - Altura: {c.altura} - Perimetro:{" "}
            {c.perimetro} - Area: {c.area} - Tipo:{" "}
            {c.base === c.altura ? "Cuadrado" : "Rectangulo"} -{" "}
            <button onClick={() => editarlo(c)}>Editar</button>
            <button onClick={() => eliminarlo(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
