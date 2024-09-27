import { useState } from 'react';
import "./App.css";

function App() {
  const [resultadosCalculadora, setResultadosCalculadora] = useState([]);
  const [valorA, setValorA] = useState('');
  const [valorB, setValorB] = useState('');

  const apiSumar = async () => {
    const res = await fetch("http://localhost:3000/sumas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ A: valorA, B: valorB }),
    });

    if (res.ok) {
      const suma = await res.json();
      setResultadosCalculadora((prevResultados) => [...prevResultados, { ...suma, operacion: "+" }]);
      limpiarValores();
    } else {
      console.error("Error al sumar");
    }
  };

  const apiRestar = async () => {
    const res = await fetch("http://localhost:3000/restas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ A: valorA, B: valorB }),
    });

    if (res.ok) {
      const resta = await res.json();
      setResultadosCalculadora((prevResultados) => [...prevResultados, { ...resta, operacion: "-" }]);
      limpiarValores();
    } else {
      console.error("Error al restar");
    }
  };

  const apiMultiplicar = async () => {
    const res = await fetch("http://localhost:3000/multiplicacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ A: valorA, B: valorB }),
    });

    if (res.ok) {
      const multiplicacion = await res.json();
      setResultadosCalculadora((prevResultados) => [...prevResultados, { ...multiplicacion, operacion: "*" }]);
      limpiarValores();
    } else {
      console.error("Error al multiplicar");
    }
  };

  const apiDividir = async () => {
    const res = await fetch("http://localhost:3000/divisiones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ A: valorA, B: valorB }),
    });

    if (res.ok) {
      const division = await res.json();
      setResultadosCalculadora((prevResultados) => [...prevResultados, { ...division, operacion: "/" }]);
      limpiarValores();
    } else {
      console.error("Error al dividir");
    }
  };

  const limpiarValores = () => {
    setValorA('');
    setValorB('');
  };

  return (
    <>
      <div>
        <h1>Calculadora con API</h1>
        <input
          type="number"
          placeholder="Ingrese el valor de A"
          value={valorA}
          onChange={(e) => setValorA(parseFloat(e.target.value))}
        />
        <input
          type="number"
          placeholder="Ingrese el valor de B"
          value={valorB}
          onChange={(e) => setValorB(parseFloat(e.target.value))}
        />
        <button onClick={apiSumar}>Sumar</button>
        <button onClick={apiRestar}>Restar</button>
        <button onClick={apiMultiplicar}>Multiplicar</button>
        <button onClick={apiDividir}>Dividir</button>

        <ul>
          {resultadosCalculadora.map((resultado, index) => (
            <li key={index}>
              {`Número A: ${resultado.A} ${resultado.operacion} Número B: ${resultado.B} = ${resultado.Resultado}`}
            </li>
          ))}
        </ul>  
      </div>
    </>
  );
}

export default App;
