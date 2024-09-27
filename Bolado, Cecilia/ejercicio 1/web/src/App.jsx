import { useState, useEffect } from "react";

function App() {
  const [listaResultados, setListaResultados] = useState([]);
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [listaSuma, setListaSuma] = useState();
  const [listaResta, setListaResta] = useState();
  const [listaMultiplicacion, setListaMultiplicacion] = useState();
  const [listaDivsion, setListaDivision] = useState();

  useEffect(() => {
    const fetchCalculadora = async () => {
      const response = await fetch("http://localhost:3000/suma");
      if (response.ok) {
        const data = await response.json();
        setListaResultados(data);
      }
    }
    fetchCalculadora();
  }, []);

  const ApiSumar = async () => {
    const res = await fetch("http://localhost:3000/suma", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });

    if (res.ok) {
      const suma = await res.json();
      setListaResultados((prevResultados) => [
        ...prevResultados,
        { ...suma, operacion: "+" },
      ]);
      setA("");
      setB("");
    } else {
      console.error("Error al sumar");
    }
  };

  const ApiRestar = async () => {
    const res = await fetch("http://localhost:3000/resta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });

    if (res.ok) {
      const resta = await res.json();
      setListaResultados((prevResultados) => [
        ...prevResultados,
        { ...resta, operacion: "-" },
      ]);
      setA("");
      setB("");
    } else {
      console.error("Error al restar");
    }
  };

  const ApiMultiplicar = async () => {
    const res = await fetch("http://localhost:3000/multiplicacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });

    if (res.ok) {
      const multiplicacion = await res.json();
      setListaResultados((prevResultados) => [
        ...prevResultados,
        { ...multiplicacion, operacion: "*" },
      ]);
      setA("");
      setB("");
    } else {
      console.error("Error al multiplicar");
    }
  };

  const ApiDividir = async () => {
    const res = await fetch("http://localhost:3000/division", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });

    if (res.ok) {
      const dividir = await res.json();
      setListaResultados((prevResultados) => [
        ...prevResultados,
        { ...dividir, operacion: "/" },
      ]);
      setA("");
      setB("");
    } else {
      console.error("Error al dividir");
    }
  };

  return (
    <>
        <div>
          <h1>Calculadora con API</h1>
          <input
            type="number"
            placeholder="Ingrese el valor de A"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />

          <input
            type="number"
            placeholder="Ingrese el valor de B"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />

          <button onClick={ApiSumar}>Sumar</button>
          <button onClick={ApiRestar}>Restar</button>
          <button onClick={ApiMultiplicar}>Multiplicar</button>
          <button onClick={ApiDividir}>Dividir</button>

          <ul>
            {listaSuma.map((numero, index) => (
              <li key={index}>
                {`Número A: ${numero.a} + Número B: ${numero.b} = ${numero.resultado}`}
              </li>
            ))}
          </ul>
          <ul>
            {listaResta.map((numero, index) => (
              <li key={index}>
                {`Número A: ${numero.a} + Número B: ${numero.b} = ${numero.resultado}`}
              </li>
            ))}
          </ul>
          <ul>
            {listaMultiplicacion.map((numero, index) => (
              <li key={index}>
                {`Número A: ${numero.a} + Número B: ${numero.b} = ${numero.resultado}`}
              </li>
            ))}
          </ul>
          <ul>
            {listaDivsion.map((numero, index) => (
              <li key={index}>
                {`Número A: ${numero.a} + Número B: ${numero.b} = ${numero.resultado}`}
              </li>
            ))}
          </ul>
        </div>
    </>
  );
}

export default App;
