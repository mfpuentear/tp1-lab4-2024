import { useEffect, useState } from "react"
const url = "http://localhost:3000/listaTareas/";

function ListaTareas() {
  const [lista, setLista] = useState([])
  const [tarea, setTarea] = useState("")

  const getTareas = async()=>{
    const response = await fetch(url)
    if(response.ok){
     const { lista } = await response.json()
     setLista(lista)
     console.log(lista)
    }
  }

  useEffect(()=>{
    getTareas()
  },[])

  const agregarTareas = async(e)=>{
    e.preventDefault()
    const response = await fetch(url,{
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ tarea })
    })
    if(response.ok){
      console.log("Tarea agregada.")
      getTareas()
      setTarea("")
    }
  }

  const eliminarTarea = async(id)=>{
    if(confirm(`¿Desea eliminar la tarea ${id}?`)){
      const response = await fetch(url+id,{
      method: "DELETE"
    })
    if(response.ok){
      console.log("Tarea eliminada.")
      getTareas()
    }
  }
}
  const completarTarea = async(id, completada)=>{
    const response = await fetch(url+id,{
      method: "PATCH",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ completada: !completada })
    })
    if(response.ok){
      const { data } = await response.json();
      setLista(lista.map((t) => (t.id === data.id ? data : t)));
      getTareas()
      console.log(lista)
    }
  }
    

  return (
    <>
    <h2 style={{textAlign:"center"}}>Lista de Tareas</h2>
    <form onSubmit={agregarTareas} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems:"center", 
        gap: "0.2rem"
      }}>
      <label id="tarea">Describa su tarea...</label>
      <textarea id="tarea" value={tarea} onChange={(e)=>setTarea(e.target.value)}
        style={{
          width: "22rem",
          height: "4rem",
          resize: "none", 
          overflow: "auto", 
          border: "1px solid black", 
          borderRadius: "3px",
          marginBottom:"0.4rem"
          }}></textarea>
      <button type="submit" disabled={!tarea.trim()} style={{cursor: "pointer"}}>Agregar</button>
    </form>
        <ul style={{ padding: 0, listStyle: "none" }}>
          {lista.map((t)=>(
            <li key={t.id} style={{
              width: "22rem",
              border: "1px solid black",
              borderRadius: "3px",
              marginBottom: "0.5rem",
              padding:"0.2rem",
              backgroundColor: t.completada == false ? "white" : "#A0FF80"
            }}>
              <div style={{
                  display:"flex",
                  alignContent:"center",
                  justifyContent:"center",
                  gap:"0.2rem", 
                  marginBottom:"0.2rem"
                }}>
                <strong>{`Tarea Nº${t.id}`}</strong>
                <input
                type="checkbox"
                checked={t.completada}
                onChange={() => completarTarea(t.id, t.completada)}
                style={{ transform: "scale(1.5)", cursor: "pointer", marginLeft:"14.8rem"}}
              />
                <button onClick={()=>eliminarTarea(t.id)} style={{width:"1.5rem", cursor: "pointer"}}>X</button>
              </div>
              {t.tarea}
            </li>
          ))}
        </ul>
    </>
  )
}

export default ListaTareas