import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [base, setBase] = useState(0);
  const [altura, setAltura] = useState(0);
  const [rectangulos, setRectangulos] = useState([]);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const fetchRectangulos = async () => {
    const response = await fetch(
      "http://localhost:3000/rectangulos/listaRectangulos"
    );
    if (response.ok) {
      const data = await response.json();
      setRectangulos(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tipoRectangulo = base === altura ? "Cuadrado" : "Rectángulo";

    const response = await fetch(
      "http://localhost:3000/rectangulos/listaRectangulos",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base, altura, tipo: tipoRectangulo }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setRectangulos([...rectangulos, data.rectangulo]);
      setBase(0);
      setAltura(0);
    }
  };

  const quitarRectangulo = async (id) => {
    if (confirm("¿Desea quitar el rectángulo?")) {
      const response = await fetch(
        `http://localhost:3000/rectangulos/listaRectangulos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRectangulos(
          rectangulos.filter((rectangulo) => rectangulo.id !== id)
        );
      }
    }
  };

  const activarModoEdicion = (id, base, altura) => {
    setModoEdicion(true);
    setIdEditar(id);
    setBase(base);
    setAltura(altura);
  };

  const modificarOperacion = async (id) => {
    setIdEditar(id);

    const tipoRectangulo = base === altura ? "Cuadrado" : "Rectángulo";

    const response = await fetch(
      `http://localhost:3000/rectangulos/listaRectangulos/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base, altura, tipo: tipoRectangulo }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data.rectangulo) {
        setRectangulos(
          rectangulos.map((rectangulo) =>
            rectangulo.id === id ? data.rectangulo : rectangulo
          )
        );
      }

      setBase(0);
      setAltura(0);
      setModoEdicion(false);
      setIdEditar(null);
    }
  };

  useEffect(() => {
    fetchRectangulos();
  }, []);

  return (
    <>
      <div className="App-container">
        <form onSubmit={handleSubmit} className="card">
          <span>Base</span>
          <input
            type="number"
            id="base"
            value={base}
            onChange={(event) => setBase(parseFloat(event.target.value))}
          />

          <span>Altura</span>
          <input
            type="number"
            id="altura"
            value={altura}
            onChange={(event) => setAltura(parseFloat(event.target.value))}
          />

          <div className="botones">
            <button type="submit" disabled={modoEdicion}>
              Enviar
            </button>
            <button
              type="button"
              onClick={() => modificarOperacion(idEditar)}
              disabled={!modoEdicion}
            >
              Modificar
            </button>
          </div>
        </form>

        <div className="listas-container">
          <div className="lista card">
            <span>Lista:</span>
            <ul>
              {rectangulos.map((rectangulo) => (
                <li key={rectangulo.id}>
                  <span>Base: {rectangulo.base}, altura: {rectangulo.altura}</span>
                  <button
                    onClick={() =>
                      activarModoEdicion(
                        rectangulo.id,
                        rectangulo.base,
                        rectangulo.altura
                      )
                    }
                  >
                    ✏️
                  </button>
                  <button onClick={() => quitarRectangulo(rectangulo.id)}>
                    ❌
                  </button>
                  <br />
                  <span>Perímetro: {rectangulo.perimetro}, superficie:{" "}
                  {rectangulo.superficie}
                   <br />
                  {rectangulo.tipo === "Cuadrado" && (
                    <>
                    <span>Tipo: {rectangulo.tipo}</span>
                    </>
                  )}
                  {rectangulo.tipo === "Rectángulo" && (
                    <>
                    <span>Tipo: {rectangulo.tipo}</span>
                    </>
                  )}
                  </span>
                  
                  <br />
                  <br />
                  <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
