import { useState } from 'react'

function Uno() {
  const [data, setData] = useState({
    num1: 3,
    num2: 5
  })

  const [resultado, setResultado] = useState(null)

  const hacerOperacion = (e) => {
    fetch('http://localhost:5300/ejer1', {
      method: "POST",
      body: JSON.stringify({
        num1: Number(data.num1),
        num2: Number(data.num2),
        operacion: e.target.id
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(data => data.json())
      .then(res => setResultado(res.resultado))
  }

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    })
  }

  return (
    <div className='ejer1'>
      <input type="number" onChange={handleInputChange} id='num1' />
      <input type="number" onChange={handleInputChange} id='num2' />
      <button onClick={hacerOperacion} id='sumar'>Sumar</button>
      <button onClick={hacerOperacion} id='restar'>Restar</button>
      <button onClick={hacerOperacion} id='multiplicar'>Multiplicar</button>
      <button onClick={hacerOperacion} id='dividir'>Dividir</button>
      {
        resultado != null && <p>Resultado: {resultado}</p>
      }
    </div>
  )
}

export default Uno
