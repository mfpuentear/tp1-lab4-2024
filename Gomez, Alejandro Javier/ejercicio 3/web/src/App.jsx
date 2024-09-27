import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [precio, setPrecio] = useState(0);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const fetchProductos = async () => {
    const response = await fetch(
      "http://localhost:3000/productos/listaProductos"
    );
    if (response.ok) {
      const data = await response.json();
      setProductos(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:3000/productos/listaProductos",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreProducto, precio }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setProductos([...productos, data.producto]);
      setNombreProducto("");
      setPrecio(0);
    }
  };

  const quitarProducto = async (id) => {
    if (confirm("¿Desea quitar el producto?")) {
      const response = await fetch(
        `http://localhost:3000/productos/listaProductos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProductos(productos.filter((producto) => producto.id !== id));
      }
    }
  };

  const activarModoEdicion = (id, nombreProducto, precio) => {
    setModoEdicion(true);
    setIdEditar(id);
    setNombreProducto(nombreProducto);
    setPrecio(precio);
  };

  const modificarProducto = async (id) => {
    const response = await fetch(
      `http://localhost:3000/productos/listaProductos/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreProducto, precio }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data.producto) {
        setProductos(
          productos.map((producto) =>
            producto.id === id ? data.producto : producto
          )
        );
      }

      setNombreProducto("");
      setPrecio("");
      setModoEdicion(false);
      setIdEditar(null);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <>
      <div className="App-container">
        <form onSubmit={handleSubmit} className="card">
          <span>Producto</span>
          <input
            required
            type="text"
            id="nombreProducto"
            value={nombreProducto}
            onChange={(event) => setNombreProducto(event.target.value)}
          />

          <span>Precio</span>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(event) => setPrecio(parseFloat(event.target.value))}
          />

          <div className="botones">
            <button type="submit" disabled={modoEdicion}>
              Enviar
            </button>
            <button
              type="button"
              onClick={() => modificarProducto(idEditar)}
              disabled={!modoEdicion}
            >
              Modificar
            </button>
          </div>
          {precio < 0 && (
            <p style={{ color: "red" }}>El precio no puede ser negativo</p>
          )}
        </form>

        <div className="listas-container">
          <div className="lista card">
            <span>Lista de productos:</span>
            <ul>
              {productos.map((producto) => (
                <li key={producto.id}>
                  <span>
                    {producto.nombreProducto}: ${producto.precio}
                  </span>
                  <button
                    onClick={() =>
                      activarModoEdicion(
                        producto.id,
                        producto.nombreProducto,
                        producto.precio
                      )
                    }
                  >
                    ✏️
                  </button>
                  <button onClick={() => quitarProducto(producto.id)}>
                    ❌
                  </button>
                  <br />
                  <br />
                  <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
