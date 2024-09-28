import { useEffect, useState } from "react"

function App() {
  const [datos, setDatos] = useState({
    largo: 0,
    ancho: 0
  })
  const [historial, setHistorial] = useState([])
  const [Modificar, setModificar] = useState(-1)


  const handleCalcular = () => {
    fetch("http://localhost:5300/ejer2", {
      method: "POST",
      body: JSON.stringify({
        "largo": Number(datos.largo),
        "ancho": Number(datos.ancho)
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(() => obtenerHistorial())
  }
  useEffect(() => {
    obtenerHistorial()
  }, [])

  const obtenerHistorial = () => {
    fetch("http://localhost:5300/ejer2/calculos")
      .then(data => data.json())
      .then(res => setHistorial(res))
  }

  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: e.target.value
    })
  }

  const handleModify = (index) => {
    setRecAModificar({
      id: index,
      ...historial[index]
    })
  }

  const handleInputModifyChange = (e) => {
    setModificar({
      ...Modificar,
      [e.target.id]: e.target.value
    })

  }
  const submitModify = (rec) => {
    fetch(`http://localhost:5300/ejer2/calculos/${rec.id}`, {
      method: "PUT",
      body: JSON.stringify({
        largo: Number(rec.largo),
        ancho: Number(rec.ancho)
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(data => data.json())
      .then(res => setHistorial(res))
      .then(setModificar(-1))
  }

  const handleDelete = (index) => {
    fetch(`http://localhost:5300/ejer2/calculos/${index}`, { method: 'DELETE' })
      .then(alert('Documento eliminado con exito'))
      .then(window.location.reload())
  }

  return (
    <div className="ejer2">
      <p>Ingrese largo: </p>
      <input type="number" onChange={handleInputChange} id="largo" />
      <p>Ingrese ancho:</p>
      <input type="number" onChange={handleInputChange} id="ancho" />
      <button onClick={handleCalcular}>Calcular</button>
      {
        historial.length > 0 &&
        <div className="rectangulos-container">
          {
            historial.map((rectangulo, index) => (
              <div key={index}>
                <p>Rectangulo {index + 1}:</p>
                <ul>
                  <li>Largo: {rectangulo.largo}</li>
                  <li>Ancho: {rectangulo.ancho}</li>
                  <li>Perimetro: {rectangulo.perimetro}</li>
                  <li>Superficie: {rectangulo.superficie}</li>
                </ul>
                <button onClick={() => { handleModify(index) }}>Modificar Rectangulo</button>
                <button onClick={() => { handleDelete(index) }}>Eliminar Rectangulo</button>
              </div>
            ))
          }
        </div>
      }

      {
        Modificar != -1 &&
        <div >
          <div >
            <div onClick={() => setRecAModificar(-1)}>X</div>
            <p>Modificar Rectangulo:</p>
            <label htmlFor="largo">Largo:</label>
            <input type="number" id="largo" value={Modificar.largo} onChange={handleInputModifyChange} />
            <label htmlFor="largo">Ancho:</label>
            <input type="number" id="ancho" value={Modificar.ancho} onChange={handleInputModifyChange} />
            <button onClick={() => submitModify(Modificar)}>Modificar</button>
          </div>
        </div>
      }
    </div>
  )
}

export default App