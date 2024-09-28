import { useEffect, useState } from "react";

function App() {
  const [resultados, setResultados] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [resultadoId, setResultadoId] = useState(0);
  const [operacion, setOperacion] = useState("sumas");

  // ---------------------------------------------obetener resultados hechos en la api
  const getResultados = async () => {
    const response = await fetch(`http://localhost:3000/${operacion}`);
    if (response.ok) {
      const { data } = await response.json();
      setResultados(data);
    }
  };



  useEffect(() => {
    getResultados();
  }, [operacion]); 
  //-------------------------------------------- Volver a obtener resultados si la operación cambia

  //--------------------------------------------- Se agrega un nuevo resultado
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (operacion === "divisiones" && b === 0) {
      alert("No se puede dividir por 0.");
      return;
    }

    const response = await fetch(`http://localhost:3000/${operacion}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setResultados([...resultados, data]);
      setA(0);
      setB(0);
    }
  };

  //---------------------------------------------- modificar un resultado
  const modificarResultado = (resultado) => {
    setResultadoId(resultado.id);
    setA(resultado.a);
    setB(resultado.b);
  };

  const modificarResultadoApi = async () => {
    const response = await fetch(`http://localhost:3000/${operacion}/${resultadoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      const { data } = await response.json();
      setResultados(resultados.map((r) => (r.id === data.id ? data : r)));
      setA(0);
      setB(0);
      setResultadoId(0);
    }
  };

  //------------------------------------------------------ eliminar un resultado
  const quitarResultado = async (id) => {
    if (confirm("¿Desea quitar el resultado?")) {
      const response = await fetch(`http://localhost:3000/${operacion}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setResultados(resultados.filter((resultado) => resultado.id !== id));
      }
    }
  };

  return (
    <div>
      <h1>{operacion.charAt(0).toUpperCase() + operacion.slice(1)}</h1>
      <form onSubmit={handleSubmit}>
        <select value={operacion} onChange={(e) => setOperacion(e.target.value)}>
          <option value="sumas">Sumas</option>
          <option value="restas">Restas</option>
          <option value="multiplicaciones">Multiplicaciones</option>
          <option value="divisiones">Divisiones</option>
        </select>
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
        {resultadoId === 0 && <button type="submit">Agregar</button>}
      </form>
      {resultadoId !== 0 && (
        <>
          <button onClick={modificarResultadoApi}>Modificar</button>
          <button
            onClick={() => {
              setResultadoId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {resultados.map((resultado) => (
          <li key={resultado.id}>
            {`${resultado.a} ${operacion === "sumas" ? "+" : operacion === "restas" ? "-" : operacion === "multiplicaciones" ? "*" : "/"} ${resultado.b} = ${resultado.resultado}`}
            <button onClick={() => modificarResultado(resultado)} disabled={resultadoId !== 0}>
              E
            </button>
            <button onClick={() => quitarResultado(resultado.id)} disabled={resultadoId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;