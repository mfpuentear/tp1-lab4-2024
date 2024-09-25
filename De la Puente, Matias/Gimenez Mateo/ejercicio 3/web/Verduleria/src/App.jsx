import { useState, useEffect } from 'react';

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [idEditar, setIdEditar] = useState(null);

  const mostratProductos = async () => {
    const res = await fetch("http://localhost:3000/productos");
    if (res.ok) {
      const { productos } = await res.json();
      setProductos(productos);
    }
  };

  useEffect(() => {
    mostratProductos();
  }, []);

  const AgregarProductos = async () => {
    const res = await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });
    if (res.ok) {
      await mostratProductos(); // Actualizar la lista después de agregar un producto
      setNombre('');
      setPrecio(0); 
    }
  };

  const EditarProducto = async () => {
    const res = await fetch(`http://localhost:3000/productos/${idEditar}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });
    if (res.ok) {
      await mostratProductos(); // Actualizar la lista después de editar un producto
      setNombre('');
      setPrecio(0); 
      setIdEditar(null); 
    }
  };

  const EliminarProducto = async (id) => {
    const res = await fetch(`http://localhost:3000/productos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      await mostratProductos(); // Actualizar la lista después de eliminar un producto
    }   
  };

  const iniciarEdicion = (producto) => {
    setIdEditar(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  return (
    <>
      <div style={{textAlign:"center"}}>

        <h1>Verdulería</h1>

        <input type="text" value={nombre} placeholder='Nombre' onChange={(e) => setNombre(e.target.value)} />

        <input type="number" value={precio} placeholder='Precio' onChange={(e) => setPrecio(Number(e.target.value))} />

        <button  disabled={!nombre || !precio} onClick={idEditar ? EditarProducto : AgregarProductos}>{idEditar ? "Actualizar" : "Agregar"}</button>

      </div>
      <div style={{textAlign:"center"}}>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.id}.. {producto.nombre} con ${producto.precio}
              <button onClick={() => iniciarEdicion(producto)}>Editar</button>
              <button onClick={() => EliminarProducto(producto.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      
    </>
  );
}

export default App;
