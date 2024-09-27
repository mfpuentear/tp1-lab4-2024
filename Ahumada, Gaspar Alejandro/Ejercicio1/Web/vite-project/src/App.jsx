import { useEffect, useState } from "react";

function App() {
  const [operaciones, setOperaciones] = useState([]);
  const [tipoOperacion, setTipoOperacion] = useState("sumas");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operacionId, setOperacionId] = useState(0);



  useEffect(() => {
      const getOperaciones = async () => {
      const response = await fetch(`http://localhost:3000/${tipoOperacion}`);
      if (response.ok) {
        const { data } = await response.json();
        setOperaciones(data || []);
        // console.log(data);
      }
  };
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
    }else{
      const {error} = await response.json();
      alert(error)
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
    console.log(operaciones);
    console.log(operacionId);
    console.log(tipoOperacion);
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
      setOperacionId(0);
    }else{
      const {error} = await response.json();
      alert(error)
    }
  };

  const quitarOperacion = async (id) => {
      const response = await fetch(`http://localhost:3000/${tipoOperacion}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOperaciones(operaciones.filter((operacion) => operacion.id !== id));
      }
  };

  const signoOperacion = () => {
    if (tipoOperacion === "sumas") {
      return "+";
    } else if (tipoOperacion === "restas") {
      return "-";
    } else if (tipoOperacion === "divisiones") {
      return "/";
    } else {
      return "*";
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
        <option value="sumas">Sumas</option>
        <option value="restas">Restas</option>
        <option value="multiplicaciones">Multiplicaciones</option>
        <option value="divisiones">Divisiones</option>
      </select>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">a</label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="b">b</label>
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
            {`${operacion.id}: ${operacion.a} ${signoOperacion()} ${operacion.b} = ${operacion.resultado}`}
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
