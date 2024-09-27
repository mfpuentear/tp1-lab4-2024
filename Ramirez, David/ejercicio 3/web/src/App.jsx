import { useEffect, useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState(0);
  const [nombreProducto, setNombreProducto] = useState("");
  const [precio, setPrecio] = useState(0);

  // lista de productos
  const getProductos = async () => {
    const response = await fetch("http://localhost:3000/productos");
    if (response.ok) {
      const { productos } = await response.json();
      setProductos(productos);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  // formulario para agg producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ producto: nombreProducto, precio }),
    });

    if (response.ok) {
      const { produc } = await response.json();
      setProductos([...productos, produc]);
      setNombreProducto("");
      setPrecio(0);
    }
  };

  // Llena los campos para modificar un producto.
  const modificarProducto = (producto) => {
    setProductoId(producto.id);
    setNombreProducto(producto.producto);
    setPrecio(producto.precio);
  };

  // modificar producto existente.
  const modificarProductoApi = async () => {
    const response = await fetch(`http://localhost:3000/productos/${productoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ producto: nombreProducto, precio }),
    });
    if (response.ok) {
      const { produc } = await response.json();
      setProductos(productos.map((p) => (p.id === produc.id ? produc : p)));
      setNombreProducto("");
      setPrecio(0);
      // mejorar con un if. preg 
    }
  };

  // eliminar producto.
  const quitarProducto = async (id) => {
    if (confirm("¿Desea quitar el producto?")) {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProductos(productos.filter((p) => p.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Productos Ej3 Ramirez</h1>
      <h2>Listado de Precios</h2>
      <h3>Agregar un nuevo Producto</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="producto">Producto: </label>
          <input
            type="text"
            id="producto"
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="precio">Precio: </label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
          />
        </div>
        {productoId === 0 && <button type="submit">Agregar</button>}
      </form>
      {productoId !== 0 && (
        <>
          <button onClick={() => modificarProductoApi()}>Modificar</button>
          <button
            onClick={() => {
              setProductoId(0);
              setNombreProducto("");
              setPrecio(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {`${producto.id}: ${producto.producto} - Precio: $${producto.precio}`}
            <button onClick={() => modificarProducto(producto)} disabled={productoId !== 0}>
              Editar
            </button>
            <button onClick={() => quitarProducto(producto.id)} disabled={productoId !== 0}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
