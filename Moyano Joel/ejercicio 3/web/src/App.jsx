import { useState, useEffect } from 'react'

function App() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    const fetchProductos = async () => {
      const res = await fetch('http://localhost:3000/productos')
      const data = await res.json()
      setProductos(data)
    }
    fetchProductos()
  }, [])

  const agregarProducto = async () => {
    const res = await fetch('http://localhost:3000/productos', {method: 'POST',headers: {'Content-Type': 'application/json',}, body: JSON.stringify({ nombre, precio: parseFloat(precio) }),
    })

    if (res.ok) {
      const nuevoProducto = await res.json()
      setProductos([...productos, nuevoProducto])
      setNombre('')
      setPrecio('')
    } else {
      const error = await res.json()
      console.error('Error al agregar producto:', error)
    }
  };

  const modificarProducto = async () => {
    const res = await fetch(`http://localhost:3000/productos/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, precio: parseFloat(precio) }),
    });

    if (res.ok) {
      const productoModificado = await res.json()
      setProductos(productos.map(p => (p.id === productoModificado.id ? productoModificado : p)))
      setNombre('')
      setPrecio('')
      setEditId(null)
    } else {
      const error = await res.json()
      console.error('Error al modificar producto:', error)
    }
  };

  const quitarProducto = async (id) => {
    if (confirm("¿Desea quitar este producto?")) {
      const res = await fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setProductos(productos.filter(producto => producto.id !== id))
      } else {
        const error = await res.json()
        console.error('Error al quitar producto:', error)
      }
    }
  }

  const editarProducto = (producto) => {
    setEditId(producto.id)
    setNombre(producto.nombre)
    setPrecio(producto.precio)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editId ? modificarProducto() : agregarProducto()
  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre del producto"/>
        <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="Precio"/>
        <button type="submit">{editId ? "Modificar Producto" : "Agregar Producto"}</button>
      </form>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio}
            <button onClick={() => editarProducto(producto)}>Editar</button>
            <button onClick={() => quitarProducto(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
