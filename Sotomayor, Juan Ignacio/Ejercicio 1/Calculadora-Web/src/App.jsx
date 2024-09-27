import {useState} from "react"

function App() {
  const [lista,setLista]=useState([])
  const [a,setA]=useState(0)
  const [b,setB]=useState(0)
  const [operacion,setOperacion]=useState("")

  const HandleSubmit = async(e)=>{
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/${operacion}`,{
      method:"POST",
      body: JSON.stringify({a,b}),
      headers: {"Content-Type":"application/json"}})
    
    if (response.ok){
      const op= await response.json()
      console.log(op)
      setLista([...lista,op])
    }
  }


  return (
    <>
      <div>
        <form onSubmit={HandleSubmit}>
        <input type="number" placeholder="Primer numero" onChange={(e)=>setA(parseInt(e.target.value))}/>
        <input type="number" placeholder="Segundo numero" onChange={(e)=>setB(parseInt(e.target.value))}/>
        <button type="submit" onClick={()=>setOperacion("suma")} >Suma</button>
        <button type="submit" onClick={()=>setOperacion("resta")} >Resta</button>
        <button type="submit" onClick={()=>setOperacion("multiplicacion")} >Multiplicacion</button>
        <button type="submit" onClick={()=>setOperacion("division")} >Division</button>
        </form>
        
        <ul>{lista.map((item)=>(<li key={item.id}>{`Operacion: ${operacion}.Id:${item.id}: resultado: ${item.resultado}`}</li>))}</ul>
      </div>
    </>
  )
}

export default App
