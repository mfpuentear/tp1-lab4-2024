import { useState, useEffect } from "react";

function App(){

    const [rectangulos, setRectangulos] = useState([]);
    const [base, setBase] = useState(0);
    const [altura, setAltura] = useState(0);
    const [rectanguloId, setRectanguloId] = useState(0);

    const getRectangulos = async() =>{
        const response = await fetch("http://localhost:3000/rectangulos");
        if(response.ok){
            const {rectangulos} = await response.json();
            setRectangulos(rectangulos);
        }
    }

    useEffect(()=>{
        getRectangulos();
    }, []);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3000/rectangulos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({base, altura})
        });
        if(response.ok){
            getRectangulos();
            setBase(0);
            setAltura(0);
        }else{
            const errorData = await response.json();
            alert(errorData.error)
        }
    }

    const handleUpdate = async () =>{
        const response = await fetch(`http://localhost:3000/rectangulos/${rectanguloId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({base, altura})
        });
        if(response.ok){
            getRectangulos();
            setBase(0);
            setAltura(0);
            setRectanguloId(0);
        }else{
            const errorData = await response.json();
            alert(errorData.error)
        }
    }

    const handleRemove = async (id) =>{
        if(confirm("¿Desea eliminar un elemento de la lista?")){
            const response = await fetch(`http://localhost:3000/rectangulos/${id}`, {
                method: "DELETE"
            });
            if(response.ok){
                getRectangulos();
            }
        }
    }

    const handleEdit = (rectangulo) =>{
        setBase(rectangulo.base);
        setAltura(rectangulo.altura);
        setRectanguloId(rectangulo.id);
    }

    return(
        <>
            <h1>Ejercicio 2</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="base">Base:</label>
                    <input type="number" id="base" value={base} onChange={(e)=>setBase(parseFloat(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="altura">Altura:</label>
                    <input type="number" id="altura" value={altura} onChange={(e)=>setAltura(parseFloat(e.target.value))}/>
                </div>
                {rectanguloId === 0 && <button type="submit">Agregar</button>}
            </form>

            {rectanguloId !== 0 && (
                <>
                    <button onClick={()=> handleUpdate()}>Modificar</button>
                    <button onClick={()=>{
                        setRectanguloId(0);
                        setBase(0);
                        setAltura(0);
                    }}>Cancelar</button>
                
                </>
            )}

            <ul>
                {rectangulos.map((rectangulo)=>(
                    <li key={rectangulo.id}>{`Id:${rectangulo.id} - Base: ${rectangulo.base} - Altura: ${rectangulo.altura} - Perimetro: ${rectangulo.perimetro} - Superficie: ${rectangulo.superficie} `}{(rectangulo.base == rectangulo.altura) ? `[CUADRADO] ` : `[RECTANGULO] `}
                    <button onClick={()=>handleEdit(rectangulo)} disabled={rectanguloId !== 0}>E</button>
                    <button onClick={()=> handleRemove(rectangulo.id)} disabled={rectanguloId !== 0}>X</button></li>
                ))}
            </ul>
        </>
    )
}
export default App;
