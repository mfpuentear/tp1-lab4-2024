import { useEffect, useState } from "react";

const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1x2oqQ7uN0hNulSio2nqWp42qbX3LB83yiWbT64Pq1ITk_B2zOp2gTF11fccIDLYYnXc&usqp=CAU"

function Area() {
    const [calculos, setCalculos] = useState([]);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [modCalc, setModCalc] = useState(null)

    const getCalculos = async ()=>{
        const response = await fetch("http://localhost:3000/area");
        if(response.ok){
            const { calculos } = await response.json()
            console.log(calculos)
            setCalculos(calculos)
        }
    }

    useEffect(()=>{
        getCalculos()
    },[])

    const agregarCalculo = async(e)=>{
        e.preventDefault()
        if (a <= 0 || b <= 0) {
            alert("Ambos lados deben ser mayores que cero.");
            return;
          }
        const response = await fetch("http://localhost:3000/area", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({a,b})
        })
        if(response.ok){
            console.log("Area agregado.")
            getCalculos()
        }
        setA(0)
        setB(0)
    }

    const selecCalculo = async(calculo)=>{
        setModCalc(calculo)
        setA(calculo.base)
        setB(calculo.altura)
    }

    const eliminarCalculo = async(id)=>{
        if(confirm(`¿Desea quitar el cálculo ${id}?`)){
            const response = await fetch(`http://localhost:3000/area/${id}`,{
                method: "DELETE",
                headers: {"content-type": "application/json"}
            })
            if(response.ok){
                console.log("Cálculo eliminado.")
                getCalculos()
            }
        }
    }

    const modificarCalculo = async()=>{
        const response = await fetch(`http://localhost:3000/area/${modCalc.id}`,{
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({a,b})
        })
        if(response.ok){
            const { data } = await response.json()
            setCalculos(calculos.map((c)=>c.id == data.id ? data : c))
            setA(0)
            setB(0)
            setModCalc(null)
        }
    }

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems:"center"}}>
        <h2>Cálculo de Área</h2>
        <form onSubmit={agregarCalculo} style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems:"center", padding:"0.5rem"}}>
            <div>
                <label htmlFor="a">Base (a): </label>
                <input type="number" id="a" value={a} onChange={(e)=>setA(parseFloat(e.target.value))} style={{width: '3rem'}}/>
                <label htmlFor="b"> Altura (b): </label>
                <input type="number" id="b" value={b} onChange={(e)=>setB(parseFloat(e.target.value))} style={{width: '3rem'}}/>
            </div>
            {modCalc == null && <button type="submit" style={{width:"5rem"}}>Calcular</button>}
        </form>
        {modCalc !== null && 
            <div style={{ display: 'flex', flexDirection: 'row', alignItems:"center", gap:'0.5rem', padding:"0.3rem"}}>
            <button style={{ width: "5rem" }} onClick={modificarCalculo}>Modificar</button>
            <button style={{ width: "5rem" }} onClick={() => {
                      setA(0);
                      setB(0);
                      setModCalc(null);
            }}>Cancelar</button>
             </div>
        }
   
        <img src={img} alt="Imagen Calculo" />
        <ul style={{ display:"flex",padding: '1rem', alignSelf: "center", flexDirection:"column"}}>
            {calculos.map((calculo) => (
                <li key={calculo.id}>
                    {`Cálculo ${calculo.id}: Base (a): ${calculo.base}, Altura (b): ${calculo.altura}, Area: ${calculo.area} ${calculo.base == calculo.altura ? "Cuadrado" : "Rectángulo"}`}
                    <button onClick={() => selecCalculo(calculo)} disabled={modCalc !==null }>E</button>
                    <button onClick={() => eliminarCalculo(calculo.id)} disabled={modCalc !==null }>X</button>
                </li>
        ))}
        </ul>
    </div>
    <a href="/">Volver</a>
    </>
  )
}
export default Area;