import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [operacion, setOperacion] = useState(
    "http://localhost:3000/sumas/listaSumas"
  );

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
      const response = await fetch(`http://localhost:3000/sumas/listaSumas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSumas(sumas.filter((suma) => suma.idSuma !== id));
      }
    }
  };

  const quitarResta = async (id) => {
    if (confirm("¿Desea quitar la resta?")) {
      const response = await fetch(`http://localhost:3000/restas/listaRestas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRestas(restas.filter((resta) => resta.idResta !== id));
      }
    }
  };

  const quitarMultiplicacion = async (id) => {
    if (confirm("¿Desea quitar la multiplicación?")) {
      const response = await fetch(`http://localhost:3000/multiplicaciones/listaMultiplicaciones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMultiplicaciones(multiplicaciones.filter((multiplicacion) => multiplicacion.idMultiplicacion !== id));
      }
    }
  };

  const quitarDivision = async (id) => {
    if (confirm("¿Desea quitar la división?")) {
      const response = await fetch(`http://localhost:3000/divisiones/listaDivisiones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDivisiones(divisiones.filter((division) => division.idDivision !== id));
      }
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
            <button>Enviar</button>
            <button disabled={true}>Modificar</button>
          </div>
        </form>

        <div className="listas-container">
          <div className="lista card">
            <span>Sumas:</span>
            <ul>
              {sumas.map((suma) => (
                <li key={suma.idSuma}>
                  [ID: {suma.idSuma}] {suma.a} + {suma.b} = {suma.resultado}
                  <button>✏️</button>
                  <button onClick={() => quitarSuma(suma.idSuma)}>❌</button>
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
                <li key={resta.idResta}>
                  [ID: {resta.idResta}] {resta.a} - {resta.b} = {resta.resultado}
                  <button>✏️</button>
                  <button onClick={() => quitarResta(resta.idResta)}>❌</button>
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
                <li key={multiplicacion.idMultiplicacion}>
                  [ID: {multiplicacion.idMultiplicacion}] {multiplicacion.a} * {multiplicacion.b} = {multiplicacion.resultado}
                  <button>✏️</button>
                  <button onClick={() => quitarMultiplicacion(multiplicacion.idMultiplicacion)}>❌</button>
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
                <li key={division.idDivision}>
                  [ID: {division.idDivision}] {division.a} - {division.b} = {division.resultado}
                  <button>✏️</button>
                  <button onClick={() => quitarDivision(division.idDivision)}>❌</button>
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
