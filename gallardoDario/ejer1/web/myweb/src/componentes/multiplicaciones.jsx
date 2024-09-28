import { useEffect, useState } from "react";

function App() {
  const [multiplicaciones, setMultiplicaciones] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [mutiplicacionId, setMultiplicacionId] = useState(0);

  const getMultiplicaciones = async () => {
    const response = await fetch("http://localhost:3000/multiplicaciones");
    if (response.ok) {
      const { multiplicaciones } = await response.json();
      setMultiplicaciones(multiplicaciones);
    }
  };

  // Obtenemos listado de multiplicaciones cuando se carga por primera vez el componente
  useEffect(() => {
    getMultiplicaciones();
  }, []);

  // Se agrega una nueva multiplicacion
  const handleSubmit = async (e) => {
    e.preventDefault();
    // POST localhost:3000/multiplicaciones (body: a, b)
    const response = await fetch("http://localhost:3000/multiplicaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las multiplicaciones a la api
      // getMultiplicaciones();

      // Agregar la multiplicacion creada devuelta por la api
      const { multiplicacion } = await response.json();
      setMultiplicaciones([...multiplicaciones, multiplicacion]);
      setA(0);
      setB(0);
    }
  };

  const modificarMultiplicacion = (multiplicacion) => {
    setMultiplicacionId(multiplicacion.id);
    setA(multiplicacion.a);
    setB(multiplicacion.b);
  };

  const modificarMultiplicacionApi = async () => {
    const response = await fetch(
      `http://localhost:3000/multiplicaciones/${mutiplicacionId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b }),
      }
    );
    if (response.ok) {
      // Pedir todas las multiplicaciones a la api
      // getMultiplicaciones();

      // Modificar la multiplicacion devuelta por la api
      const { multiplicacion } = await response.json();
      setMultiplicaciones(
        multiplicaciones.map((s) =>
          s.id == multiplicacion.id ? multiplicacion : s
        )
      );

      setA(0);
      setB(0);
      setMultiplicacionId(0);
    }
  };

  const quitarMultiplicaion = async (id) => {
    if (confirm("¿Desea quitar multiplicacion?")) {
      const response = await fetch(
        `http://localhost:3000/multiplicaciones/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Pedir todas las multiplicaciones a la api
        // getMultiplicaciones();

        // Quitamos la multiplicacion de multiplicaciones
        setMultiplicaciones(
          multiplicaciones.filter((multiplicacion) => multiplicacion.id !== id)
        );
      }
    }
  };

  return (
    <>
      <h1>multiplicaciones</h1>
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
        {mutiplicacionId === 0 && <button type="submit">Agregar</button>}
      </form>
      {mutiplicacionId !== 0 && (
        <>
          <button onClick={() => modificarMultiplicacionApi()}>
            Modificar
          </button>
          <button
            onClick={() => {
              setMultiplicacionId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {multiplicaciones.map((multiplicacion) => (
          <li key={multiplicacion.id}>
            {`${multiplicacion.id}: ${multiplicacion.a} + ${multiplicacion.b} = ${multiplicacion.resultado} `}
            <button
              onClick={() => modificarMultiplicacion(multiplicacion)}
              disabled={mutiplicacionId !== 0}
            >
              E
            </button>
            <button
              onClick={() => quitarMultiplicaion(multiplicacion.id)}
              disabled={mutiplicacionId !== 0}
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
