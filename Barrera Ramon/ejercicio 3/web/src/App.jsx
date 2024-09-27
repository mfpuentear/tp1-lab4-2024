import { useEffect } from "react";
import { useState } from "react";

function App(){
  const[productos, setProductos] =useState([])
  const [producto, setProducto] = useState("")
  const [precio, setPrecio] = useState()


  const getProductos = async () => {
    const res = await fetch ("http://localhost:3000/productos")
    if (res.ok) {
      const data = await res.json()
      setProductos(data.productos)
      setProducto("")
      setPrecio("")
    }
  }

  useEffect(()=>{
    getProductos()
  },[])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:3000/productos",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({ producto , precio})
    });
  if(res.ok){
    const { data } = await res.json()
    getProductos([...productos, data])
  }
  
  }
  const eliminarProduc = async (id) => {
    if (confirm("¿Quiere borrar el producto?")) {
      const res = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProductos(productos.filter((ta) => ta.id !== id));
      }
    }
  };
  
  return (
    <>
    <form action="" onSubmit={handleSubmit}>
      <h1>Verduleria </h1>
      <label>Producto:  </label> <br />
      <input type="text" id="producto"
      value={producto} onChange={(e) => setProducto(e.target.value)} /> <br />
      <label htmlFor="">Precio:  </label><br />
      <input type="number" id="precio"
      value={precio} onChange={(e) => setPrecio(e.target.value)} /> <br />      <button type="submit">Agregar</button>
    </form>
    <ul>
      {productos.map((ta) => {
        return ( <li key={ta.id}>{ta.producto} $ {ta.precio} 
        <button onClick={() => eliminarProduc(ta.id)}>Eliminar</button> 
        </li> )
      })}
    </ul>
    {/* <p>
        Tareas: {calcTarea.total} - Completadas: {calcTarea.completadas} - Incompletas:{" "}
        {calcTarea.total - calcTarea.completadas}
      </p> */}
    </>
  )
  }

export default App