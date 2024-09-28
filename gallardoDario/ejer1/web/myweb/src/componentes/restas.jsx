import { useEffect, useState } from "react";

function App() {
  const [restas, setRestas] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [restaId, setRestaId] = useState(0);

  const getRestas = async () => {
    const response = await fetch("http://localhost:3000/restas");
    if (response.ok) {
      const { restas } = await response.json();
      setRestas(restas);
    }
  };

  // Obtenemos listado de restas cuando se carga por primera vez el componente
  useEffect(() => {
    getRestas();
  }, []);

  // Se agrega una nueva resta
  const handleSubmit = async (e) => {
    e.preventDefault();
    // POST localhost:3000/restas (body: a, b)
    const response = await fetch("http://localhost:3000/restas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las restas a la api
      // getRestas();

      // Agregar la resta creada devuelta por la api
      const { resta } = await response.json();
      setRestas([...restas, resta]);
      setA(0);
      setB(0);
    }
  };

  const modificarResta = (resta) => {
    setRestaId(resta.id);
    setA(resta.a);
    setB(resta.b);
  };

  const modificarRestaApi = async () => {
    const response = await fetch(`http://localhost:3000/restas/${restaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las restas a la api
      // getRestas();

      // Modificar la resta devuelta por la api
      const { resta } = await response.json();
      setRestas(restas.map((s) => (s.id == resta.id ? resta : s)));

      setA(0);
      setB(0);
      setRestaId(0);
    }
  };

  const quitarResta = async (id) => {
    if (confirm("¿Desea quitar resta?")) {
      const response = await fetch(`http://localhost:3000/restas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Pedir todas las restas a la api
        // getRestas();

        // Quitamos la resta de restas
        setRestas(restas.filter((resta) => resta.id !== id));
      }
    }
  };

  return (
    <>
      <h1>restas</h1>
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
        {restaId === 0 && <button type="submit">Agregar</button>}
      </form>
      {restaId !== 0 && (
        <>
          <button onClick={() => modificarRestaApi()}>Modificar</button>
          <button
            onClick={() => {
              setRestaId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {restas.map((resta) => (
          <li key={resta.id}>
            {`${resta.id}: ${resta.a} + ${resta.b} = ${resta.resultado} `}
            <button
              onClick={() => modificarResta(resta)}
              disabled={restaId !== 0}
            >
              E
            </button>
            <button
              onClick={() => quitarResta(resta.id)}
              disabled={restaId !== 0}
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
