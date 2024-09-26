import { useState } from 'react'
import './App.css'

function App() {
  const [rectangulos, setRectangulos] = useState([{id:1, a:4, b:2, superficie: 8,perimetro:12}])
  const [ladoA,setLadoA] = useState(0);
  const [ladoB,setLadoB] = useState(0);
  const [rectanguloSeleccionado,setRectanguloSeleccionado] = useState()

  return (
    <div className="container">
      <div className="display">
      <form >
        <label htmlFor="ladoA">Lado A
          <input type="text" name="ladoA" id="ladoA" value={ladoA} onChange={(e)=>setLadoA(e.target.value)}/>
        </label>
        <label htmlFor="ladoB">Lado B
          <input type="text" name="ladoB" id="ladoB" value={ladoB} onChange={(e)=>setLadoB(e.target.value)}/>
        </label>
        <button type='button' className='insertar' >INSERTAR</button>
      </form>
        <div className="rectangulo" style={{width:(rectanguloSeleccionado == null) ? `${ladoB}rem` : `${rectanguloSeleccionado.b}rem`,height:(rectanguloSeleccionado == null) ? `${ladoA}rem` : `${rectanguloSeleccionado.a}rem`}}>
        <p className='ladoALabel'>Lado_A</p>
        <p className='ladoBLabel'>Lado_B</p>
        </div>
      </div>
      <div className="listadoRectangulos">
        {rectangulos.map((rectangulo)=> <div className='rectanguloInfo' key={rectangulo.id}> {`ID : ${rectangulo.id} a: ${rectangulo.a} b: ${rectangulo.b} superficie: ${rectangulo.superficie} perimetro: ${rectangulo.perimetro}`} </div>)}
      </div>
    </div>
  )
}

export default App
