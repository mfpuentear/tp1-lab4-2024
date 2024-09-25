import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [operacion, setOperacion] = useState(
    "http://localhost:3000/sumas/listaSumas"
  );

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [sumas, setSumas] = useState([]);
  const [restas, setRestas] = useState([]);
  const [multiplicaciones, setMultiplicaciones] = useState([]);
  const [divisiones, setDivisiones] = useState([]);

  const fetchSumas = async () => {
    const response = await fetch("http://localhost:3000/sumas/listaSumas");
    if (response.ok) {
      const data = await response.json();
      setSumas(data);
    }
  };

  const fetchRestas = async () => {
    const response = await fetch("http://localhost:3000/restas/listaRestas");
    if (response.ok) {
      const data = await response.json();
      setRestas(data);
    }
  };

  const fetchMultiplicaciones = async () => {
    const response = await fetch(
      "http://localhost:3000/multiplicaciones/listaMultiplicaciones"
    );
    if (response.ok) {
      const data = await response.json();
      setMultiplicaciones(data);
    }
  };

  const fetchDivisiones = async () => {
    const response = await fetch(
      "http://localhost:3000/divisiones/listaDivisiones"
    );
    if (response.ok) {
      const data = await response.json();
      setDivisiones(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(operacion, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.suma) {
        setSumas([...sumas, data.suma]);
      } else if (data.resta) {
        setRestas([...restas, data.resta]);
      } else if (data.multiplicacion) {
        setMultiplicaciones([...multiplicaciones, data.multiplicacion]);
      } else if (data.division) {
        setDivisiones([...divisiones, data.division]);
      }
      setA(0);
      setB(0);
    }
  };

  const quitarSuma = async (id) => {
    if (confirm("¿Desea quitar la suma?")) {
      const response = await fetch(
        `http://localhost:3000/sumas/listaSumas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSumas(sumas.filter((suma) => suma.id !== id));
      }
    }
  };

  const quitarResta = async (id) => {
    if (confirm("¿Desea quitar la resta?")) {
      const response = await fetch(
        `http://localhost:3000/restas/listaRestas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRestas(restas.filter((resta) => resta.id !== id));
      }
    }
  };

  const quitarMultiplicacion = async (id) => {
    if (confirm("¿Desea quitar la multiplicación?")) {
      const response = await fetch(
        `http://localhost:3000/multiplicaciones/listaMultiplicaciones/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMultiplicaciones(
          multiplicaciones.filter((multiplicacion) => multiplicacion.id !== id)
        );
      }
    }
  };

  const quitarDivision = async (id) => {
    if (confirm("¿Desea quitar la división?")) {
      const response = await fetch(
        `http://localhost:3000/divisiones/listaDivisiones/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setDivisiones(divisiones.filter((division) => division.id !== id));
      }
    }
  };

  const activarModoEdicion = (id, a, b, rutaOperacion) => {
    setModoEdicion(true);
    setIdEditar(id);
    setA(a);
    setB(b);
    setOperacion(rutaOperacion);
  };

  const modificarOperacion = async (id, rutaOperacion) => {
    setModoEdicion(true);
    setIdEditar(id);

    const response = await fetch(`${rutaOperacion}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.suma) {
        setSumas(sumas.map((suma) => (suma.id === id ? data.suma : suma)));
      } else if (data.resta) {
        setRestas(
          restas.map((resta) => (resta.id === id ? data.resta : resta))
        );
      } else if (data.multiplicacion) {
        setMultiplicaciones(
          multiplicaciones.map((multiplicacion) =>
            multiplicacion.id === id ? data.multiplicacion : multiplicacion
          )
        );
      } else if (data.division) {
        setDivisiones(
          divisiones.map((division) =>
            division.id === id ? data.division : division
          )
        );
      }

      setA(0);
      setB(0);
      setModoEdicion(false);
      setIdEditar(null);
    }
  };

  useEffect(() => {
    fetchSumas();
    fetchRestas();
    fetchMultiplicaciones();
    fetchDivisiones();
  }, []);

  return (
    <>
      <div className="App-container">
        <form onSubmit={handleSubmit} className="card ">
          <span>Operador A</span>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(event) => setA(parseFloat(event.target.value))}
          />

          <span>Operación</span>
          <select
            name="operacion"
            onChange={(event) => setOperacion(event.target.value)}
          >
            <option value="http://localhost:3000/sumas/listaSumas">
              Suma [+]
            </option>
            <option value="http://localhost:3000/restas/listaRestas">
              Resta [-]
            </option>
            <option value="http://localhost:3000/multiplicaciones/listaMultiplicaciones">
              Multiplicación [*]
            </option>
            <option value="http://localhost:3000/divisiones/listaDivisiones">
              División [/]
            </option>
          </select>

          <span>Operador B</span>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(event) => setB(parseFloat(event.target.value))}
          />

          <div className="botones">
            <button type="submit" disabled={modoEdicion}>
              Enviar
            </button>
            <button
              type="button"
              onClick={() => modificarOperacion(idEditar, operacion)}
              disabled={!modoEdicion}
            >
              Modificar
            </button>
          </div>
        </form>

        <div className="listas-container">
          <div className="lista card">
            <span>Sumas:</span>
            <ul>
              {sumas.map((suma) => (
                <li key={suma.id}>
                  [ID: {suma.id}] {suma.a} + {suma.b} = {suma.resultado}
                  <button
                    onClick={() =>
                      activarModoEdicion(
                        suma.id,
                        suma.a,
                        suma.b,
                        "http://localhost:3000/sumas/listaSumas"
                      )
                    }
                  >
                    ✏️
                  </button>
                  <button onClick={() => quitarSuma(suma.id)}>❌</button>
                  <br />
                  <br />
                </li>
              ))}
            </ul>
          </div>

          <div className="lista card">
            <span>Restas:</span>
            <ul>
              {restas.map((resta) => (
                <li key={resta.id}>
                  [ID: {resta.id}] {resta.a} - {resta.b} = {resta.resultado}
                  <button
                    onClick={() =>
                      activarModoEdicion(
                        resta.id,
                        resta.a,
                        resta.b,
                        "http://localhost:3000/restas/listaRestas"
                      )
                    }
                  >
                    ✏️
                  </button>
                  <button onClick={() => quitarResta(resta.id)}>❌</button>
                  <br />
                  <br />
                </li>
              ))}
            </ul>
          </div>

          <div className="lista card">
            <span>Multiplicaciones:</span>
            <ul>
              {multiplicaciones.map((multiplicacion) => (
                <li key={multiplicacion.id}>
                  [ID: {multiplicacion.id}] {multiplicacion.a} *{" "}
                  {multiplicacion.b} = {multiplicacion.resultado}
                  <button
                    onClick={() =>
                      activarModoEdicion(
                        multiplicacion.id,
                        multiplicacion.a,
                        multiplicacion.b,
                        "http://localhost:3000/multiplicaciones/listaMultiplicaciones"
                      )
                    }
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => quitarMultiplicacion(multiplicacion.id)}
                  >
                    ❌
                  </button>
                  <br />
                  <br />
                </li>
              ))}
            </ul>
          </div>

          <div className="lista card">
            <span>Divisiones:</span>
            <ul>
              {divisiones.map((division) => (
                <li key={division.id}>
                  [ID: {division.id}] {division.a} / {division.b} ={" "}
                  {division.resultado}
                  <button
                    onClick={() =>
                      activarModoEdicion(
                        division.id,
                        division.a,
                        division.b,
                        "http://localhost:3000/divisiones/listaDivisiones"
                      )
                    }
                  >
                    ✏️
                  </button>
                  <button onClick={() => quitarDivision(division.id)}>
                    ❌
                  </button>
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
