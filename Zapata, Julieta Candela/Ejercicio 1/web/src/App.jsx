import { useEffect, useState } from "react";

function App() {
  const [operaciones, setOperaciones] = useState([]);
  const [operacionId, setOperacionId] = useState(0);
  const [tipoOperaciones, setTipoOperaciones] = useState(operaciones);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const getOperaciones = async () => {
    const response = await fetch(`http://localhost:3000/${tipoOperaciones}`);
    if (response.ok) {
      const { data } = await response.json();
      setOperaciones(data);
    }
  };

  useEffect(() => {
    getOperaciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoOperaciones]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/${tipoOperaciones}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      const { operacion } = await response.json();
      setOperaciones([...operaciones, operacion]);
      setA(0);
      setB(0);
    }
  };

  const modificarOperacion = (operacion) => {
    setOperacionId(operacion.id);
    setA(operacion.a);
    setB(operacion.b);
  };

  const modificarOperacionApi = async () => {
    const response = await fetch(
      `http://localhost:3000/${tipoOperaciones}/${operacionId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b }),
      }
    );
    if (response.ok) {
      const { operacion } = await response.json();
      setOperaciones(
        operaciones.map((op) => (op.id == operacion.id ? operacion : op))
      );
      setA(0);
      setB(0);
      setOperacionId(0);
    }
  };

  const quitarOperacion = async (id) => {
    if (confirm("¿Desea quitar la operacion?")) {
      const response = await fetch(
        `http://localhost:3000/${tipoOperaciones}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOperaciones(operaciones.filter((op) => op.id !== id));
      }
    }
  };

  return (
    <>
    <h2>Ejercicio 1</h2>
    <h3>Calculadora</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">a</label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">b</label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="operacion">Operacion</label>
          <select
            id="operacion"
            value={tipoOperaciones}
            onChange={(e) => setTipoOperaciones(e.target.value)}
          >
            <option value="sumas">Suma</option>
            <option value="restas">Resta</option>
            <option value="multiplicaciones">Multiplicacion</option>
            <option value="divisiones">Division</option>
          </select>
        </div>
        {operacionId === 0 && 
        <button 
        type="submit">
          Agregar
        </button>}
      </form>
      {operacionId !== 0 && (
        <>
          <button 
          onClick={() => modificarOperacionApi()}>
            Modificar
          </button>
          <button
            onClick={() => {
              setOperacionId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {operaciones.map((op) => (
          <li key={op.id}>
            {`${op.a} ${
              tipoOperaciones === "sumas"
                ? "+"
                : tipoOperaciones === "restas"
                ? "-"
                : tipoOperaciones === "multiplicaciones"
                ? "*"
                : "/"
            } ${op.b} = ${op.resultado}`}
            <button
              onClick={() => modificarOperacion(op)}
              disabled={operacionId !== 0}
            >
              E
            </button>
            <button
              onClick={() => quitarOperacion(op.id)}
              disabled={operacionId !== 0}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;