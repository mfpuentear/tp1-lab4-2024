import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [productos, setProductos] = useState([{id:1,nombre:"Tomate",precio:998}])

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  useEffect(()=>{
    const getProductos = async ()=>{
      const response = await fetch('http://localhost:3000/productos')
      if (response.ok){
        const data = await response.json()
        const productosNuevos = data.data
        setProductos(productosNuevos)
      }
    }
    getProductos()
  },[])

  const agregarProducto = async () => {
    let peticion = {
      method:"POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({nombre,precio})
    }
    const response = await fetch('http://localhost:3000/productos',peticion)
    if(response.ok){

      const data = await response.json()
      const nuevoProducto = data.data
      setProductos([...productos,nuevoProducto])
    }
  }

  const editarProducto = (producto) =>{
    setProductoSeleccionado(producto)
    setNombre(producto.nombre)
    setPrecio(producto.precio)
  }

  const editarProductoApi = async ()=>{
    let peticion = {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({nombre, precio})
    }

    const response = await fetch(`http://localhost:3000/productos/${productoSeleccionado.id}`,peticion)
    if (response.ok){
      const data = await response.json()
      const nuevoProducto = data.data
      const nuevaLista = productos.map((producto)=> (producto.id == productoSeleccionado.id) ? nuevoProducto : producto)
      setProductos(nuevaLista)
      setProductoSeleccionado(null)
    }
  }

  const eliminarProducto = async(producto) =>{
   if(confirm('Desea Eliminar El producto')){ let peticion = {
      method:'DELETE',
      headers:{'Content-Type':'application/json'}
    }
    const response = await fetch(`http://localhost:3000/productos/${producto.id}`,peticion)
    if (response.ok){
      const nuevaLista = productos.filter((productoA) => productoA.id != producto.id)
      setProductos(nuevaLista)
    }}
  }
  return (
    <div className="container">
      <div className="listadoProductos">
        {productos.map((producto)=>{
          return(
          <div className="producto" key={producto.id}>
            ID: {producto.id} - {producto.nombre} : ${producto.precio}.
            <button className='editar' onClick={()=>editarProducto(producto)}>EDITAR</button>
            <button className='eliminar' onClick={()=>eliminarProducto(producto)}>ELIMINAR</button>
          </div>)} )}
            
      </div>
      <div className="agregarProductos">
        <form > 
          <label htmlFor="nombre">Nombre:
            <input type="text" name="nombre" id="nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
          </label>
          <label htmlFor="precio">Precio:
            <input type="text" name="precio" id="precio" value={precio} onChange={(e)=>setPrecio(e.target.value)}/>
          </label>
          <button type="button" disabled={(productoSeleccionado != null)? true : false} onClick={()=>agregarProducto()}>Agregar</button>
          <button type="button" disabled={(productoSeleccionado == null)? true : false} style={{opacity:(productoSeleccionado == null)? 0 : 1}} onClick={()=>editarProductoApi()}>Guardar</button>
          <button type="button" disabled={(productoSeleccionado == null)? true : false} style={{opacity:(productoSeleccionado == null)? 0 : 1}} onClick={()=>setProductoSeleccionado(null)}>Cancelar</button>
        </form>
      </div>

    </div>
  )
}

export default App
