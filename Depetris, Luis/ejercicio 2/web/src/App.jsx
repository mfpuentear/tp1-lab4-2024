import { useEffect, useState } from "react"

function App() {
  const [base, setBase] = useState(0)
  const [altura, setAltura] = useState(0)
  const [calculos, setCalculos] = useState([])
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    const fetchCalculos = async () => {
      const res = await fetch("http://localhost:3000/calculos")

      if (res.ok) {
        const calcs = await res.json()
        console.log(calcs)
        setCalculos(calcs)
      }
    }

    fetchCalculos()
  }, [])

  const agregar = async () => {
    const res = await fetch("http://localhost:3000/calculos", {
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

  const editar = (calc) => {
    setEditando(calc)
    setBase(calc.base)
    setAltura(calc.altura)
  }

  const guardar = async () => {
    const res = await fetch(
      `http://localhost:3000/calculos/${editando.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base,
          altura,
        }),
      }
    )

    if (res.ok) {
      const calc = await res.json()
      setCalculos(calculos.map((c) => c.id === calc.id ? calc : c))
      limpiar()
    }
  }

  const eliminar = async (id) => {
    const res = await fetch(`http://localhost:3000/calculos/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      setCalculos(calculos.filter((c) => c.id !== id))
    }

    limpiar()
  }

  const limpiar = () => {
    setBase(0)
    setAltura(0)
    setEditando(null)
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
            onChange={(e) => setBase(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="altura">Altura: </label>
          <input
            value={altura}
            type="number"
            step={0.1}
            onChange={(e) => setAltura(parseFloat(e.target.value))}
          />
        </div>
        {!editando && (
          <button type="button" onClick={agregar}>
            Agregar calculo
          </button>
        )}
        {editando && (
          <button type="button" onClick={guardar}>
            Guardar calculo
          </button>
        )}
        <button type="button" onClick={limpiar}>
          Cancelar
        </button>
      </form>

      <h6>Calculos</h6>
      <ul>
        {calculos.map((c) => (
          <li key={c.id}>
            {c.id}) Base: {c.base} - Altura: {c.altura} - Perimetro:{" "}
            {c.perimetro} - Area: {c.area} - Tipo:{" "}
            {c.base === c.altura ? "Cuadrado" : "Rectangulo"} -{" "}
            <button onClick={() => editar(c)}>Editar</button>
            <button onClick={() => eliminar(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
