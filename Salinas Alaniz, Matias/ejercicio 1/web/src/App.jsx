import { useState } from 'react'
import './App.css'

function App() {
  const [a,setA] = useState(0)
  const [b,setB] = useState(0)
  const [numeroDisplay, setNumeroDisplay] = useState("")
  const [operador,setOperador] = useState('+')
  const [selectorNumero,setSelectorNumero] = useState('A')

  const seleccionarNumero = (numero) =>{

    if (selectorNumero == 'B'){
      setNumeroDisplay(numeroDisplay + String(numero))
      setB(parseFloat(numeroDisplay + String(numero)))
    }else{
      setNumeroDisplay(numeroDisplay + String(numero))
    }
  }

  const seleccionarOperador = (operador) =>{
    if (selectorNumero == 'A'){
      setA(parseFloat(numeroDisplay))
      setOperador(operador)
      setSelectorNumero('B')
      setNumeroDisplay('')
    }else{
      setOperador(operador)
      setNumeroDisplay("")
      setB(0)
    }
  }
  const agregarDecimal = () => {
    if ( !(numeroDisplay.includes("."))){
      setNumeroDisplay(numeroDisplay + ".")
    }
  }
  const borrar = ()=>{
    if (selectorNumero == 'A'){
      setA(0)
      setNumeroDisplay('')
    }else{
      setB(0)
      setNumeroDisplay('')
    }
  }

  const borrarTodo = () =>{
    setA(0)
    setB(0)
    setNumeroDisplay('')
    setSelectorNumero('A')
  }

  const obtenerResultados =async () =>{
    let url = 'http://localhost:3000'
    let peticion = {
      method: 'POST',
      headers: {'Content-Type':"application/json"},
      body: JSON.stringify({a,b})
    }
    if (selectorNumero == 'B' && numeroDisplay.length > 0){
      console.log('entre')
      switch(operador){
        case '/':
            if (b == 0){
              setNumeroDisplay('Error division por 0')
              break;
            }
            url += '/divisiones/'
          break;
        case '*':
          url += '/multiplicaciones/'
          break;
        case '-':
            url += '/restas/'
          break;
        case '+':
          url += '/sumas/'
          break;
        default:
          break;
      }
    }
    const response = await fetch(url,peticion)
    if (response.ok) {
      const { data }= await response.json()
      setNumeroDisplay(data.resultado)
    }
  }
  return (
    <>
     <div className="calculadoraDiv">
      <div className="display">
        <div className="indicadorNum">
          Ingrese {selectorNumero}
        </div>
        <div className="displayTexto">
          {numeroDisplay}
        </div>
      </div>
      <div className="numeros">
        <div className="fila">
          <button className="num" onClick={()=>borrarTodo()}>CE</button>
          <button className="num" onClick={()=>borrar()}>C</button>
          <button className="num">?</button>
          <button className="operador" onClick={()=>seleccionarOperador("/")}>/</button>
          
        </div>
        <div className="fila">
          <button className="num" onClick={()=> seleccionarNumero(7)}>7</button>
          <button className="num" onClick={()=> seleccionarNumero(8)}>8</button>
          <button className="num" onClick={()=> seleccionarNumero(9)}>9</button>
          <button className="operador" onClick={()=>seleccionarOperador("*")}>X</button>
        </div>

        <div className="fila">
          <button className="num" onClick={()=> seleccionarNumero(4)}>4</button>
          <button className="num" onClick={()=> seleccionarNumero(5)}>5</button>
          <button className="num" onClick={()=> seleccionarNumero(6)}>6</button>
          <button className="operador" onClick={()=>seleccionarOperador("-")}>-</button>
        </div>
        <div className="fila">
          <button className="num" onClick={()=> seleccionarNumero(1)}>1</button>
          <button className="num" onClick={()=> seleccionarNumero(2)}>2</button>
          <button className="num" onClick={()=> seleccionarNumero(3)}>3</button>
          <button className="operador" onClick={()=>seleccionarOperador("+")} id='division'>+</button>
        </div>
        <div className="fila">
          <button className="num">H</button>
          <button className="num" onClick={()=> seleccionarNumero(0)}>0</button>
          <button className="num" onClick={()=>agregarDecimal()}>.</button>
          <button className="operador" onClick={()=>obtenerResultados()}>=</button>

        </div>
      </div>
     </div>
    </>
  )
}

export default App
