import { useState, useEffect } from "react";

function App() {
  const [base, setBase] = useState(0);
  const [altura, setAltura] = useState(0);
  const [rectangulos, setRectangulos] = useState([]);
  const [rectanguloId, setRectanguloId] = useState(null);

  const getRectangulos = async () => {
    const response = await fetch("http://localhost:3000/rectangulos");
    if (response.ok) {
      const data = await response.json();
      setRectangulos(data.rectangulos);
    }
  };

  useEffect(() => {
    getRectangulos();
  }, [rectangulos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/rectangulos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base, altura }),
    });
    if (response.ok) {
      const data = await response.json();
      setRectangulos([...rectangulos, data]);
      setAltura(0);
      setBase(0);
    }
  };

  const modificarRectangulo = (rectangulo) => {
    setRectanguloId(rectangulo.id);
    setAltura(rectangulo.altura);
    setBase(rectangulo.base);
  };

  const modificarRectanguloApi = async () => {
    const response = await fetch(
      `http://localhost:3000/rectangulos/${rectanguloId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base, altura }),
      }
    );
    if (response.ok) {
      const { rectangulo } = await response.json();
      setRectangulos(
        rectangulos.map((rect) =>
          rect.id === rectangulo.id ? rectangulo : rect
        )
      );
      setAltura(0);
      setBase(0);
      setRectanguloId(null);
    }
  };

  const eliminar = async (id) => {
    if (confirm("desea eliminar el rectangulo?")) {
      const response = await fetch(`http://localhost:3000/rectangulos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRectangulos(rectangulos.filter((rect) => rect.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Rectangulos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="altura">altura</label>
          <input
            type="number"
            id="altura"
            value={altura}
            onChange={(e) => setAltura(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="base">base</label>
          <input
            type="number"
            id="base"
            value={base}
            onChange={(e) => setBase(parseFloat(e.target.value))}
          />
        </div>
        {rectanguloId === null && <button type="submit">Agregar</button>}
      </form>
      {rectanguloId !== null && (
        <>
          <button onClick={() => modificarRectanguloApi()}>Editar</button>
          <button
            onClick={() => {
              setRectanguloId(null);
              setAltura(0);
              setBase(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}

      <ul>
        {rectangulos.map((rectangulo) => (
          <li key={rectangulo.id}>
            {`RectÃ¡ngulo ${rectangulo.id}:`}
            <br></br>
            {`Base: ${rectangulo.base}`} <br></br>
            {`Altura: ${rectangulo.altura}`}
            <br></br>
            {`Perimetro: ${rectangulo.perimetro}`}
            <br></br>
            {`Superficie: ${rectangulo.area}`} <br></br>
            {rectangulo.base === rectangulo.altura
              ? "Es un cuadrado"
              : "Es un rectangulo"}
            <button onClick={() => eliminar(rectangulo.id)}>X</button>
            <button onClick={() => modificarRectangulo(rectangulo)}>e</button>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
