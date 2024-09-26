import { useEffect, useState } from "react";

function App() {
  const [operaciones, setOperaciones] = useState([]);
  const [tipoOperacion, setTipoOperacion] = useState("perimetros");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operacionId, setOperacionId] = useState(0);

  const getOperaciones = async () => {
      const response = await fetch(`http://localhost:3000/${tipoOperacion}`);
      if (response.ok) {
        const { data } = await response.json();
        setOperaciones(data || []);
      }
  };

  useEffect(() => {
    getOperaciones();
  }, [tipoOperacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (a === "" || b === "") {
      alert("Ambos campos deben tener un valor.");
      return;
    }

    const response = await fetch(`http://localhost:3000/${tipoOperacion}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: parseFloat(a), b: parseFloat(b) }),
    });

    if (response.ok) {
      const { data } = await response.json();
      console.log(data);
      setOperaciones([...operaciones, data]);
      setA("");
      setB("");
    }
  };

  const modificarOperacion = (operacion) => {
    setOperacionId(operacion.id);
    setA(operacion.a);
    setB(operacion.b);
  };

  const modificarOperacionApi = async () => {
    if (a === "" || b === "") {
      alert("Ambos campos deben tener un valor.");
      return;
    }
    const response = await fetch(
      `http://localhost:3000/${tipoOperacion}/${operacionId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a: parseFloat(a), b: parseFloat(b) }),
      }
    );

    if (response.ok) {
      const { data } = await response.json();
      console.log(data);
      setOperaciones(
        operaciones.map((o) => (o.id === data.id ? data : o))
      );
      setA("");
      setB("");
      setOperacionId(0)

    }
  };

  const quitarOperacion = async (id) => {
    if (window.confirm("¿Desea quitar la operación?")) {
      const response = await fetch(`http://localhost:3000/${tipoOperacion}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOperaciones(operaciones.filter((operacion) => operacion.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Operaciones</h1>
      <label htmlFor="tipoOperacion">Tipo de operación:</label>
      <select
        name="operaciones"
        id="operaciones"
        value={tipoOperacion}
        onChange={(e) => setTipoOperacion(e.target.value)}
      >
        <option value="perimetros">Perimetros</option>
        <option value="superficies">Superficies</option>
      </select>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">Lado A</label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="b">Lado B</label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </div>
        {operacionId === 0 && <button type="submit">Agregar</button>}
      </form>

      {operacionId !== 0 && (
        <>
          <button onClick={modificarOperacionApi}>Modificar</button>
          <button
            onClick={() => {
              setOperacionId(0);
              setA("");
              setB("");
            }}
          >
            Cancelar
          </button>
        </>
      )}

      <ul>
        {operaciones.map((operacion) => (
          <li key={operacion.id}>
            {tipoOperacion==="perimetros"?`${operacion.id}: el perimetro del ${operacion.a==operacion.b ?
               "cuadrado":"rectangulo"} 
               con el lado A = ${operacion.a} 
               y lado B = ${operacion.b} 
               es ${operacion.resultado}`:`${operacion.id}: la superficie del ${operacion.a==operacion.b ?
               "cuadrado":"rectangulo"} 
               con el lado A = ${operacion.a} 
               y lado B = ${operacion.b} 
               es ${operacion.resultado}` }
            <button
              onClick={() => modificarOperacion(operacion)}
              disabled={operacionId !== 0}
            >
              E
            </button>
            <button
              onClick={() => quitarOperacion(operacion.id)}
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
