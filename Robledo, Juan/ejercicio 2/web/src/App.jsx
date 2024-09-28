import { useEffect, useState } from "react";

function App() {
  const [calculos, setCalculos] = useState([]);
  const [calcId, setCalcId] = useState(0);
  const [ladoA, setLadoA] = useState(0);
  const [ladoB, setLadoB] = useState(0);

  const URL = "http://localhost:3000/calculos/";
  console.log(URL);

  const getCalculos = async () => {
    const response = await fetch(URL);
    if (response.ok) {
      const { data } = await response.json();
      setCalculos(data);
    }
  };

  useEffect(() => {
    getCalculos();
  }, []);

  // ------------------------------------------------

  const modificarCalculo = (calc) => {
    setCalcId(calc.id);
    setLadoA(calc.ladoA);
    setLadoB(calc.ladoB);
  };

  const modificarCalcApi = async () => {
    const response = await fetch(`${URL}${calcId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ladoA, ladoB }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setCalculos(calculos.map((c) => (c.id == data.id ? data : c)));
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  const quitarCalculo = async (id) => {
    if (confirm("¿Desea quitar este elemento?")) {
      const response = await fetch(`${URL}${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCalculos(calculos.filter((c) => c.id !== id));
      }
    }
  };

  //--------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ladoA, ladoB }),
    });
    if (response.ok) {
      const { data } = await response.json();
      setCalculos([...calculos, data]);
      setLadoA(0);
      setLadoB(0);
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">Lado A</label>
          <input
            type="number"
            min="0"
            step="0.1"
            id="a"
            value={ladoA}
            style={{ marginBottom: 10, marginLeft: 5 }}
            onChange={(e) => setLadoA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">Lado B</label>
          <input
            type="number"
            min="0"
            step="0.1"
            id="b"
            value={ladoB}
            style={{ marginBottom: 10, marginLeft: 5 }}
            onChange={(e) => setLadoB(parseFloat(e.target.value))}
          />
        </div>
        {calcId === 0 && <button type="submit">Agregar</button>}
        {calcId !== 0 && (
          <>
            <button
              onClick={modificarCalcApi}
              type="button"
              style={{ marginRight: 5 }}
            >
              Modificar
            </button>
            <button
              onClick={() => {
                setCalcId(0);
                setLadoA(0);
                setLadoB(0);
              }}
            >
              Cancelar
            </button>
          </>
        )}
      </form>
      <ul style={{ listStyle: "none" }}>
        {calculos.map((calculo, index) => (
          <li key={calculo.id} style={{ display: "flex" }}>
            <span>{index + 1 + ")"}</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 10,
                marginLeft: 10,
              }}
            >
              <span>
                <b>
                  {calculo.ladoA}x{calculo.ladoB}
                </b>
              </span>
              <span>
                <b>Perímetro:</b> {calculo.perimetro.toFixed(2)}
              </span>
              <span>
                <b>Superficie:</b> {calculo.superficie.toFixed(2)}
              </span>
              <span style={{ color: "#228B22" }}>
                <b>
                  {calculo.ladoA === calculo.ladoB
                    ? "Es un cuadrado"
                    : "Es un rectángulo"}
                </b>
              </span>
              <div>
                <button
                  onClick={() => modificarCalculo(calculo)}
                  disabled={calcId !== 0}
                  style={{ marginRight: 5 }}
                >
                  E
                </button>
                <button
                  onClick={() => quitarCalculo(calculo.id)}
                  disabled={calcId !== 0}
                >
                  X
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
