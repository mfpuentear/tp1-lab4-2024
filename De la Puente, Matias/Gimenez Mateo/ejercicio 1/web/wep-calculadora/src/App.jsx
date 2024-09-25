import { useState, useEffect } from 'react';

function App() {
  const [listaResultados, setListaResultados] = useState([]);
  const [A, setA] = useState();
  const [B, setB] = useState();

  const ApiSumar = async () => {
    const res = await fetch("http://localhost:3000/sumas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ A, B }),
    });

    if (res.ok) {
      const suma = await res.json();
      setListaResultados((prevResultados) => [...prevResultados, { ...suma, operacion: "+" }]);
      setA('');
      setB('');
    } else {
      console.error("Error al sumar");
    }
  };

  const ApiRestar = async () => {
    const res = await fetch("http://localhost:3000/restas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ A, B }),
    });

    if (res.ok) {
      const resta = await res.json();
      setListaResultados((prevResultados) => [...prevResultados, { ...resta, operacion: "-" }]);
      setA('');
      setB('');
    } else {
      console.error("Error al restar");
    }
  };

  const ApiMultiplicar = async () => {
    const res = await fetch("http://localhost:3000/multiplicacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ A, B }),
    });

    if (res.ok) {
      const multiplicacion = await res.json();
      setListaResultados((prevResultados) => [...prevResultados, { ...multiplicacion, operacion: "*" }]);
      setA('');
      setB('');
    } else {
      console.error("Error al multiplicar");
    }
  };

  const ApiDividir = async () => {
    const res = await fetch("http://localhost:3000/divisiones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ A, B }),
    });

    if (res.ok) {
      const dividir = await res.json();
      setListaResultados((prevResultados) => [...prevResultados, { ...dividir , operacion: "/" }]);
      setA('');
      setB('');
    } else {
      console.error("Error al dividir");
    }
  };



  return (
    <>
      <body>
        <div>
          <h1>Calculadora con API</h1>
            <input
              type="number"
              placeholder="Ingrese el valor de A"
              value={A}
              onChange={(e) => setA(parseFloat(e.target.value))}
            />

            <input
              type="number"
              placeholder="Ingrese el valor de B"
              value={B}
              onChange={(e) => setB(parseFloat(e.target.value))}
            />

            <button onClick={ApiSumar}>Sumar</button>
            <button onClick={ApiRestar}>Restar</button>
            <button onClick={ApiMultiplicar}>Multiplicar</button>
            <button onClick={ApiDividir}>Dividir</button>

            <ul>
              {listaResultados.map((numero, index) => (
                <li key={index}>
                  {`Número A: ${numero.A} ${numero.operacion} Número B: ${numero.B} = ${numero.Resultado}`}
                </li>
              ))}
            </ul>  
        </div>
      </body>

    </>
  );
}

export default App;
