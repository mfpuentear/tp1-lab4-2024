import { useState } from 'react'

function App() {
  const [listaResultados , setListaResultados] = useState([])
  const [A, setA] = useState();
  const [B, setB] = useState();
  const [idEditar , setIdEditar] = useState(null)

  const Perimetros = async () => {
    const res = await fetch("http://localhost:3000/Perimetro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ A, B }),
    });
    if (res.ok) {
      if(A === B){
        const perimetro = await res.json();
        setListaResultados((prevResultados) => [...prevResultados, { ...perimetro ,tipos : "Perimetro"  ,tipo : "Cuadrado"}]);
        setA('');
        setB('');
      }else{
        const perimetro = await res.json();
        setListaResultados((prevResultados) => [...prevResultados, { ...perimetro ,tipos : "Perimetro" ,tipo : "Rectangulo"}]);
        setA('');
        setB('');
      }
    } else {
      console.error("Error al sumar");
    }
  };

  const Eliminar = (id) =>{
    const ListaFiltrada = listaResultados.filter((num) => num.id !== id )
    setListaResultados(ListaFiltrada)
  }

  const Editar = (id) => {
    const Item = listaResultados.find((item)=> item.id === id ? item : id)
    
    setA(Item.A)
    setB(Item.B)
    setIdEditar(id)
  }

  const ActualizarId = () => {
    if (A > 0 && B > 0) {  
      if (A === B) {
        const Resultado = (A + B) * 2; 
        const NuevoTipo = "Cuadrado";
        const mapeo = listaResultados.map((item) =>
          item.id === idEditar ? { ...item, A, B, Resultado: Resultado, tipo: NuevoTipo } : item
        );
        setListaResultados(mapeo);
      } else {
        const Resultado = 2 * (A + B); 
        const NuevoTipo = "Rectangulo";
        const mapeo = listaResultados.map((item) =>
          item.id === idEditar ? { ...item, A, B, Resultado: Resultado ,tipo: NuevoTipo } : item
        );
        setListaResultados(mapeo);
      }
      setA("");
      setB("");
      setIdEditar(null);
    } else {
      console.error("A y B deben ser mayores que 0");
    }
  };
  
  const Superficie = async () => {
    const res = await fetch("http://localhost:3000/Superficie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ A, B }),
    });
    if (res.ok) {
        const tipo = A === B ? "cuadrado" : "rectangulo"
        const Superficie = await res.json();
        setListaResultados((prevResultados) => [...prevResultados, { ...Superficie , tipos : "Superficie" , tipo }]);
        setA('');
        setB('');
      }else {
        console.error("Error al calculo de la Superficie");
      }
  };
  

  return (
    <>
      <div style={{textAlign:"center"}}>
        <h1>Calculadora de Perimtros y Superficie</h1>
        <input type="number" placeholder='ladoLargo' value={A} onChange={(e)=> setA(Number(e.target.value))}/>

        <input type="number" placeholder='ladoCorto' value={B} onChange={(e)=> setB(Number(e.target.value))}/>

        <button onClick={idEditar ? ActualizarId : Perimetros} disabled={!A || !B}>{idEditar ? "Actualizar" : "Calcular Perimetro"}</button>
        <button onClick={Superficie} disabled={!A || !B}>Calcular Superfecie</button>

        <ul>
          {listaResultados.map((numeros)=> (
            <li  key={numeros.id}>Lados Largo: {numeros.A} y Lado Corto: {numeros.B} con el {numeros.tipos} de: ({numeros.Resultado} es de tipo {numeros.tipo})
            <button onClick={()=> Eliminar(numeros.id)}>Eliminar</button>
            <button onClick={()=> Editar(numeros.id)}>Editar</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
