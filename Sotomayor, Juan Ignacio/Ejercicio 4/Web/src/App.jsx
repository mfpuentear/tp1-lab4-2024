import { useState } from 'react'

function App() {
  const [lista, setLista] = useState([])
  const [nombre,setNombre]=useState([])
  const [nota1,setNota1]=useState(0)
  const [nota2,setNota2]=useState(0)
  const [nota3,setNota3]=useState(0)
  const [idAlumno,setIdAlumno]=useState(0)


  const handleSubmit = async(e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:3000/notas",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({nombre, nota1,nota2,nota3})
    })

    if (response.ok){
      const alumno = await response.json()

      setLista([...lista,alumno])
      setNombre("")
      setNota1(0)
      setNota2(0)
      setNota3(0)
    }

  }

  const handleQuitar = async(id)=>{
    if (confirm("Desea quitar este alumno?")){
      const response = await fetch(`http://localhost:3000/notas/${id}`,{
        method:"DELETE"
      })

      if (response.ok){
        setLista(lista.filter((item)=>item.id!==id))
      }
    }
  }

  const handleEditar =(item)=>{
    setIdAlumno(item.id)
    setNombre(item.nombre)
    setNota1(item.nota1)
    setNota2(item.nota2)
    setNota3(item.nota3)
  }

  const modificarApi = async()=>{
    if (lista.find((item)=>item.nombre==nombre && item.id!==idAlumno)){
      alert("Este alumno ya existe")
    }
    else{
      const response = await fetch(`http://localhost:3000/notas/${idAlumno}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nombre,nota1,nota2,nota3})
      })
      if (response.ok){
        const alumno = await response.json()
        setLista(lista.map((i)=>i.id===alumno.id? alumno:i))
        setIdAlumno(0)
        setNombre("")
        setNota1(0)
        setNota2(0)
        setNota3(0)
      }
    }
    
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div style={{display:"flex",flexDirection:"column",alignContent:"center",alignItems:"center"}}>
      <label htmlFor="Nombre">Nombre del alumno</label>
      <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)} />

      <label>Notas del alumno</label>
      <input type="number" value={nota1} onChange={(e)=>setNota1(parseInt(e.target.value))}/>
      <input type="number" value={nota2} onChange={(e)=>setNota2(parseInt(e.target.value))}/>
      <input type="number" value={nota3} onChange={(e)=>setNota3(parseInt(e.target.value))}/>

      <button type='submit' disabled={nombre=="" || nota1<=0 || nota2<=0 || nota3<=0 || idAlumno!==0}>Agregar</button>

      {idAlumno!==0 && (
        <>
        <button onClick={()=>modificarApi()} disabled={nombre=="" || nota1<=0 || nota2<=0 || nota3<=0} >Modificar</button>
        <button onClick={()=>{setIdAlumno(0),setNombre(""),setNota1(0),setNota2(0),setNota3(0)}}>Cancelar</button>
        </>
      )}
      </div>
    </form>

    <ul>
      {lista.map((item)=>(<li key={item.id}>{`Id:${item.id}. Nombre:${item.nombre}. 
      Primera nota:${item.nota1}. Segunda nota:${item.nota2}. Tercera nota:${item.nota3}. 

      Promedio: ${((item.nota1+item.nota2+item.nota3) /3).toFixed(2)}.

      Estado: ${(item.nota1+item.nota2+item.nota3)/3 >=8 ? 
      "Promocionado" :(item.nota1+item.nota2+item.nota3)/3 >=6 ? "Aprobado" :"Reprobado"}`}

      <button onClick={()=>handleQuitar(item.id)} disabled={idAlumno!==0}>X</button>
      <button onClick={()=>handleEditar(item)} disabled={idAlumno!==0}>Editar</button>
      </li>))}
    </ul>
    </>
  )
}

export default App
