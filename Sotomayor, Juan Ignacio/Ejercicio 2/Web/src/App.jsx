import { useState } from "react"

function App() {
const [lista,setLista]=useState([])
const [base,setBase]=useState(0)
const [altura,setAltura]=useState(0)
const [figuraId,SetFiguraId]=useState(0)

const handleEditar = (item)=>{
  SetFiguraId(item.id)
  setAltura(item.altura)
  setBase(item.base)
}

const modificarApi = async()=>{
  const response = await fetch(`http://localhost:3000/calculos/${figuraId}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({base,altura})})

  if (response.ok){
    const calculo = await response.json()
    setLista(lista.map((i)=>(i.id== calculo.id ? calculo : i)))

    setAltura(0)
    setBase(0)
    SetFiguraId(0)
  }
}

const handleQuitar = async(id)=>{
  if (confirm("Desea quitar este elemento?")){
    const response = await fetch(`http://localhost:3000/calculos/${id}`,{
      method:"DELETE"
    })

    if (response.ok){
      setLista(lista.filter((item)=>item.id!==id))
    }
  }
}

const handleSubmit = async(e)=>{
  e.preventDefault()
  const response = await fetch(`http://localhost:3000/calculos`,{
    method:"POST",
    body: JSON.stringify({base,altura}),
    headers:{"Content-Type":"application/json"}})

  if (response.ok){
    const calculo = await response.json()


    setLista([...lista,calculo])
    setAltura(0)
    setBase(0)
  }
}

  return (
    <>
        <form onSubmit={handleSubmit}>
          <div>
          <input type="number" placeholder="Ingresar base" onChange={(e)=>setBase(e.target.value)} value={base} />
          <input type="number" placeholder="Ingresar altura" onChange={(e)=>setAltura(e.target.value)} value={altura} />
          <button type="submit" disabled={altura<=0 || base<=0 || figuraId!==0}>Agregar</button>
          </div>
        </form>

        {figuraId !==0 && (
          <>
          <button onClick={()=>modificarApi()}>Modificar</button>
          </>
        )}

      <ul>
        {lista.map((item)=>(<li key={item.id}>{`Id:${item.id}. 
        Base: ${item.base}. Altura: ${item.altura}
        Perimetro: ${item.perimetro}. Superficie: ${item.superficie}. 
        Figura: ${item.base==item.altura ? "Cuadrado" : "Rectangulo"}
        `} 
        <button onClick={()=>handleQuitar(item.id)} disabled={figuraId!==0}>X</button>
        <button onClick={()=>handleEditar(item)} disabled={figuraId!==0}>Editar</button>
        </li>))}
      </ul>

    </>
  )
}

export default App
