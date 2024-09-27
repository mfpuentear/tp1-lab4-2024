import { useEffect, useState } from "react";

function Rectangulos() {
  const [rectangulos, setRectangulos] = useState([]);
  const [altura, setAltura] = useState(0);
  const [base, setBase] = useState(0);
  const [rectanguloId, setRectanguloId] = useState(0);

  const getRectangulos = async () => {
    const response = await fetch("http://localhost:3000/rectangulos");
    if (response.ok) {
      const { rectangulos } = await response.json();
      setRectangulos(rectangulos);
    }
  };

 
  useEffect(() => {
    getRectangulos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/rectangulos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ altura, base }),
    });
    if (response.ok) {
      
      const { rectangulo } = await response.json();
      setRectangulos([...rectangulos, rectangulo]);
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
    const response = await fetch(`http://localhost:3000/rectangulos/${rectanguloId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ altura, base }),
    });
    if (response.ok) {

      const { rectangulo } = await response.json();
      setRectangulos(rectangulos.map((r) => (r.id == rectangulo.id ? rectangulo : r)));

      setAltura(0);
      setBase(0);
      setRectanguloId(0);
    }
  };

  const quitarRectangulo = async (id) => {
    if (confirm("¿Desea quitar rectangulo?")) {
      const response = await fetch(`http://localhost:3000/rectangulos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {

        setRectangulos(rectangulos.filter((rectangulo) => rectangulo.id !== id));
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
        {rectanguloId === 0 && <button type="submit">Agregar</button>}
      </form>
      {rectanguloId !== 0 && (
        <>
          <button onClick={() => modificarRectanguloApi()}>Modificar</button>
          <button
            onClick={() => {
              setRectanguloId(0);
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
            {`${rectangulo.id}: altura:${rectangulo.altura} - base:${rectangulo.base} - perimetro:${rectangulo.perimetro} - superficie:${rectangulo.superficie} - ${rectangulo.base == rectangulo.altura ? "Es un cuadrado": "Es un rectangulo"} `}
            <button onClick={() => modificarRectangulo(rectangulo)} disabled={rectanguloId !== 0}>
              E
            </button>
            <button onClick={() => quitarRectangulo(rectangulo.id)} disabled={rectanguloId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Rectangulos;