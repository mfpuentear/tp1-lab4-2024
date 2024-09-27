import { useEffect, useState } from "react"

function App() {
  const [calculos, setCalculos] = useState([])
  const [calculoId, setCalculoId] = useState(0)
  const [base, setBase] = useState(0)
  const [altura, setAltura] = useState(0)

  const getCalculos = async () => {
    const response = await fetch("http://localhost:3000/calculos")
    if (response.ok) {
      const { calculos } = await response.json()
      setCalculos(calculos)
    }
  }

  useEffect(() => {
    getCalculos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/calculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base, altura }),
    })

    if (response.ok) {
      const { rectangulo } = await response.json()
      setCalculos([...calculos, rectangulo])
      setBase(0)
      setAltura(0)
    }
  }

  const modificarCalculo = (rectangulo) => {
    setCalculoId(rectangulo.id)
    setBase(rectangulo.base)
    setAltura(rectangulo.altura)
  }
  
  const modificarCalculoApi = async () => {
    const response = await fetch(`http://localhost:3000/calculos/${calculoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base, altura }),
    })
    if (response.ok) {
      const { rectangulo } = await response.json()
      setCalculos(calculos.map((s) => (s.id == rectangulo.id ? rectangulo : s)))
      setBase(0)
      setAltura(0)
    }
  }

  const quitarCalculo = async (id) => {
    if (confirm("¿Desea quitar el cálculo?")) {
      const response = await fetch(`http://localhost:3000/calculos/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCalculos(calculos.filter((rectangulo) => rectangulo.id !== id))
      }
    }
  }

  return (
    <>
    <h1>Calculos Ej 2 Ramirez</h1>
    <h3>cálculo para indicar si se trata de un Cuadrado o 
    Rectangulo</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="base">Base: </label>
          <input
            type="number"
            id="base"
            value={base}
            onChange={(e) => setBase(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="altura">Altura: </label>
          <input
            type="number"
            id="altura"
            value={altura}
            onChange={(e) => setAltura(parseFloat(e.target.value))}
          />
        </div>
        {calculoId === 0 && <button type="submit">Calcular</button>}
      </form>
      {calculoId !== 0 && (
        <>
          <button onClick={() => modificarCalculoApi()}>Modificar</button>
          <button
            onClick={() => {
              setCalculoId(0);
              setBase(0);
              setAltura(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {calculos.map((rectangulo) => (
          <li key={rectangulo.id}>
            {`${rectangulo.id}: Base: ${rectangulo.base}, Altura: ${rectangulo.altura} => Perímetro: ${rectangulo.perimetro}, Area: ${rectangulo.area} ${(rectangulo.base === rectangulo.altura ? "(Cuadrado █ )" : "(Rectángulo ▀)")}`}
            <button onClick={() => modificarCalculo(rectangulo)} disabled={calculoId !== 0}>
              Editar
            </button>
            <button onClick={() => quitarCalculo(rectangulo.id)} disabled={calculoId !== 0}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
