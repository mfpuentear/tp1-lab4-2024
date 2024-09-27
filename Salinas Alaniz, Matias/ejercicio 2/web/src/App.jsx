import { useState } from 'react'
import './App.css'

function App() {
  const [rectangulos, setRectangulos] = useState([{id:1, a:4, b:2, superficie: 8,perimetro:12}])
  const [ladoA,setLadoA] = useState(0);
  const [ladoB,setLadoB] = useState(0);
  const [rectanguloSeleccionado,setRectanguloSeleccionado] = useState()

  const insertarRectangulo = async () =>{
    const a = ladoA
    const b = ladoB
    let peticion = {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ a,b })
    }
    const response = await fetch('http://localhost:3000/rectangulos',peticion)
    const nuevoRectangulo = await response.json()
    setRectangulos([...rectangulos,nuevoRectangulo.data])
  }

  const eliminarRectangulo = async (rectangulo) => {
    let peticion = {
      method: 'DELETE',
      headers: { 'Content-Type': "application/json" },
    }
    const response = await fetch (`http://localhost:3000/rectangulos/${rectangulo.id}`,peticion)
    if (response.ok){
      const nuevaListaRectangulos = rectangulos.filter((rectanguloA)=> rectanguloA.id != rectangulo.id)
      setRectangulos(nuevaListaRectangulos)
    }
  }

  const editarRectangulo =(rectangulo) => {
    setLadoA(rectangulo.a)
    setLadoB(rectangulo.b)
    setRectanguloSeleccionado(rectangulo)
  }

  const editarRectanguloApi = async () =>{
    const a = ladoA
    const b = ladoB
    const peticion = {
      method: 'PUT',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ a,b })
    }
    const response = await fetch(`http://localhost:3000/rectangulos/${rectanguloSeleccionado.id}`,peticion)
    if (response.ok) {
      setRectanguloSeleccionado(null)
      const datos = await response.json()
      const nuevoRectangulo = datos.data
      const nuevaListaRectangulos = rectangulos.map((rectangulo)=> (rectangulo.id == nuevoRectangulo.id) ? nuevoRectangulo : rectangulo)
      setRectangulos(nuevaListaRectangulos)

    }
  } 

  return (
    <div className="container">
      <div className="display">
      <form >
        <label htmlFor="ladoA">Lado A
          <input type="text" name="ladoA" id="ladoA" value={ladoA} onChange={(e)=>setLadoA(e.target.value)}/>
        </label>
        <label htmlFor="ladoB">Lado B
          <input type="text" name="ladoB" id="ladoB" value={ladoB} onChange={(e)=>setLadoB(e.target.value)}/>
        </label>
        <button type='button' className='insertar' disabled={(rectanguloSeleccionado!= null)} onClick={()=>insertarRectangulo()}>INSERTAR</button>
        <button type='button' className='guardar' disabled={(rectanguloSeleccionado == null)} style={{opacity:(rectanguloSeleccionado == null) ? 0 : 1}} onClick={()=>editarRectanguloApi()}>GUARDAR</button>
        <button type='button' className='cancelar' disabled={(rectanguloSeleccionado == null)} style={{opacity:(rectanguloSeleccionado == null) ? 0 : 1}} onClick={()=>setRectanguloSeleccionado(null)}>CANCELAR</button>
      </form>
        <div className="rectangulo" style={{width:`${ladoB}rem`,height:`${ladoA}rem`}}>
        <p className='ladoALabel'>Lado_A</p>
        <p className='ladoBLabel'>Lado_B</p>
        <p className="queSoy">{(ladoA == ladoB) ? `Cuadrado`: `Rectangulo`}</p>
        </div>
      </div>
      <div className="listadoRectangulos">
        {rectangulos.map((rectangulo)=> <div className='rectanguloInfo' key={rectangulo.id}> {`ID : ${rectangulo.id} a: ${rectangulo.a} b: ${rectangulo.b} superficie: ${rectangulo.superficie} perimetro: ${rectangulo.perimetro}`} 
          <button className='editar' onClick={() => editarRectangulo(rectangulo)}>EDITAR</button>
          <button className="eliminar" onClick={()=>eliminarRectangulo(rectangulo)}>ELIMINAR</button>
        </div>)}
      </div>
    </div>
  )
}

export default App
