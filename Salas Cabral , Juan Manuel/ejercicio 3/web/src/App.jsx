import { useState, useEffect } from "react"
import "./App.css"

function App(){
  const [productos, setProductos] = useState([])

  const [nombre, setNombre] = useState("")

  const [precio, setPrecio] = useState(0)

  const [editar, seteditar] = useState(null)

  const link = "http://localhost:3000/api/productos"

  useEffect(() => {
    const fetchProductos = async () => {
      const res = await fetch(link)
      if (res.ok) {
        const lista = await res.json()
        setProductos(lista)
      }
    }
    fetchProductos()
  }, [])
  const agregarlo = async () => {
    const res = await fetch(link, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({nombre,precio,}),
    })
    if (res.ok) {
      const productonuevo = await res.json()
      if (productonuevo.error) {
        alert(productonuevo.error)
        return
      }
      console.log(productonuevo)
      setProductos([...productos, productonuevo])
    }
  }
  const editarlo = (producto) => {
    seteditar(producto)
    setNombre(producto.nombre)
    setPrecio(producto.precio)
  }
  const guardarlo = async () => {
    const res = await fetch(`${link}/${editar.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({nombre,precio,}),
    })
    if (res.ok) {
      const producto = await res.json()
      if (producto.error) {
        alert(producto.error)
        return
      }
      setProductos(productos.map((p) => (p.id === producto.id ? producto : p)))
      limpiar()
    }
  }
  const eliminarlo = async (id) => {
    const res = await fetch(`${link}/${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      setProductos(productos.filter((p) => p.id !== id))
    }
  }
  const limpiar = () => {
    setNombre("")
    setPrecio(0)
    seteditar(null)
  }
  return (
    <>
      <form>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input value={nombre} type="text" onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="precio">Precio: </label>
          <input value={precio} type="number" onChange={(e) => setPrecio(parseFloat(e.target.value))} step={0.01}/>
        </div>
        {!editar && (<button type="button" onClick={agregarlo}>Agregar</button>)}
        {editar && (<button type="button" onClick={guardarlo}>Guardar</button>)}
        <button type="button" onClick={limpiar}>Cancelar</button>
      </form>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio}
            <button onClick={() => editarlo(p)}>Editar</button>
            <button onClick={() => eliminarlo(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  )
}
export default App
