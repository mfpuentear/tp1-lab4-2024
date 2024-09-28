import { useEffect, useState } from "react";

function App() {
  const [operaciones, setOperaciones] = useState([]);
  const [operacionId, setOperacionId] = useState(0);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [tipo, setTipo] = useState("sumas");

  const URL = `http://localhost:3000/${tipo}/`;

  const getOperaciones = async () => {
    const response = await fetch(URL);
    if (response.ok) {
      const { data } = await response.json();
      setOperaciones(data);
    }
  };

  useEffect(() => {
    getOperaciones();
  }, [tipo]);

  // ------------------------------------------------

  const modificarOperacion = (operacion) => {
    setOperacionId(operacion.id);
    setA(operacion.a);
    setB(operacion.b);
  };

  const modificarOperacionApi = async () => {
    const response = await fetch(`${URL}${operacionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setOperaciones(
        operaciones.map((operacion) =>
          operacion.id == data.id ? data : operacion
        )
      );
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  const quitarOperacion = async (id) => {
    if (confirm("¿Desea quitar este elemento?")) {
      const response = await fetch(`${URL}${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOperaciones(operaciones.filter((operacion) => operacion.id !== id));
      }
    }
  };

  //--------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      const { data } = await response.json();
      setOperaciones([...operaciones, data]);
      setA(0);
      setB(0);
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value);
          }}
        >
          <option value="sumas">Sumas</option>
          <option value="restas">Restas</option>
          <option value="multiplicaciones">Multiplicación</option>
          <option value="divisiones">División</option>
        </select>

        <div>
          <label htmlFor="a">Lado A</label>
          <input
            type="number"
            id="a"
            value={a}
            style={{ marginBottom: 10, marginLeft: 5 }}
            onChange={(e) => setA(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="b">Lado B</label>
          <input
            type="number"
            id="b"
            value={b}
            style={{ marginBottom: 10, marginLeft: 5 }}
            onChange={(e) => setB(parseInt(e.target.value))}
            required
          />
        </div>
        {operacionId === 0 && <button type="submit">Agregar</button>}
        {operacionId !== 0 && (
          <>
            <button
              onClick={modificarOperacionApi}
              type="button"
              style={{ marginRight: 5 }}
            >
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
      </form>
      <ul style={{ listStyle: "none" }}>
        {operaciones.map((operacion, index) => (
          <li key={operacion.id} style={{ display: "flex", gap: 10 }}>
            <span>{index + 1 + ")"}</span>
            <div>
              <span>
                <b>{operacion.a}</b>
              </span>
              <span>
                <b>{tipo === "sumas" && "+"}</b>
                <b>{tipo === "restas" && "-"}</b>
                <b>{tipo === "multiplicaciones" && "*"}</b>
                <b>{tipo === "divisiones" && "/"}</b>
              </span>
              <span>
                <b>{operacion.b}</b>
              </span>
              <span>
                <b>=</b>
              </span>
              <span>
                <b>{operacion.resultado}</b>
              </span>
            </div>
            <div>
              <button
                onClick={() => modificarOperacion(operacion)}
                disabled={operacionId !== 0}
                style={{ marginRight: 5 }}
              >
                E
              </button>
              <button
                onClick={() => quitarOperacion(operacion.id)}
                disabled={operacionId !== 0}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
