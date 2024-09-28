import { useEffect } from 'react'
import { useState } from 'react';
import './App.css'

function App() {
  const[sumas, setSumas] = useState([]);
  const[restas, setRestas] = useState([]);
  const[multiplicaciones, setMultiplicaciones] = useState([]);
  const[divisiones, setDivisiones] = useState([]);
  const [operacion, setOperacion] = useState("sumas");
  const [operacionDesactivada, setOperacionDesactivada] = useState(false);
  const[a, setA] = useState(0);
  const[b, setB] = useState(0);
  const[sumaACambiar, setSumaACambiar] = useState(null);
  const[restaACambiar, setRestaACambiar] = useState(null);
  const[multiplicacionACambiar, setMultiplicacionaACambiar] = useState(null);
  const[divisionACambiar, setDivisionACambiar] = useState(null);

  const getSumas =async()=>{
    const response = await fetch("http://localhost:3000/sumas");
    if(response.ok){
      const {sumas} = await response.json();
      setSumas(sumas);
    };
  };

  const getRestas =async()=>{
    const response = await fetch("http://localhost:3000/restas");
    if(response.ok){
      const {restas} = await response.json();
      setRestas(restas);
    };
  };

  const getMultiplicaciones =async()=>{
    const response = await fetch("http://localhost:3000/multiplicaciones");
    if(response.ok){
      const {multiplicaciones} = await response.json();
      setMultiplicaciones(multiplicaciones);
    };
  };

  const getDivisiones =async()=>{
    const response = await fetch("http://localhost:3000/divisiones");
    if(response.ok){
      const {divisiones} = await response.json();
      setDivisiones(divisiones);
    };
  };

  useEffect(() => {
    getSumas();
    getRestas();
    getMultiplicaciones();
    getDivisiones();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if((a === null ||isNaN(a)) || (b === null ||isNaN(b))){
      alert('Por favor complete 2 operadores para la operacion');
      return;
    }
    if(operacion == 'divisiones' && b === 0){
      alert('El operador B no puede ser 0 para la division!');
      return;
    };
    const response = await fetch(`http://localhost:3000/${operacion}`,{
      method:"POST", 
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ a, b})
    });
    if(response.ok){
      if(operacion == "sumas"){
        const {suma} = await response.json();
        setSumas([...sumas, suma]);
      }else if(operacion == 'restas'){
        const {resta} = await response.json();
        setRestas([...restas, resta]);
      }else if(operacion == 'multiplicaciones'){
        const {multiplicacion} = await response.json();
        setMultiplicaciones([...multiplicaciones, multiplicacion]);
      }else if(operacion == 'divisiones'){
        const {division} = await response.json();
        setDivisiones([...divisiones, division]);
      };
    };
  };

  const quitarSuma = async(id) => {
    if(confirm("¿Desea quitar la suma?")){
      const response = await fetch(`http://localhost:3000/sumas/${id}`, {
        method:"DELETE",
      });
      if(response.ok){
        setSumas(sumas.filter((suma) => suma.id != id));
      };
    };
  };

  const modificarSuma = (suma) => {
    setSumaACambiar(suma);
    setA(suma.a);
    setB(suma.b);
    setOperacionDesactivada(true);
  };

  const modificarSumaApi = async ()=> {
    const response = await fetch(`http://localhost:3000/sumas/${sumaACambiar.id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify( {a, b} )
    });
    if(response.ok){
      const {sumaModificada} = await response.json();
      setSumas(sumas.map((s) => (s.id == sumaModificada.id ? sumaModificada : s)));
      setA(0);
      setB(0);
      setSumaACambiar(null);
      setOperacionDesactivada(false);
    }
  };

  const quitarResta = async(id) => {
    if(confirm("¿Desea quitar la resta?")){
      const response = await fetch(`http://localhost:3000/restas/${id}`, {
        method:"DELETE",
      });
      if(response.ok){
        setRestas(restas.filter((resta) => resta.id != id));
      };
    };
  };

  const modificarResta = (resta) => {
    setRestaACambiar(resta);
    setA(resta.a);
    ;setB(resta.b);
    setOperacionDesactivada(true);
  };

  const modificarRestaApi = async ()=> {
    const response = await fetch(`http://localhost:3000/restas/${restaACambiar.id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify( {a, b} )
    });
    if(response.ok){
      const {restaModificada} = await response.json();
      setRestas(restas.map((r) => (r.id == restaModificada.id ? restaModificada : r)));
      setA(0);
      setB(0);
      setRestaACambiar(null);
      setOperacionDesactivada(false);
    };
  };

  const quitarMultiplicacion = async(id) => {
    if(confirm("¿Desea quitar la multiplicacion?")){
      const response = await fetch(`http://localhost:3000/multiplicaciones/${id}`, {
        method:"DELETE",
      });
      if(response.ok){
        setMultiplicaciones(multiplicaciones.filter((multiplicacion) => multiplicacion.id != id));
      };
    };
  };

  const modificarMultiplicacion = (multiplicacion) => {
    setMultiplicacionaACambiar(multiplicacion);
    setA(multiplicacion.a);
    setB(multiplicacion.b);
    setOperacionDesactivada(true);
  };

  const modificarMultiplicacionApi = async ()=> {
    const response = await fetch(`http://localhost:3000/multiplicaciones/${multiplicacionACambiar.id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify( {a, b} )
    });
    if(response.ok){
      const {multiplicacionModificada} = await response.json();
      setMultiplicaciones(multiplicaciones.map((m) => (m.id == multiplicacionModificada.id ? multiplicacionModificada : m)));
      setA(0);
      setB(0);
      setMultiplicacionaACambiar(null);
      setOperacionDesactivada(false);
    };
  };

  const quitarDivision = async(id) => {
    if(confirm("¿Desea quitar la division?")){
      const response = await fetch(`http://localhost:3000/divisiones/${id}`, {
        method:"DELETE",
      });
      if(response.ok){
        setDivisiones(divisiones.filter((division) => division.id != id));
      };
    };
  };

  const modificarDivision = (division) => {
    setDivisionACambiar(division);
    setA(division.a);
    setB(division.b);
    setOperacionDesactivada(true);
  };

  const modificarDivisionApi = async ()=> {
    if(b === 0){
      alert('El operador B no puede ser 0 para la division!');
      return;
    };
    const response = await fetch(`http://localhost:3000/divisiones/${divisionACambiar.id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify( {a, b} )
    });
    if(response.ok){
      const {divisionModificada} = await response.json();
      setDivisiones(divisiones.map((d) => (d.id == divisionModificada.id ? divisionModificada : d)));
      setA(0);
      setB(0);
      setDivisionACambiar(null);
      setOperacionDesactivada(false);
    }
  }

  return (
    <>
    <div className='conteiner'>
      <h1>Calculadora Matemática</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="a">Operador A: </label>
          <input 
            type="number"
            id="a" 
            value={a} 
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">Operador B: </label>
          <input 
            type="number"
            id="b" 
            value={b} 
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label hidden={operacionDesactivada} htmlFor="operacion">Operación: </label>
          <select hidden={operacionDesactivada}
            id="operacion"
            value={operacion}
            onChange={(e) => setOperacion(e.target.value)}
            disabled={operacionDesactivada}
          >
            <option value="sumas">Suma</option>
            <option value="restas">Resta</option>
            <option value="multiplicaciones">Multiplicación</option>
            <option value="divisiones">División</option>
          </select>
        </div>
        <br></br>
        {sumaACambiar === null && restaACambiar === null && multiplicacionACambiar === null && divisionACambiar == null
          && <button type='submit'>Calcular</button>}
      </form>
        {sumaACambiar != null && 
          (
          <>
          <button onClick={() => modificarSumaApi()}>Modificar Suma</button>
          <button onClick={() => {
            setSumaACambiar(null);
            setRestaACambiar(null);
            setMultiplicacionaACambiar(null);
            setDivisionACambiar(null);
            setA(0);
            setB(0);
            setOperacionDesactivada(false);
          }}>Cancelar</button>
          </>
          )}
        {restaACambiar != null && 
          (
          <>
          <button onClick={() => modificarRestaApi()}>Modificar Resta</button>
          <button onClick={() => {
            setSumaACambiar(null);
            setRestaACambiar(null);
            setMultiplicacionaACambiar(null);
            setDivisionACambiar(null);
            setA(0);
            setB(0);
            setOperacionDesactivada(false);
          }}>Cancelar</button>
          </>
          )}
        {multiplicacionACambiar != null && 
          (
          <>
          <button onClick={() => modificarMultiplicacionApi()}>Modificar Multiplicacion</button>
          <button onClick={() => {
            setSumaACambiar(null);
            setRestaACambiar(null);
            setMultiplicacionaACambiar(null);
            setDivisionACambiar(null);
            setA(0);
            setB(0);
            setOperacionDesactivada(false);
          }}>Cancelar</button>
          </>
          )}
        {divisionACambiar != null && 
          (
          <>
          <button onClick={() => modificarDivisionApi()}>Modificar Division</button>
          <button onClick={() => {
            setSumaACambiar(null);
            setRestaACambiar(null);
            setMultiplicacionaACambiar(null);
            setDivisionACambiar(null);
            setA(0);
            setB(0);
            setOperacionDesactivada(false);
          }}>Cancelar</button>
          </>
          )}
    </div>
    <br></br>
    <div className="operaciones-container">
      <div className="operacion">
        <h3>Sumas</h3>
        <ul>
          {sumas.map((suma) => (
            <li key={suma.id}>
              <span>{`Id:${suma.id} -> ${suma.a} + ${suma.b} = ${suma.resultado} `}</span>
              <button disabled={operacionDesactivada} onClick={() => modificarSuma(suma)}>✏️</button>
              <button disabled={operacionDesactivada} onClick={() => quitarSuma(suma.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="operacion">
        <h3>Restas</h3>
        <ul>
          {restas.map((resta) => (
            <li key={resta.id}>
              <span>{`Id:${resta.id} -> ${resta.a} - ${resta.b} = ${resta.resultado} `}</span>
              <button disabled={operacionDesactivada} onClick={() => modificarResta(resta)}>✏️</button>
              <button disabled={operacionDesactivada} onClick={() => quitarResta(resta.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="operacion">
        <h3>Multiplicaciones</h3>
        <ul>
          {multiplicaciones.map((multiplicacion) => (
            <li key={multiplicacion.id}>
              <span>{`Id:${multiplicacion.id} -> ${multiplicacion.a} * ${multiplicacion.b} = ${multiplicacion.resultado} `}</span>
              <button disabled={operacionDesactivada} onClick={() => modificarMultiplicacion(multiplicacion)}>✏️</button>
              <button disabled={operacionDesactivada} onClick={() => quitarMultiplicacion(multiplicacion.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="operacion">
        <h3>Divisiones</h3>
        <ul>
          {divisiones.map((division) => (
            <li key={division.id}>
              <span>{`Id:${division.id} -> ${division.a} / ${division.b} = ${division.resultado} `}</span>
              <button disabled={operacionDesactivada} onClick={() => modificarDivision(division)}>✏️</button>
              <button disabled={operacionDesactivada} onClick={() => quitarDivision(division.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App

