import { useEffect } from 'react'
import { useState } from 'react'


function App() {
  const [base, setBase] = useState(0)
  const [altura, setAltura] = useState(0)
  const [calculos, setCalculos] = useState([])
  const [modificarCalculo, setModificarCalculo] = useState(null)

  useEffect(() => {
    const funcionCalcular = async () => {
      const response = await fetch("http://localhost:3000/calculos")

      if (response.ok) {
        const calculos = await response.json()
        setCalculos(calculos)
        console.log(calculos)
      }
    }

    funcionCalcular()
  }, [])

  const agregarCalculos = async () => {
    const response = await fetch("http://localhost:3000/calculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base,
        altura,
      }),
    })
    if (response.ok) {
      const cal = await response.json()
      setCalculos([...calculos, cal])
      limpiar()
    }
  }

  const editarCalculo = (cal) => {
    setModificarCalculo(cal)
    setBase(cal.base)
    setAltura(cal.altura)
  }

  const guardarCalculos = async () => {
    const response = await fetch(`http://localhost:3000/calculos/${modificarCalculo.indexx}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base,
        altura,
      }),
    })
  
    if (response.ok) {
      const cal = await response.json()
      setCalculos(calculos.map((e) => (e.indexx === cal.indexx ? cal : e)))
      limpiar()
    }
  }

  const eliminarCalculos = async (indexx) => {
    const response = await fetch(`http://localhost:3000/calculos/${indexx}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setCalculos(calculos.filter((e) => e.indexx !== indexx))
    }
  }

  const limpiar = () => {
    setBase(0)
    setAltura(0)
    setModificarCalculo(null)
  }

  return (
    <>
      <div>
        <div>
          <label htmlFor="base">BASE</label>
          <input value={base} type="number" onChange={(e) => setBase(parseFloat(e.target.value))} /> <br />

          <label htmlFor="altura">ALTURA</label>
          <input value={altura} type="number" onChange={(e) => setAltura(parseFloat(e.target.value))} /> <br />

          {!modificarCalculo && (<button type='button' onClick={agregarCalculos}>REALIZAR CÁLCULO</button>)}
          {modificarCalculo && (<button type='button' onClick={guardarCalculos}>GUARDAR</button>)}
          <button type="button" onClick={limpiar}>Cancelar</button>
        </div>

        <h3>Calculos realizados:</h3> <br /> <br />
      </div>

      <ul>
        {calculos.map((e) => (
          <li key={e.indexx}>
            {e.indexx} BASE: {e.base} - ALTURA: {e.altura} - PERIMETRO: {" "} {e.perimetro} - AREA: {e.area} - TIPO: {" "} {e.base === e.altura ? "Cuadrado" : "Rectangulo"} - {" "}

            <button onClick={() => eliminarCalculos(e.indexx)}>Eliminar</button>

            <button onClick={() => editarCalculo(e)}>Modificar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
