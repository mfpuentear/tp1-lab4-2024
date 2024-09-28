import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [base, setBase] = useState(0)
  const [altura, setAltura] = useState(0)
  const [calculos, setCalculos] = useState([])
  const [editandoCalculo, setEditandoCalculo] = useState(null)

  useEffect(() => {
    const fetchCalculos = async () => {
      const res = await fetch("http://localhost:3000/api/rectangulos")

      if (res.ok) {
        const calcs = await res.json()
        console.log(calcs)
        setCalculos(calcs)
      }
    }

    fetchCalculos()
  }, [])

  const agregarCalculo = async () => {
    const res = await fetch("http://localhost:3000/api/rectangulos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base: parseFloat(base),
        altura: parseFloat(altura),
      }),
    })

    if (res.ok) {
      const calc = await res.json()
      setCalculos([...calculos, calc])
      limpiar()
    }
  }

  const editarCalculo = (calc) => {
    setEditandoCalculo(calc)
    setBase(calc.base)
    setAltura(calc.altura)
  }

  const guardarCalculo = async () => {
    const res = await fetch(`http://localhost:3000/api/rectangulos/${editandoCalculo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base: parseFloat(base),
        altura: parseFloat(altura),
      }),
    })

    if (res.ok) {
      const calc = await res.json()
      setCalculos(calculos.map((c) => c.id === calc.id ? calc : c))
      limpiar()
    }
  }

  const eliminarCalculo = async (id) => {
    const res = await fetch(`http://localhost:3000/api/rectangulos/${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      setCalculos(calculos.filter((c) => c.id !== id))
    }
  }

  const limpiar = () => {
    setBase(0)
    setAltura(0)
    setEditandoCalculo(null)
  }

  return (
    <>
      <form action="">
        <div>
          <label htmlFor="base">Base: </label>
          <input
            value={base}
            type="number"
            step={0.1}
            onChange={(e) => setBase(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="altura">Altura: </label>
          <input
            value={altura}
            type="number"
            step={0.1}
            onChange={(e) => setAltura(e.target.value)}
          />
        </div>
        {!editandoCalculo && (
          <button type="button" onClick={agregarCalculo}>
            Agregar calculo
          </button>
        )}
        {editandoCalculo && (
          <button type="button" onClick={guardarCalculo}>
            Guardar calculo
          </button>
        )}
        <button type="button" onClick={limpiar}>Cancelar</button>
      </form>

      <h6>Historial de calculos</h6>
      <ul>
        {calculos.map((c) => (
          <li key={c.id}>
            {c.id}) Base: {c.base} - Altura: {c.altura} - Perimetro:{" "}
            {c.perimetro} - Area: {c.area} - Tipo:{" "}
            {c.base === c.altura ? "Cuadrado" : "Rectangulo"} -{" "}
            <button onClick={() => editarCalculo(c)}>Editar</button>
            <button onClick={() => eliminarCalculo(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App