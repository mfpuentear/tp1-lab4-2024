import { useEffect, useState } from "react";

function Verduras() {
  const [verduras, setVerduras] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [verduraId, setVerduraId] = useState(0);

  const getVerduras = async () => {
    const response = await fetch("http://localhost:3000/verduras");
    if (response.ok) {
      const { verduras } = await response.json();
      setVerduras(verduras);
    }
  };

 
  useEffect(() => {
    getVerduras();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/verduras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });
    if (response.ok) {
      
      const { verdura } = await response.json();
      setVerduras([...verduras, verdura]);
      setNombre("");
      setPrecio(0);
    }
  };

  const modificarVerdura = (verdura) => {
    setVerduraId(verdura.id);
    setNombre(verdura.nombre);
    setPrecio(verdura.precio);
  };

  const modificarVerduraApi = async () => {
    const response = await fetch(`http://localhost:3000/verduras/${verduraId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });
    if (response.ok) {

      const { verdura } = await response.json();
      setVerduras(verduras.map((v) => (v.id == verdura.id ? verdura : v)));

      setNombre("");
      setPrecio(0);
      setVerduraId(0);
    }
  };

  const quitarVerdura = async (id) => {
    if (confirm("¿Desea quitar verdura?")) {
      const response = await fetch(`http://localhost:3000/verduras/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {

        setVerduras(verduras.filter((verdura) => verdura.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Verduras</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre((e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="precio">precio</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
          />
        </div>
        {verduraId === 0 && <button type="submit">Agregar</button>}
      </form>
      {verduraId !== 0 && (
        <>
          <button onClick={() => modificarVerduraApi()}>Modificar</button>
          <button
            onClick={() => {
              setVerduraId(0);
              setNombre("");
              setPrecio(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {verduras.map((verdura) => (
          <li key={verdura.id}>
            {`${verdura.id}: nombre:${verdura.nombre} - precio:${verdura.precio}`}
            <button onClick={() => modificarVerdura(verdura)} disabled={verduraId !== 0}>
              E
            </button>
            <button onClick={() => quitarVerdura(verdura.id)} disabled={verduraId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Verduras;