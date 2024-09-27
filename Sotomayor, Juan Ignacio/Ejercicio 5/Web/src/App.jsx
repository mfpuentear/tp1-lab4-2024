import { useState } from 'react'
function App() {
  const [lista, setLista] = useState([])
  const [nombre,setNombre]=useState("")
  const [estado,setEstado]=useState("Completada")

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if (!lista.find((item)=>item.nombre==nombre)){
      const response = await fetch("http://localhost:3000/tareas/",{
        method:"POST",
        body:JSON.stringify({nombre,estado}),
        headers:{"Content-Type":"application/json"}
      })
      if (response.ok){
        const tarea = await response.json()
        setLista([...lista,tarea])
        setNombre("")
      }
    }
    else{
      alert("Esta tarea ya existe")
      setNombre("")
    }
  }

  const handleQuitar = async(id)=>{
    if (confirm("Desea eliminar este elemento?")){
      const response = await fetch(`http://localhost:3000/tareas/${id}`,{
        method:"DELETE"
      })
      if (response.ok){
        setLista(lista.filter((item)=>item.id!==id))
      }
    }
  }

  const handleCompletar = async(id)=>{
    const tarea = lista.find((item)=>item.id===id)
    const response = await fetch(`http://localhost:3000/tareas/${id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({nombre:tarea.nombre,estado:"Completada"})
    })
    if (response.ok){
      const tarea = await response.json()
      setLista(lista.map((i)=>i.id===tarea.id ? tarea : i))
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <label htmlFor="tarea">Nombre de la tarea</label>
        <input type="text" id='tarea' onChange={(e)=>setNombre(e.target.value)} value={nombre} />

        <select onChange={(e)=>setEstado(e.target.value)} value={estado}>
          <option value="Completada">Completa</option>
          <option value="Incompleta">Incompleta</option>
        </select>
        <button type='submit'disabled={nombre==""}>Agregar</button>
      {<p>Tareas:{lista.length}. 
      Completas:{lista.filter((item)=>item.estado=="Completada").length}. 
      Incompletas:{lista.filter((item)=>item.estado=="Incompleta").length}
      </p>}

      </div>
    </form>

    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    <ul>
      {lista.map((item)=>(<li key={item.id}>{`Id:${item.id}. ${item.nombre}. Estado: ${item.estado}`}
      <button onClick={()=>handleQuitar(item.id)}>X</button>
      <button disabled={item.estado=="Completada"} onClick={()=>handleCompletar(item.id)}>Completar</button></li>))}
    </ul>
    </div>
    
    </>
  )
}

export default App
