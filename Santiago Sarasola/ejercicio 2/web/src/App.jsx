import { useEffect } from 'react'
import { useState } from 'react';
import './App.css'

function App() {
  const[rectangulos, setRectangulos] = useState([]);
  const[cuadrados, setCuadrados] = useState([]);
  const [operacion, setOperacion] = useState("rectangulos");
  const [operacionDesactivada, setOperacionDesactivada] = useState(false);
  const[ancho, setAncho] = useState(0);
  const[largo, setLargo] = useState(0);
  const[lado, setLado] = useState(0);
  const[anchoanchoYPerimetroDesactivados, setAnchoanchoYPerimetroDesactivados] = useState(false);
  const[ladoDesactivado, setLadoDesactivado] = useState(true);
  const[rectanguloACambiar, setRectanguloACambiar] = useState(null);
  const[cuadradoACambiar, setCuadradoACambiar] = useState(null);

  const getRectangulos =async()=>{
    const response = await fetch("http://localhost:3000/rectangulos");
    if(response.ok){
      const {perimetrosYSuperficies} = await response.json();
      setRectangulos(perimetrosYSuperficies);
    };
  };

  const getCuadrados =async()=>{
    const response = await fetch("http://localhost:3000/cuadrados");
    if(response.ok){
      const {perimetrosYSuperficies} = await response.json();
      setCuadrados(perimetrosYSuperficies);
    };
  };

  useEffect(() => {
    getRectangulos();
    getCuadrados();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(operacion == 'rectangulos'){
      if((ancho === null ||isNaN(ancho)) || (largo === null ||isNaN(largo))){
        alert('Por favor complete ancho y largo para la operacion');
        return;
      }else{
        const response = await fetch(`http://localhost:3000/${operacion}`,{
          method:"POST", 
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({ ancho, largo})
        });
        if(response.ok){
            const {calculo} = await response.json();
            setRectangulos([...rectangulos, calculo]);
          }
        };
    }else if(operacion == 'cuadrados'){
        if(lado === null ||isNaN(lado)){
          alert('Por favor complete lado para la operacion');
          return;
        }else{
          const response = await fetch(`http://localhost:3000/${operacion}`,{
            method:"POST", 
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ lado })
          });
          if(response.ok){
              const {calculo} = await response.json();
              setCuadrados([...cuadrados, calculo]);
            }
          };
        }
    };

  const quitarRectangulo = async(id) => {
    if(confirm("¿Desea quitar el rectangulo?")){
      const response = await fetch(`http://localhost:3000/rectangulos/${id}`, {
        method:"DELETE",
      });
      if(response.ok){
        setRectangulos(rectangulos.filter((rectangulo) => rectangulo.id != id));
      };
    };
  };

  const modificarRectangulo = (rectangulo) => {
    setRectanguloACambiar(rectangulo);
    setAncho(rectangulo.ancho);
    setLargo(rectangulo.largo);
    setOperacionDesactivada(true);
  };

  const modificarRectanguloApi = async ()=> {
    const response = await fetch(`http://localhost:3000/rectangulos/${rectanguloACambiar.id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify( {ancho, largo} )
    });
    if(response.ok){
      const {calculoModificado} = await response.json();
      setRectangulos(rectangulos.map((c) => (c.id == calculoModificado.id ? calculoModificado : c)));
      setAncho(0);
      setLargo(0);
      setRectanguloACambiar(null);
      setOperacionDesactivada(false);
    }
  };

  const quitarCuadrado = async(id) => {
    if(confirm("¿Desea quitar el cuadrado?")){
      const response = await fetch(`http://localhost:3000/cuadrados/${id}`, {
        method:"DELETE",
      });
      if(response.ok){
        setCuadrados(cuadrados.filter((cuadrado) => cuadrado.id != id));
      };
    };
  };

  const modificarCuadrado = (cuadrado) => {
    setCuadradoACambiar(cuadrado);
    setLado(cuadrado.lado);
    setOperacionDesactivada(true);
  };

  const modificarCuadradoApi = async ()=> {
    const response = await fetch(`http://localhost:3000/cuadrados/${cuadradoACambiar.id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify( {lado} )
    });
    if(response.ok){
      const {calculoModificado} = await response.json();
      setCuadrados(cuadrados.map((c) => (c.id == calculoModificado.id ? calculoModificado : c)));
      setLado(0);
      setCuadradoACambiar(null);
      setOperacionDesactivada(false);
    }
  };

  return (
    <>
    <div className='conteiner'>
      <h1>Perímetro y Superficie!</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label hidden={operacionDesactivada} htmlFor="operacion">Operación: </label>
          <select hidden={operacionDesactivada}
            id="operacion"
            value={operacion}
            onChange={(e) => {
              setOperacion(e.target.value);
              if(e.target.value == 'rectangulos'){
                setLadoDesactivado(true);
                setAnchoanchoYPerimetroDesactivados(false);
                setLado(0);
              }else if(e.target.value == 'cuadrados'){
                setAnchoanchoYPerimetroDesactivados(true);
                setLadoDesactivado(false);
                setAncho(0);
                setLargo(0);
              }
             }}
            disabled={operacionDesactivada}
          >
            <option value="rectangulos">Rectangulo</option>
            <option value="cuadrados">Cuadrado</option>
          </select>
        </div>
        <div hidden={anchoanchoYPerimetroDesactivados}>
          <label htmlFor="ancho">Ancho: </label>
          <input 
            type="number"
            id="ancho" 
            value={ancho} 
            onChange={(e) => setAncho(parseFloat(e.target.value))}
          />
        </div>
        <div hidden={anchoanchoYPerimetroDesactivados}>
          <label htmlFor="largo">Largo: </label>
          <input 
            type="number"
            id="largo" 
            value={largo} 
            onChange={(e) => setLargo(parseFloat(e.target.value))}
          />
        </div>
        <div hidden={ladoDesactivado}>
          <label htmlFor="lado">Lado: </label>
          <input 
            type="number"
            id="lado" 
            value={lado} 
            onChange={(e) => setLado(parseFloat(e.target.value))}
          />
        </div>
        <br></br>
        {rectanguloACambiar === null && cuadradoACambiar === null && <button type='submit'>Calcular</button>}
      </form>
        {rectanguloACambiar != null && 
          (
          <>
          <button onClick={() => modificarRectanguloApi()}>Modificar Rectangulo</button>
          <button onClick={() => {
            setRectanguloACambiar(null);
            setCuadradoACambiar(null);
            setAncho(0);
            setLargo(0);
            setLado(0);
            setOperacionDesactivada(false);
          }}>Cancelar</button>
          </>
          )}
        {cuadradoACambiar != null && 
          (
          <>
          <button onClick={() => modificarCuadradoApi()}>Modificar Cuadrado!</button>
          <button onClick={() => {
            setRectanguloACambiar(null);
            setCuadradoACambiar(null);
            setAncho(0);
            setLargo(0);
            setLado(0);
            setOperacionDesactivada(false);
          }}>Cancelar</button>
          </>
          )}
    </div>
    <br></br>
    <div className="operaciones-container">
      <div className="operacion">
        <h3>Rectangulos</h3>
        <ul>
          {rectangulos.map((rectangulo) => (
            <li key={rectangulo.id}>
              <span>{`Id:${rectangulo.id} ➡️ Ancho: ${rectangulo.ancho} | Largo: ${rectangulo.largo} |  Perimetro: ${rectangulo.perimetro} | Superficie: ${rectangulo.superficie}`}</span>
              <button disabled={operacionDesactivada} onClick={() => modificarRectangulo(rectangulo)}>✏️</button>
              <button disabled={operacionDesactivada} onClick={() => quitarRectangulo(rectangulo.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="operacion">
        <h3>Cuadrados</h3>
        <ul>
          {cuadrados.map((cuadrado) => (
            <li key={cuadrado.id}>
              <span>{`Id:${cuadrado.id} ➡️ Lado: ${cuadrado.lado} |  Perimetro: ${cuadrado.perimetro} | Superficie: ${cuadrado.superficie}`}</span>
              <button disabled={operacionDesactivada} onClick={() => modificarCuadrado(cuadrado)}>✏️</button>
              <button disabled={operacionDesactivada} onClick={() => quitarCuadrado(cuadrado.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App

