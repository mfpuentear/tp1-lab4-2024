import { useState } from 'react'


function App() {
  const [num1, setNum1] = useState("")
  const [num2, setNum2] = useState("")
  const [resultado, setResultado] = useState("")

  const handleClick = (e)=>{
  try{
    fetch (`http://localhost:5300/${e.target.id}`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({num1: Number(num1), num2: Number(num2)})
    })
    .then(res=>res.json())
    .then(data=>setResultado(data.resultado))
  }
  catch(error){
    setResultado(error)
  }
  
  }
  

  return (
    <>
      <input type='number' value={num1} onChange={(e)=>setNum1(e.target.value)}></input>
      <input  type= "number" value={num2} onChange={(e)=>setNum2(e.target.value)}></input>
      <button onClick={handleClick} id='suma'>Suma</button>
      <button onClick={handleClick} id='resta'>Resta</button>
      <button onClick={handleClick} id='division'>Division</button>
      <button onClick={handleClick} id='multiplicacion'>Multiplicacion</button>

      <p>resultado: {resultado}</p>

    </>
  )
}

export default App
