import { useEffect, useState } from "react";

function App() {
  const [productos, setproductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [productoId, setproductoId] = useState(0);

  const getproductos = async () => {
      const response = await fetch(`http://localhost:3000/productos`);
      if (response.ok) {
        const { data } = await response.json();
        setproductos(data || []);
      }
  };

  useEffect(() => {
    getproductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre === "" || precio === "") {
      alert("Ambos campos deben tener un valor.");
      return;
    }

    const response = await fetch(`http://localhost:3000/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombre, precio: parseFloat(precio) }),
    });

    if (response.ok) {
      const { data } = await response.json();
      console.log(data);
      setproductos([...productos, data]);
      setNombre("");
      setPrecio("");
    }else{
      const { error } = await response.json();
      alert(error)
    }
  };

  const modificarproducto = (producto) => {
    setproductoId(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  const modificarproductoApi = async () => {
    if (nombre === "" || precio === "") {
      alert("Ambos campos deben tener un valor.");
      return;
    }
    const response = await fetch(
      `http://localhost:3000/productos/${productoId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre, precio: parseFloat(precio) }),
      }
    );

    if (response.ok) {
      const { data } = await response.json();
      setproductos(
        productos.map((o) => (o.id === data.id ? data : o))
      );
      setNombre("");
      setPrecio("");
      setproductoId(0)
    }else{
      const { error } = await response.json();
      alert(error)
    }
  };

  const quitarproducto = async (id) => {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setproductos(productos.filter((producto) => producto.id !== id));
      }
  };

  return (
    <>
      <h1>Verduleria</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="precio">Precio: </label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        {productoId === 0 && <button type="submit">Agregar</button>}
      </form>

      {productoId !== 0 && (
        <>
          <button onClick={modificarproductoApi}>Modificar</button>
          <button
            onClick={() => {
              setproductoId(0);
              setNombre("");
              setPrecio("");
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <h2>Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {`${producto.id}: nombre: ${producto.nombre} precio: $${producto.precio}`}
            <button
              onClick={() => modificarproducto(producto)}
              disabled={productoId !== 0}
            >
              Editar
            </button>
            <button
              onClick={() => quitarproducto(producto.id)}
              disabled={productoId !== 0}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
