import { useEffect, useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [productoId, setProductoId] = useState(0);

  const getProductos = async () => {
    const response = await fetch("http://localhost:3000/verduleria");
    if (response.ok) {
      const { productos } = await response.json();
      setProductos(productos);
      console.log(productos)
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/verduleria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });

    if (response.ok) {
      const { producto } = await response.json();
      setProductos([...productos, producto]);
      setA(0);
      setB(0);
    }
  };

  const modificarProducto = (producto) => {
    setProductoId(producto.id);
    setA(producto.a);
    setB(producto.b);
  };

  const modificarProductoApi = async () => {
    const response = await fetch(`http://localhost:3000/verduleria/${productoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });

    if (response.ok) {
      const { producto } = await response.json();
      setProductos(productos.map((a) => (a.id == producto.id ? producto : a)));

      setA(0);
      setB(0);
      setProductoId(0);
    }
  };

  const quitarProducto = async (id) => {
    if (confirm("¿Desea quitar el producto?")) {
      const response = await fetch(`http://localhost:3000/verduleria/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProductos(productos.filter((producto) => producto.id !== id));
      }
    }
  };

  return (
    <>
    <h2>Ejercicio 3</h2>
    <h3>Productos</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">Nombre: </label>
          <input
            type="text"
            id="a"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="b">Precio: </label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        {productoId === 0 && 
        <button 
        type="submit">
          Agregar
        </button>}
      </form>
      {productoId !== 0 && (
        <>
          <button 
          onClick={() => modificarProductoApi()}>
            Modificar
          </button>
          <button
            onClick={() => {
              setProductoId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {`${producto.id}: ${producto.a} - $${producto.b}`}
            <button 
            onClick={() => modificarProducto(producto)} 
            disabled={productoId !== 0}>
              E
            </button>
            <button 
            onClick={() => quitarProducto(producto.id)} 
            disabled={productoId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;