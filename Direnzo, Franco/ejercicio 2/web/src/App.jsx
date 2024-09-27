import { useEffect, useState } from "react";

function App() {
  const [areas, setAreas] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [areaId, setAreaId] = useState(0);

  const getAreas = async () => {
    const response = await fetch("http://localhost:3000/areas");
    if (response.ok) {
      const { areas } = await response.json();
      setAreas(areas);
      console.log(areas)
    }
  };

  useEffect(() => {
    getAreas();
  }, []);

  const handleSubmitA = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/areas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      const { area } = await response.json();
      setAreas([...areas, area]);
      setA(0);
      setB(0);
    }
  };

  const modificarArea = (area) => {
    setAreaId(area.id);
    setA(area.a);
    setB(area.b);
  };

  const modificarAreaApi = async () => {
    const response = await fetch(`http://localhost:3000/areas/${areaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las sumas a la api
      // getSumas();

      // Modificar la suma devuelta por la api
      const { area } = await response.json();
      setAreas(areas.map((a) => (a.id == area.id ? area : a)));

      setA(0);
      setB(0);
      setAreaId(0);
    }
  };

  const quitarArea = async (id) => {
    if (confirm("¿Desea quitar area?")) {
      const response = await fetch(`http://localhost:3000/areas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAreas(areas.filter((area) => area.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Areas</h1>
      <form onSubmit={handleSubmitA}>
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
        {areaId === 0 && <button type="submit">Agregar</button>}
      </form>
      {areaId !== 0 && (
        <>
          <button onClick={() => modificarAreaApi()}>Modificar</button>
          <button
            onClick={() => {
              setAreaId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {areas.map((area) => (
          <li key={area.id}>
            {`${area.id}: ${area.a} x ${area.b} = ${area.resultado} - ${area.a==area.b?'Cuadrado':'Rectángulo'}`}
            <button onClick={() => modificarArea(area)} disabled={areaId !== 0}>
              E
            </button>
            <button onClick={() => quitarArea(area.id)} disabled={areaId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
