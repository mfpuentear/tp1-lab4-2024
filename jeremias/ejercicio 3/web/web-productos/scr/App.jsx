import { useState, useEffect } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [productoId, setproductoId] = useState(0);

  const getproductos = async () => {
    const response = await fetch(`http://localhost:3002/productos`);
    if (response.ok) {
      const { data } = await response.json();
      setProductos(data);
    }
  };
  useEffect(() => {
    getproductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3002/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setProductos([...productos, data]);
      setNombre("");
      setPrecio(0);
    }
  };

  const modificarProducto = (producto) => {
    setproductoId(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  const modificarProductoApi = async () => {
    const response = await fetch(
      `http://localhost:3002/productos/${productoId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio }),
      }
    );
    if (response.ok) {
      const { data } = await response.json();
      setProductos(productos.map((p) => (p.id === data.id ? data : p)));
      setNombre("");
      setPrecio(0);
      setproductoId(0);
    }
  };

  const quitarProducto = async (id) => {
    if (confirm("quiere borrar el producto?")) {
      const response = await fetch(`http://localhost:3002/productos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProductos(productos.filter((producto) => producto.id !== id));
      }
    }
  };

  return (
    <div>
      <h1>Productos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre del producto: </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="precio">Precio del producto:</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
          />
        </div>
        {productoId === 0 && <button type="submit">Agregar Producto</button>}
      </form>
      {productoId !== 0 && (
        <>
          <button onClick={modificarProductoApi}>Modificar</button>
          <button
            onClick={() => {
              setproductoId(0);
              setNombre("");
              setPrecio(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}

      <h3>Lista de productos</h3>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {`producto ${producto.id}:`} <br />
            {`Nombre= ${producto.nombre}`} <br />
            {`Precio = ${producto.precio}`} <br />
            <br />
            <button
              onClick={() => modificarProducto(producto)}
              disabled={productoId !== 0}
            >
              Editar
            </button>
            <button
              onClick={() => quitarProducto(producto.id)}
              disabled={productoId !== 0}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;