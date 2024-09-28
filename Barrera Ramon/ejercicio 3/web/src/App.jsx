import { useEffect } from "react";
import { useState } from "react";

function App(){
  const[productos, setProductos] =useState([])
  const [producto, setProducto] = useState("")
  const [precio, setPrecio] = useState()
  const [productosID, setProductosID] = useState(0)


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

  const modificarProductos = (producto) => {
    setProducto(producto.producto)
    setPrecio(producto.precio)
    setProductosID(producto.id)
  }

  const modificarProductosApi = async()=>{
    const res = await fetch(`http://localhost:3000/productos/${productosID}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ producto, precio }),
    }
    )
    if (res.ok) {
      const { data } = await res.json();
      setProductos(productos.map((p) => (p.id === data.id ? data : p)));
      setProducto("");
      setPrecio(0);
      setProductosID(0);
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
    <form action="" onSubmit={productosID === 0 ? handleSubmit : modificarProductosApi}>
      <h1>Verduleria </h1>
      <label>Producto:  </label> <br />
      <input type="text" id="producto"
      value={producto} onChange={(e) => setProducto(e.target.value)} /> <br />
      <label htmlFor="">Precio:  </label><br />
      <input type="number" id="precio"
      value={precio} onChange={(e) => setPrecio(e.target.value)} /> <br /> 
      <button type="submit">  {productosID === 0 ? "Agregar" : "Actualizar"}</button>
    </form>
    <ul>
      {productos.map((ta) => {
        return ( <li key={ta.id}>{ta.producto} $ {ta.precio} 
        <button onClick={() => eliminarProduc(ta.id)}>Eliminar</button> 
        <button onClick={() => modificarProductos(ta)}>Modificar</button>
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