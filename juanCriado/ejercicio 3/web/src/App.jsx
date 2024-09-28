import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [productos, setProductos] = useState([]);

  const URL = "http://localhost:3000/api/productos";
  useEffect(() => {
    const fetchProductos = async () => {
      const res = await fetch(URL);

      if (res.ok) {
        const lista = await res.json();
        setProductos(lista);
      }
    };
    fetchProductos();
  }, []);

  const agregarProducto = async () => {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        precio,
      }),
    });

    if (res.ok) {
      const nuevoProducto = await res.json();
      if (nuevoProducto.error) {
        alert(nuevoProducto.error);
        return;
      }
      // console.log(nuevoProducto);
      setProductos([...productos, nuevoProducto]);
      setNombre("");
      setPrecio("");
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
      body: JSON.stringify({
        nombre,
        precio,
      }),
    });

    if (res.ok) {
      const producto = await res.json();
      if (producto.error) {
        alert(producto.error);
        return;
      }
      setProductos(productos.map((p) => (p.id === producto.id ? producto : p)));
      limpiar();
    }
  };

  const eliminarProducto = async (id) => {
    const res = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  const limpiar = () => {
    setNombre("");
    setPrecio(0);
    setEditandoProducto(null);
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            value={nombre}
            type="text"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="precio">Precio: </label>
          <input
            value={precio}
            type="number"
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
            step={0.01}
          />
        </div>
        {!editandoProducto && (
          <button type="button" onClick={agregarProducto}>
            Agregar
          </button>
        )}
        {editandoProducto && (
          <button type="button" onClick={guardarProducto}>
            Guardar
          </button>
        )}
        <button type="button" onClick={limpiar}>
          Cancelar
        </button>
      </form>

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio}
            <button onClick={() => editarProducto(p)}>editar</button>
            <button onClick={() => eliminarProducto(p.id)}>elimnar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
