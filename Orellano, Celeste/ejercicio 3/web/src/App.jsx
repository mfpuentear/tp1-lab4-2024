import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [editandoProducto, setEditandoProducto] = useState(null);
  const URL = "http://localhost:3000/api/productos";

  useEffect(() => {
    const obtenerProductos = async () => {
      const res = await fetch(URL);

      if (res.ok) {
        const lista = await res.json();
        setProductos(lista);
      }
    };
    obtenerProductos();
  }, []);

  const limpiarFormulario = () => {
    setNombre("");
    setPrecio(0);
    setEditandoProducto(null);
  };

  const agregarProducto = async () => {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });

    if (res.ok) {
      const nuevoProducto = await res.json();
      if (nuevoProducto.error) {
        alert(nuevoProducto.error);
        return;
      }
      setProductos([...productos, nuevoProducto]);
      limpiarFormulario();
    }
  };

  const editarProducto = (producto) => {
    setEditandoProducto(producto);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  const guardarProducto = async () => {
    const res = await fetch(`${URL}/${editandoProducto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });

    if (res.ok) {
      const productoActualizado = await res.json();
      if (productoActualizado.error) {
        alert(productoActualizado.error);
        return;
      }
      setProductos(
        productos.map((p) => (p.id === productoActualizado.id ? productoActualizado : p))
      );
      limpiarFormulario();
    }
  };

  const eliminarProducto = async (id) => {
    const res = await fetch(`${URL}/${id}`, { method: "DELETE" });

    if (res.ok) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="precio">Precio: </label>
          <input
            type="number"
            step={0.01}
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
          />
        </div>
        {!editandoProducto ? (
          <button type="button" onClick={agregarProducto}>
            Agregar
          </button>
        ) : (
          <button type="button" onClick={guardarProducto}>
            Guardar
          </button>
        )}
        <button type="button" onClick={limpiarFormulario}>
          Cancelar
        </button>
      </form>

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio}
            <button onClick={() => editarProducto(p)}>Editar</button>
            <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
