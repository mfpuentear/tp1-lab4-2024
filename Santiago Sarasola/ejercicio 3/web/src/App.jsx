import { useEffect } from 'react'
import { useState } from 'react';
import './App.css'

function App() {
  const[productos, setProductos] = useState([]);
  const [operacionDesactivada, setOperacionDesactivada] = useState(false);
  const[nombre, setNombre] = useState(null);
  const[precio, setPrecio] = useState(0);
  const[productoACambiar, setProductoACambiar] = useState(null);

  const getProductos =async()=>{
    const response = await fetch("http://localhost:3000/productos");
    if(response.ok){
      const {productos} = await response.json();
      setProductos(productos);
    };
  };

  useEffect(() => {
    getProductos();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!nombre){
      alert("Por favor provea nombre para el producto!");
      return;
    }
    const response = await fetch("http://localhost:3000/productos",{
      method:"POST", 
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ nombre, precio})
    });
    if(response.ok){
        const {nuevoProducto} = await response.json();
        setProductos([...productos, nuevoProducto]);
        setNombre('');
        setPrecio(0);
      }else{
        const errorData = await response.json();
        alert(errorData.mensaje);
      }
    };

  const quitarProducto = async(id) => {
    if(confirm("¿Desea quitar el producto?")){
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method:"DELETE",
      });
      if(response.ok){
        setProductos(productos.filter((producto) => producto.id != id));
      };
    };
  };

  const modificarProducto = (producto) => {
    setProductoACambiar(producto);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setOperacionDesactivada(true);
  };

  const modificarProductoApi = async ()=> {
    const response = await fetch(`http://localhost:3000/productos/${productoACambiar.id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify( {nombre, precio} )
    });
    if(response.ok){
      const {productoModificado} = await response.json();
      setProductos(productos.map((p) => (p.id == productoModificado.id ? productoModificado : p)));
      setNombre('');
      setPrecio(0);
      setProductoACambiar(null);
      setOperacionDesactivada(false);
    }else{
      const errorData = await response.json();
      alert(errorData.mensaje);
    }
  };

  return (
    <>
    <div className='conteiner'>
      <h1>Productos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input 
            type="text"
            id="nombre" 
            value={nombre} 
            onChange={(e) => setNombre((e.target.value))}
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
        <br></br>
        {productoACambiar === null && <button type='submit'>Agregar Producto</button>}
      </form>
        {productoACambiar != null && 
          (
          <>
          <button onClick={() => modificarProductoApi()}>Modificar Producto</button>
          <button onClick={() => {
            setProductoACambiar(null);
            setNombre('');
            setPrecio(0);
            setOperacionDesactivada(false);
          }}>Cancelar</button>
          </>
          )}
    </div>
    <br></br>
    <div className="operaciones-container">
      <div className="operacion">
        <h3>Listado de Productos!</h3>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              <span>{`Id:${producto.id} ➡️ Nombre: ${producto.nombre} | Precio: ${producto.precio}`}</span>
              <button disabled={operacionDesactivada} onClick={() => modificarProducto(producto)}>✏️</button>
              <button disabled={operacionDesactivada} onClick={() => quitarProducto(producto.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App