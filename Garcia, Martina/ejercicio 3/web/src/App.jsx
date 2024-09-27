import { useEffect, useState } from "react"

function App() {
  const [listado, setListado] = useState([])
  const [listadoId, setListadoId] = useState(0)
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState(0)

  const getListado = async () => {
    const response = await fetch("http://localhost:3000/verduleria")
    if (response.ok) {
      const { listado } = await response.json()
      setListado(listado)
    }
  }

  useEffect(() => {
    getListado()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/verduleria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    })
  
    if (response.ok) {
      const { producto } = await response.json()
      setListado([...listado, producto])
      setNombre("")
      setPrecio(0)
    }
  }
  
  const modificarProducto = (producto) => {
    setListadoId(producto.id)
    setNombre(producto.nombre)
    setPrecio(producto.precio)
  }

  const modificarProductoApi = async () => {
    const response = await fetch(`http://localhost:3000/verduleria/${listadoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    })
    if (response.ok) {
      const { producto } = await response.json()
      setListado(listado.map((s) => (s.id == producto.id ? producto : s)))
      setNombre("")
      setPrecio(0)
    }
  }


  const quitarProducto = async (id) => {
    if (confirm("¿Desea quitar el producto?")) {
      const response = await fetch(`http://localhost:3000/verduleria/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setListado(listado.filter((producto) => producto.id !== id))
      }
    }
  }

  return (
    <>
    <h2>Ejercicio 3</h2>
    <h3>Verdulería</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            id="nomvre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
        {listadoId === 0 && <button type="submit">Agregar</button>}
      </form>
      {listadoId !== 0 && (
        <>
          <button onClick={() => modificarProductoApi()}>Modificar</button>
          <button
            onClick={() => {
              setListadoId(0);
              setNombre("");
              setPrecio(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {listado.map((producto) => (
          <li key={producto.id}>
            {`${producto.id}: Producto: ${producto.nombre}, Precio: $${producto.precio}`}
            <button onClick={() => modificarProducto(producto)} disabled={listadoId !== 0}>
              E
            </button>
            <button onClick={() => quitarProducto(producto.id)} disabled={listadoId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}


export default App
