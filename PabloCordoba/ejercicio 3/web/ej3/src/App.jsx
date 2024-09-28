import { useEffect, useState } from 'react'

function App() {
  const [producto, setProducto] = useState({
    prod : "",
    precio: ""
  })
  const [editado, setEditado] = useState(false);
  const [indiceActual, setIndiceActual] = useState(null);
  
  const [lista, setLista] = useState([])

  const handleInputChange = (e)=>{
    setProducto({
      ...producto,
      [e.target.id]: e.target.value
    })
  }

  useEffect(()=>{
    fetch("http://localhost:5300/productos")
    .then(data => data.json())
    .then(res => setLista(res))
  })



  const Eliminar = (indice)=>{
    fetch(`http://localhost:5300/productos/${indice}`, {
      method: "DELETE"
    })
    .then(data=>data.json())
    .then(res=>setLista(res))}

  const handleSubmit = () => {
    if (editado) {
      fetch(`http://localhost:5300/productos/${indiceActual}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          producto: producto.prod,
          precio: Number(producto.precio)
        })
      })
      .then(data => data.json())
      .then(res => {setLista(res)
        setProducto({ 
          prod: "", 
          precio: "" })
        setEditado(false);
        setIndiceActual(null);
      })
    } else {
       fetch("http://localhost:5300/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          producto: producto.prod,
          precio: Number(producto.precio)
        })
      })
      .then(data => data.json())
      .then(res => {
        if (res.mensaje) {
        } else {
          setLista(res);
        }
        setProducto({ 
          prod: "", 
          precio: "" });  
      })
      const Editar = (indice) => {
        setProducto({
          prod: lista[indice].prod,
          precio: lista[indice].precio
        });
        setEditado(true)
        setIndiceActual(indice)
      };


  }

  return (
    <>
      <label htmlFor='producto'>Producto</label>
      <input type='text' id='producto' onChange={handleInputChange}></input>
      <label htmlFor='precio'>Precio</label>
      <input type='number' id='precio' onChange={handleInputChange}></input>
      <button onClick={handleSubmit}> {editado ? "Modificar Producto" : "Agregar Producto"}</button>

      <p>Listado de productos</p>
      <ul>
        {
          lista.length > 0 &&
          lista.map((producto,indice) =>(
            <li key={indice}>{producto[0]} - $ {producto[1]}
            <button onClick={() => Editar(indice)}>Editar</button>
            <button onClick={() => Eliminar(indice)}>Eliminar</button>
            </li>
            
          ))
        }
      </ul>
    </>
  )
  }}
export default App
