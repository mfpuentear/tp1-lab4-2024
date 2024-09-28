import { useEffect, useState } from "react";

function App() {
  const [rectangulos, setRectangulos] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [perimetro, setPerimetro] = useState(0);
  const [superficie, setSuperficie] = useState(0);
  const [rectanguloId, setRectanguloId] = useState(0);
  const [mensaje, setMensaje] = useState("");

  // obtener datos
  const getRectangulos = async () => {
    const response = await fetch(`http://localhost:3001/rectangulo`);
    if (response.ok) {
      const { data } = await response.json();
      setRectangulos(data);
    }
  };

  useEffect(() => {
    getRectangulos();
  }, []);

  const identificarForma = (a, b) => {
    if (a === b) {
      setMensaje("agrego un cuadrado.");
    } else {
      setMensaje("agrego un rectangulo.");
    }
  };

  // nuevo rectangulo
  const handleSubmit = async (e) => {
    e.preventDefault();

    identificarForma(a, b);

    const response = await fetch(`http://localhost:3001/rectangulo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b, perimetro, superficie }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setRectangulos([...rectangulos, data]);
      setA(0);
      setB(0);
      setPerimetro(0);
      setSuperficie(0);
    }
  };

  // editar rectangulo
  const modificarRectangulo = (rectangulo) => {
    setRectanguloId(rectangulo.id);
    setA(rectangulo.a);
    setB(rectangulo.b);
  };

  const modificarRectanguloApi = async () => {
    identificarForma(a, b);

    const response = await fetch(
      `http://localhost:3001/rectangulo/${rectanguloId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b }),
      }
    );
    if (response.ok) {
      const { data } = await response.json();
      setRectangulos(rectangulos.map((r) => (r.id === data.id ? data : r)));
      setA(0);
      setB(0);
      setRectanguloId(0);
    }
  };

  // elimina rectangulo
  const quitarRectangulo = async (id) => {
    if (confirm("quiere borrar el rectangulo?")) {
      const response = await fetch(`http://localhost:3001/rectangulo/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRectangulos(
          rectangulos.filter((rectangulo) => rectangulo.id !== id)
        );
      }
    }
  };

  return (
    <div>
      <h1>Rectangulos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">Lado a</label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">Lado b</label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        {rectanguloId === 0 && <button type="submit">Agregar</button>}
      </form>
      {rectanguloId !== 0 && (
        <>
          <button onClick={modificarRectanguloApi}>Modificar</button>
          <button
            onClick={() => {
              setRectanguloId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}

      <h3>Lista de Rectangulos</h3>
      <ul>
        {rectangulos.map((rectangulo) => (
          <li key={rectangulo.id}>
            {`Rectangulo ${rectangulo.id}:`} <br />
            {`Lado a = ${rectangulo.a}`} <br />
            {`Lado b = ${rectangulo.b}`} <br />
            {`Perimetro = ${rectangulo.perimetro}`} <br />
            {`Superficie = ${rectangulo.superficie}`}
            <br />
            <button
              onClick={() => modificarRectangulo(rectangulo)}
              disabled={rectanguloId !== 0}
            >
              Editar
            </button>
            <button
              onClick={() => quitarRectangulo(rectangulo.id)}
              disabled={rectanguloId !== 0}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <p>{mensaje}</p>
    </div>
  );
}

export default App;
