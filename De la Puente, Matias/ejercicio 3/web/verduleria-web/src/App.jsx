import { useState, useEffect } from "react"

function App() {

  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);

  const getProductos = async()=>{
    const response = await fetch("http://localhost:3000/productos");
    if(response.ok){
      const {productos} = await response.json();
      setProductos(productos);
    }
  }

  useEffect(()=>{
    getProductos();
  }, []);

  return (
    <>
      <h1>Productos de Verduleria</h1>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>{`Id: ${prod.id} / Nombre: ${prod.nombre} / Precio: $${prod.precio}`}</li>
        ))}
      </ul>
    </>
  )
}

export default App
