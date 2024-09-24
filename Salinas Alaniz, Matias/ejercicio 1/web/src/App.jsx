import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="calculadoraDiv">
      <div className="display"></div>
      <div className="numeros">
        <div className="fila">
          <button className="operador" id='division'>/</button>
        </div>
        <div className="fila">
          <button className="num">7</button>
          <button className="num">8</button>
          <button className="num">9</button>
          <button className="operador">X</button>
        </div>

        <div className="fila">
          <button className="num">4</button>
          <button className="num">5</button>
          <button className="num">6</button>
          <button className="operador">-</button>
        </div>
        <div className="fila">
          <button className="num">1</button>
          <button className="num">2</button>
          <button className="num">3</button>
          <button className="operador">+</button>
        </div>
        <div className="fila">
          <button className="num">C</button>
          <button className="num">0</button>
          <button className="num">,</button>
          <button className="operador">=</button>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
