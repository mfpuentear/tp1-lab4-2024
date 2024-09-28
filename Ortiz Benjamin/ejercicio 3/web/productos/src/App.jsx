import { useState, useEffect } from "react";

function App() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState(null);

  const getProductos = async () => {
    const response = await fetch("http://localhost:3000/productos");
    if (response.ok) {
      const data = await response.json();
      setProductos(data.productos);
    }
  };

  useEffect(() => {
    getProductos();
  }, [productos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });
    if (response.ok) {
      const data = await response.json();
      setProductos([...productos, data]);
      setNombre("");
      setPrecio(0);
    }
  };

  const modificarProducto = (producto) => {
    setProductoId(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  const modificarProductoApi = async () => {
    const response = await fetch(
      `http://localhost:3000/productos/${productoId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio }),
      }
    );
    if (response.ok) {
      const { producto } = await response.json();
      setProductos(
        productos.map((rect) => (rect.id === producto.id ? producto : rect))
      );
      setNombre("");
      setPrecio(0);
      setProductoId(null);
    }
  };

  const eliminar = async (id) => {
    if (confirm("desea eliminar el producto?")) {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProductos(productos.filter((rect) => rect.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Productos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
          />
        </div>
        {productoId === null && <button type="submit">Agregar</button>}
      </form>
      {productoId !== null && (
        <>
          <button onClick={() => modificarProductoApi()}>Editar</button>
          <button
            onClick={() => {
              setProductoId(null);
              setNombre("");
              setPrecio(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}

      <ul>
        {productos.map((rectangulo) => (
          <li key={rectangulo.id}>
            {`Producto ${rectangulo.id}:`}
            <br></br>
            {`Nombre: ${rectangulo.nombre}`} <br></br>
            {`Precio:$ ${rectangulo.precio}`}
            <br></br>
            <button onClick={() => eliminar(rectangulo.id)}>X</button>
            <button onClick={() => modificarProducto(rectangulo)}>e</button>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
