import { useState } from 'react'
import './App.css'

function App() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  const [historialVisible,setHistorialVisible]= useState(false)

  const [numeroDisplay, setNumeroDisplay] = useState("")
  const [operador, setOperador] = useState('+')
  const [selectorNumero, setSelectorNumero] = useState('A')

  const [sumas, setSumas] = useState([{ id: 1, a: 2, b: 5, resultado: 7 }])
  const [restas, setRestas] = useState([{ id: 1, a: 2, b: 5, resultado: 7 }])

  const [multiplicaciones, setMultiplicaciones] = useState([{ id: 1, a: 2, b: 5, resultado: 7 }])
  const [divisiones, setDivisiones] = useState([{ id: 1, a: 2, b: 5, resultado: 7 }])

  const seleccionarNumero = (numero) => {

    if (selectorNumero == 'B') {
      setNumeroDisplay(numeroDisplay + String(numero))
      setB(parseFloat(numeroDisplay + String(numero)))
    } else {
      setNumeroDisplay(numeroDisplay + String(numero))
    }
  }

  const seleccionarOperador = (operador) => {
    if (selectorNumero == 'A') {
      if(parseFloat(numeroDisplay) > 0){
        setA(parseFloat(numeroDisplay))
        setOperador(operador)
        setSelectorNumero('B')
        setNumeroDisplay('')
      }
    } else {
      setOperador(operador)
      setNumeroDisplay("")
      setB(0)
    }
  }
  const agregarDecimal = () => {
    if (!(numeroDisplay.includes("."))) {
      setNumeroDisplay(numeroDisplay + ".")
    }
  }
  const borrar = () => {
    if (selectorNumero == 'A') {
      setA(0)
      setNumeroDisplay('')
    } else {
      setB(0)
      setNumeroDisplay('')
    }
  }

  const borrarTodo = () => {
    setA(0)
    setB(0)
    setNumeroDisplay('')
    setSelectorNumero('A')
  }

  const obtenerResultados = async () => {
    let url = 'http://localhost:3000'
    let peticion = {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ a, b })
    }
    if (selectorNumero == 'B' && numeroDisplay.length > 0) {
      console.log('entre')
      switch (operador) {
        case '/':
          if (b == 0) {
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

    
    const response = await fetch(url, peticion)
    if (response.ok) {
      const { data } = await response.json()
      setNumeroDisplay(data.resultado)
      setA(data.resultado)
      switch (operador) {
        case '/':
          setDivisiones([...divisiones, data])
          break;
        case '*':
          setMultiplicaciones([...multiplicaciones, data])
          break;
        case '-':
          setRestas([...restas, data])
          break;
        case '+':
          setSumas([...sumas, data])
          break;
        default:
          break;
      }

    }
  }

  const editarSuma = async (suma) => {
    if (confirm("Desea editar la suma? ")) {
      const a = parseFloat(prompt("Ingrese el nuevo valor de A", 0))
      const b = parseFloat(prompt("Ingrese el nuevo valor de B", 0))
      const response = await fetch(`http://localhost:3000/sumas/${suma.id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ a, b })
      });
      if (response.ok) {
        const getSumas = async () => {
          const response = await fetch('http://localhost:3000/sumas')
          if (response.ok) {
            const sumas = await response.json()
            setSumas(sumas.data)
          }
        }
        getSumas()
      }
    }
  }

  const editarResta = async (resta) => {
    if (confirm("Desea editar la Resta? ")) {
      const a = parseFloat(prompt("Ingrese el nuevo valor de A", 0))
      const b = parseFloat(prompt("Ingrese el nuevo valor de B", 0))



      const response = await fetch(`http://localhost:3000/restas/${resta.id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ a, b })
      });
      if (response.ok) {

        const getRestas = async () => {
          const response = await fetch('http://localhost:3000/Restas')
          if (response.ok) {
            const Restas = await response.json()
            setRestas(Restas.data)
          }
        }

        getRestas()
      }
    }
  }
  const editarMultiplicacion = async (multiplicacion) => {
    if (confirm("Desea editar la multiplicacion? ")) {
      const a = parseFloat(prompt("Ingrese el nuevo valor de A", 0))
      const b = parseFloat(prompt("Ingrese el nuevo valor de B", 0))



      const response = await fetch(`http://localhost:3000/multiplicaciones/${multiplicacion.id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ a, b })
      });
      if (response.ok) {

        const getMultiplicaciones = async () => {
          const response = await fetch('http://localhost:3000/multiplicaciones')
          if (response.ok) {
            const multiplicaciones = await response.json()
            setMultiplicaciones(multiplicaciones.data)
          }
        }

        getMultiplicaciones()
      }
    }
  }
  const editarDivision = async (division) => {
    if (confirm("Desea editar la division? ")) {
      const a = parseFloat(prompt("Ingrese el nuevo valor de A", 0))
      const b = parseFloat(prompt("Ingrese el nuevo valor de B", 1))
      if (b==0){
        alert('Error: No se puede dividir por 0')
        return
      }


      const response = await fetch(`http://localhost:3000/divisiones/${division.id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ a, b })
      });
      if (response.ok) {

        const getDivisiones = async () => {
          const response = await fetch('http://localhost:3000/divisiones')
          if (response.ok) {
            const divisiones = await response.json()
            setDivisiones(divisiones.data)
          }
        }

        getDivisiones()
      }
    }
  }

  return (
    <div className='container'>
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
            <button className="num" onClick={() => borrarTodo()}>CE</button>
            <button className="num" onClick={() => borrar()}>C</button>
            <button className="num" onClick={()=>alert(" Se puede seguir operando sobre los resultaods, \n CE para borrar la memoria e ingresar una nueva operacion,\n C borra el numero actual,\n H para mostrar el historial y acceder a la edicion.")}>?</button>
            <button className="operador" onClick={() => seleccionarOperador("/")}>/</button>

          </div>
          <div className="fila">
            <button className="num" onClick={() => seleccionarNumero(7)}>7</button>
            <button className="num" onClick={() => seleccionarNumero(8)}>8</button>
            <button className="num" onClick={() => seleccionarNumero(9)}>9</button>
            <button className="operador" onClick={() => seleccionarOperador("*")}>X</button>
          </div>

          <div className="fila">
            <button className="num" onClick={() => seleccionarNumero(4)}>4</button>
            <button className="num" onClick={() => seleccionarNumero(5)}>5</button>
            <button className="num" onClick={() => seleccionarNumero(6)}>6</button>
            <button className="operador" onClick={() => seleccionarOperador("-")}>-</button>
          </div>
          <div className="fila">
            <button className="num" onClick={() => seleccionarNumero(1)}>1</button>
            <button className="num" onClick={() => seleccionarNumero(2)}>2</button>
            <button className="num" onClick={() => seleccionarNumero(3)}>3</button>
            <button className="operador" onClick={() => seleccionarOperador("+")} id='division'>+</button>
          </div>
          <div className="fila">
            <button className="num" onClick={()=>setHistorialVisible(!(historialVisible))}>H</button>
            <button className="num" onClick={() => seleccionarNumero(0)}>0</button>
            <button className="num" onClick={() => agregarDecimal()}>.</button>
            <button className="operador" onClick={() => obtenerResultados()}>=</button>

          </div>
        </div>
      </div>

      <div className="historial" style={{width: historialVisible ? "40vw" : 0,opacity: historialVisible ? 1 : 0}}>
        <h1>HISTORIAL</h1>
        <div className="containerHistorial">
          <div className="sumas">Sumas
            {sumas.map((suma) => {
              return <div className="editable" key={suma.id}>
                ID: {suma.id}  A: {suma.a} +  B: {suma.b}  Resultado = {suma.resultado}

                <button className="editar" onClick={() => editarSuma(suma)}>Editar</button>

                <button className="elimar">Eliminar</button>
              </div>
            })}

          </div>
          <div className="restas">Restas

            {restas.map((resta) => {
              return <div className="editable" key={resta.id}>
                ID: {resta.id}  A: {resta.a} +  B: {resta.b}  Resultado = {resta.resultado}

                <button className="editar" onClick={() => editarResta(resta)}>Editar</button>

                <button className="elimar">Eliminar</button>
              </div>
            })}
          </div>
          <div className="multiplicaciones">Multiplicaciones

            {multiplicaciones.map((multiplicacion) => {
              return <div className="editable" key={multiplicacion.id}>
                ID: {multiplicacion.id}  A: {multiplicacion.a} +  B: {multiplicacion.b}  Resultado = {multiplicacion.resultado}

                <button className="editar" onClick={() => editarMultiplicacion(multiplicacion)}>Editar</button>

                <button className="elimar">Eliminar</button>
              </div>
            })}
          </div>
          <div className="divisiones">Divisiones

            {divisiones.map((division) => {
              return <div className="editable" key={division.id}>
                ID: {division.id}  A: {division.a} +  B: {division.b}  Resultado = {division.resultado}

                <button className="editar" onClick={() => editarDivision(division)}>Editar</button>

                <button className="elimar">Eliminar</button>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
