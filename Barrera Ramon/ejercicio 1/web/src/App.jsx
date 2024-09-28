import { useEffect, useState } from "react";

function App() {
  const [sumas, setSumas] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [sumaId, setSumaId] = useState(0);
  const [operacion, setOperacion] = useState("");
  const [signo, setSigno] = useState("");

  const getSumas = async () => {
    const response = await fetch(`http://localhost:3000/${operacion}`);
    if (response.ok) {
      const { sumas } = await response.json();
      setSumas(sumas);
    }
  };

  useEffect(() => {
    getSumas();
  }, [operacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/${operacion}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      const { suma } = await response.json();
      setSumas([...sumas, { ...suma, tipo: operacion, signo }]);
      setA(0);
      setB(0);
    }
  };

  const modificarSuma = (suma) => {
    setSumaId(suma.id);
    setA(suma.a);
    setB(suma.b);
    setOperacion(suma.tipo); 
    setSigno(suma.signo); 
  };

  const modificarSumaApi = async () => {
    const response = await fetch(`http://localhost:3000/${operacion}/${sumaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      const { suma } = await response.json();
      setSumas(sumas.map((s) => (s.id == suma.id ? { ...suma, tipo: operacion, signo } : s)));
      setA(0);
      setB(0);
      setSumaId(0);
    }
  };

  const quitarSuma = async (id) => {
    if (confirm("¿Desea quitar suma?")) {
      const response = await fetch(`http://localhost:3000/${operacion}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSumas(sumas.filter((suma) => suma.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Calculadora</h1>
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
        {sumaId === 0 && <button onClick={() => { setOperacion("sumas"); setSigno("+"); }} type="submit">Sumar</button>}
        {sumaId === 0 && <button onClick={() => { setOperacion("restas"); setSigno("-"); }} type="submit">Restar</button>}
        {sumaId === 0 && <button onClick={() => { setOperacion("multiplicaciones"); setSigno("*"); }} type="submit">Multiplicar</button>}
        {sumaId === 0 && <button onClick={() => { setOperacion("divisiones"); setSigno("/"); }} type="submit">Dividir</button>}
      </form>
      {sumaId !== 0 && (
        <>
          <button onClick={modificarSumaApi}>Modificar</button>
          <button onClick={() => { setSumaId(0); setA(0); setB(0); }}>Cancelar</button>
        </>
      )}
      <ul>
        {sumas.map((suma) => (
          <li key={suma.id}>
            {`${suma.a} ${suma.signo} ${suma.b} = ${suma.resultado}`}
            <button onClick={() => modificarSuma(suma)} disabled={sumaId !== 0}>
              E
            </button>
            <button onClick={() => quitarSuma(suma.id)} disabled={sumaId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
