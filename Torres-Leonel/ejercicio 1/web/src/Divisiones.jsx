import { useEffect, useState } from "react";

function Divisiones() {
  const [divisiones, setDivisiones] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [divisionId, setDivisionId] = useState(0);

  const getDivisiones = async () => {
    const response = await fetch("http://localhost:3000/divisiones");
    if (response.ok) {
      const { divisiones } = await response.json();
      setDivisiones(divisiones);
    }
  };

  useEffect(() => {
    getDivisiones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (b == 0) {
        alert("B no puede ser 0")
        return
    }
    const response = await fetch("http://localhost:3000/divisiones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      
      const { division } = await response.json();
      setDivisiones([...divisiones, division]);
      setA(0);
      setB(0);
    }
  };

  const modificarDivision = (division) => {
    setDivisionId(division.id);
    setA(division.a);
    setB(division.b);
  };

  const modificarDivisionApi = async () => {
    if (b == 0) {
        alert("B no puede ser 0")
        return
    }
    const response = await fetch(`http://localhost:3000/divisiones/${divisionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
    
      const { division } = await response.json();
      setDivisiones(divisiones.map((d) => (d.id == division.id ? division : d)));

      setA(0);
      setB(0);
      setDivisionId(0);
    }
  };

  const quitarDivision = async (id) => {
    if (confirm("¿Desea quitar division?")) {
      const response = await fetch(`http://localhost:3000/divisiones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
       
        setDivisiones(divisiones.filter((division) => division.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Divisiones</h1>
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
        {divisionId === 0 && <button type="submit">Agregar</button>}
      </form>
      {divisionId !== 0 && (
        <>
          <button onClick={() => modificarDivisionApi()}>Modificar</button>
          <button
            onClick={() => {
              setDivisionId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {divisiones.map((division) => (
          <li key={division.id}>
            {`${division.id}: ${division.a} / ${division.b} = ${division.resultado} `}
            <button onClick={() => modificarDivision(division)} disabled={divisionId !== 0}>
              E
            </button>
            <button onClick={() => quitarDivision(division.id)} disabled={divisionId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Divisiones;