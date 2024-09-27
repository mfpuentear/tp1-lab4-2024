import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [vegetales, setVegetales] = useState([])
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState(0)
  const [editar, setEditar] = useState(null)

  const URL = "http://localhost:3000/vegetales"
  useEffect(() => {
    const fetchVegetales = async () => {
      const res = await fetch(URL)

      if (res.ok) {
        const lista = await res.json()
        setVegetales(lista)
      }
    }
    fetchVegetales()
  }, [])

  const agregarVegetal = async () => {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        precio,
      }),
    })

    if (res.ok) {
      const nuevoVegetal = await res.json()
      if (nuevoVegetal.error) {
        alert(nuevoVegetal.error)
        return
      }
      console.log(nuevoVegetal)
      setVegetales([...vegetales, nuevoVegetal])
    }
  }

  const editarVegetal = (Vegetal) => {
    setEditar(Vegetal)
    setNombre(Vegetal.nombre)
    setPrecio(Vegetal.precio)
  }

  const guardarVegetal = async () => {
    const res = await fetch(`${URL}/${editar.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        precio,
      }),
    })

    if (res.ok) {
      const Vegetal = await res.json()
      if (Vegetal.error) {
        alert(Vegetal.error)
        return
      }
      setVegetales(vegetales.map((p) => (p.id === Vegetal.id ? Vegetal : p)))
      limpiar()
    }
  }

  const eliminarVegetal = async (id) => {
    const res = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      setVegetales(vegetales.filter((p) => p.id !== id))
    }
  }

  const limpiar = () => {
    setNombre("")
    setPrecio(0)
    setEditar(null)
  }

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
        <div>
          <label htmlFor="precio">Precio: </label>
          <input
            value={precio}
            type="number"
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
            step={0.01}
          />
        </div>
        {!editar && (
          <button type="button" onClick={agregarVegetal}>
            Agregar
          </button>
        )}
        {editar && (
          <button type="button" onClick={guardarVegetal}>
            Guardar
          </button>
        )}
        <button type="button" onClick={limpiar}>
          Cancelar
        </button>
      </form>

      <ul>
        {vegetales.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio}
            <button onClick={() => editarVegetal(p)}>Editar</button>
            <button onClick={() => eliminarVegetal(p.id)}>Quitar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App