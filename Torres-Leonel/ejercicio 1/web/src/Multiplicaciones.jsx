import { useEffect, useState } from "react";

function Multiplicaciones() {
  const [multiplicaciones, setMultiplicaciones] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [multiplicacionId, setMultiplicacionId] = useState(0);

  const getMultiplicaciones = async () => {
    const response = await fetch("http://localhost:3000/multiplicaciones");
    if (response.ok) {
      const { multiplicaciones } = await response.json();
      setMultiplicaciones(multiplicaciones);
    }
  };

 
  useEffect(() => {
    getMultiplicaciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/multiplicaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      
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
    const response = await fetch(`http://localhost:3000/multiplicaciones/${multiplicacionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {

      const { multiplicacion } = await response.json();
      setMultiplicaciones(multiplicaciones.map((d) => (d.id == multiplicacion.id ? multiplicacion : d)));

      setA(0);
      setB(0);
      setMultiplicacionId(0);
    }
  };

  const quitarMultiplicacion = async (id) => {
    if (confirm("¿Desea quitar multiplicacion?")) {
      const response = await fetch(`http://localhost:3000/multiplicaciones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {

        setMultiplicaciones(multiplicaciones.filter((multiplicacion) => multiplicacion.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Multiplicaciones</h1>
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
        {multiplicacionId === 0 && <button type="submit">Agregar</button>}
      </form>
      {multiplicacionId !== 0 && (
        <>
          <button onClick={() => modificarMultiplicacionApi()}>Modificar</button>
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
            {`${multiplicacion.id}: ${multiplicacion.a} * ${multiplicacion.b} = ${multiplicacion.resultado} `}
            <button onClick={() => modificarMultiplicacion(multiplicacion)} disabled={multiplicacionId !== 0}>
              E
            </button>
            <button onClick={() => quitarMultiplicacion(multiplicacion.id)} disabled={multiplicacionId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Multiplicaciones;