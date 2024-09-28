import { useEffect, useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [productoId, setProductoId] = useState(0);

  const getProductos = async () => {
    const response = await fetch("http://localhost:3000/productos/");
    if (response.ok) {
      const { productos } = await response.json();
      setProductos(productos);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  // Agregar un nuevo producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/productos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });
    if (response.ok) {
      const { producto } = await response.json();
      setProductos([...productos, producto]); // Solo añadir el producto nuevo
      resetForm(); // Resetear el formulario después de añadir
    }
  };

  // Modificar un producto existente
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
      setProductos(productos.map((p) => (p.id === producto.id ? producto : p)));
      setNombre("");
      setPrecio(0);
      setProductoId(0);
    }
  };

  const quitarProducto = async (id) => {
    if (confirm("¿Desea quitar el producto?")) {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProductos(productos.filter((producto) => producto.id !== id));
      }
    }
  };

  // Prepara los datos de un producto para modificar
  const modificarProducto = (producto) => {
    setProductoId(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  // Resetear formulario y estado de edición
  const resetForm = () => {
    setProductoId(0);
    setNombre("");
    setPrecio(0);
  };

  return (
    <>
      <h1>Productos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre del producto</label>
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
        {productoId === 0 ? (
          <button type="submit">Agregar</button>
        ) : (
          <>
            <button type="button" onClick={modificarProductoApi}>
              Modificar
            </button>
            <button type="button" onClick={resetForm}>
              Cancelar
            </button>
          </>
        )}
      </form>

      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {`${producto.id}: ${producto.nombre}, Precio: $${producto.precio}`}
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
    </>
  );
}

export default App;
