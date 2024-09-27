import { useState } from 'react'

function App() {
  const [lista, setLista] = useState([])
  const [nombre,setNombre]= useState("")
  const [precio,setPrecio]=useState(0)
  const [productoId,setProductoId]=useState(0)

  const handleSubmit = async(e)=>{
    e.preventDefault()

    if (lista.find((item)=>item.nombre==nombre)){
      alert("El producto ya existe")
      setNombre("")
    }
    else{
      const response = await fetch("http://localhost:3000/productos",{
        method:"POST",
        body: JSON.stringify({nombre,precio}),
        headers: {"Content-Type":"application/json"}
      })
      if (response.ok){
        const producto = await response.json()
  
        setLista([...lista,producto])
        setNombre("")
        setPrecio(0)
      }
    }
    
  }

  const handleQuitar = async(id)=>{
    if (confirm("Desea eliminar este elemento?")){
      const response = await fetch(`http://localhost:3000/productos/${id}`,{
        method:"DELETE"
      })
      if (response.ok){
        setLista(lista.filter((item)=>item.id!==id))
      }
    }
    
  }

  const handleEditar = (item)=>{
    setProductoId(item.id)
    setNombre(item.nombre)
    setPrecio(item.precio)
  }

  const modificarApi = async()=>{
    if (!lista.find((item)=>item.nombre==nombre && item.id!==productoId)){
      const response = await fetch(`http://localhost:3000/productos/${productoId}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({nombre,precio})})

      if (response.ok){
        const producto = await response.json()
        setLista(lista.map((i)=>i.id===producto.id ? producto: i))
        setProductoId(0)
      }
    }
    else{
      alert("El producto ya existe")
      setNombre("")
      setPrecio(0)
      setProductoId(0)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
        <label htmlFor="Nombre">Nombre del producto</label>
        <input type="text" onChange={(e)=>setNombre(e.target.value)} value={nombre} id='Nombre' />

        <label htmlFor="Precio">Precio del producto</label>
        <input type="number" onChange={(e)=>setPrecio(e.target.value)} value={precio} id='Precio'/>

        <button type='submit' disabled={productoId!=0 || nombre=="" || precio<=0}>Agregar</button>
      </div>
    </form>

    {productoId!==0 && (
      <>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <button onClick={()=>modificarApi()} disabled={nombre=="" || precio<=0} >Modificar</button>
        <button onClick={()=>setProductoId(0)}>Cancelar</button>
      </div>
      </>
    )}

    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <ul>
        {lista.map((item)=>(<li key={item.id}>{`Id: ${item.id}. Producto: ${item.nombre}. Precio: $${item.precio}`}
          <button onClick={()=>handleQuitar(item.id)} disabled={productoId!==0}>X</button>
          <button onClick={()=>handleEditar(item)} disabled={productoId!==0}>Editar</button>
        </li>))}
      </ul>
    </div>
    
    </>
  )
}

export default App
