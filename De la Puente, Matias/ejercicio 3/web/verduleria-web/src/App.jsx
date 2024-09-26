import { useState, useEffect } from "react"

function App() {

  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [productoId, setProductoId] = useState(0);

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

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nombre, precio})
    });
    if(response.ok){
      getProductos();
      setNombre("");
      setPrecio(0);
    }else{
      const errorData = await response.json();
      alert(errorData.error);
    }
  }

  const handleRemove = async (id) =>{
    const producto = productos.find((prod) => prod.id == id);
    if(confirm(`¿Desea eliminar el producto ${producto.nombre} de la lista?`)){
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE"
      });
      if(response.ok){
        getProductos();
      }
    }
  }

  const handleEdit = (producto) =>{
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setProductoId(producto.id);
  }

  const handleActualizar = async () =>{
    const response = await fetch(`http://localhost:3000/productos/${productoId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nombre, precio})
    });
    if(response.ok){
      getProductos();
      setNombre("");
      setPrecio(0);
      setProductoId(0);
    }else{
      const errorData = await response.json();
      alert(errorData.error); 
    }
  }

  return (
    <>
      <h1>Productos de Verduleria</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Producto:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="precio">Precio:</label>
          <input type="number" id="precio" value={precio} onChange={(e)=>setPrecio(parseFloat(e.target.value))} />
        </div>
        {productoId == 0 && <button type="submit">Agregar</button>}
      </form>
      {productoId !== 0 && (
        <>
          <button onClick={()=> handleActualizar()}>Modificar</button>
          <button onClick={()=>{
            setNombre("");
            setPrecio(0);
            setProductoId(0);
          }}>Cancelar</button>
        </>
      )}
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>{`Id: ${prod.id} / Nombre: ${prod.nombre} / Precio: $${prod.precio} `}
          <button onClick={()=> handleRemove(prod.id)} disabled={productoId !== 0}>X</button>
          <button onClick={() => handleEdit(prod)} disabled={productoId !== 0}>E</button></li>
        ))}
      </ul>
    </>
  )
}

export default App
