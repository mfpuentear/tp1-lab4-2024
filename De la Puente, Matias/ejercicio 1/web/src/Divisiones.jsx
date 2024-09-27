import { useEffect, useState } from "react";
import "./divisiones.css"

function Divisiones() {
    const [divisiones, setDivisiones] = useState([]);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [divisionesId, setDivisionesId] = useState(0);

    const getDivisiones = async () => {
        const response = await fetch("http://localhost:3000/divisiones");
        if (response.ok) {
            const { divisiones } = await response.json();
            setDivisiones(divisiones);
        }
    };
    
    useEffect(() => {
        getDivisiones();
    }, []);

    // Se agrega una nueva division
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:3000/divisiones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ a, b }),
        })
        if (response.ok) {
            
            const { division } = await response.json();
            setDivisiones([...divisiones, division]);
            setA(0);
            setB(0);
        } else {
            alert("La division por 0, por el momento, no existe ")
        }
    };

    const modificarDivision = (division) => {
        setDivisionesId(division.id);
        setA(division.a);
        setB(division.b);
    };

    const modificarDivisionApi = async () => {
        const response = await fetch(`http://localhost:3000/divisiones/${divisionesId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ a, b }),
        });
        if (response.ok) {

            const { division } = await response.json();
            setDivisiones(divisiones.map((s) => (s.id == division.id ? division : s)));

            setA(0);
            setB(0);
            setDivisionesId(0);
        }
    };

    const quitarDivision = async (id) => {
        if (confirm("¿Desea quitar division?")) {
            const response = await fetch(`http://localhost:3000/divisiones/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                
                setDivisiones(divisiones.filter((division) => division.id !== id));
            }
        }
    };

    return (
        <div className="box-division">
            <h1>Divisiones</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="a">Dividendo </label>
                    <input
                        type="number"
                        id="a"
                        value={a}
                        onChange={(e) => setA(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="b">Divisor </label>
                    <input
                        type="number"
                        id="b"
                        value={b}
                        onChange={(e) => setB(parseFloat(e.target.value))}
                    />
                </div>
                {divisionesId === 0 && <button type="submit">Agregar</button>}
            </form>
            {divisionesId !== 0 && (
                <>
                    <button onClick={() => modificarDivisionApi()}>Modificar</button>
                    <button
                        onClick={() => {
                            setDivisionesId(0);
                            setA(0);
                            setB(0);
                        }}
                    >
                        Cancelar
                    </button>
                </>
            )}
            <ul>
                {divisiones.map((division) => (
                    <li key={division.id}>
                        {`${division.id}: ${division.a} - ${division.b} = ${division.resultado} `}
                        <button onClick={() => modificarDivision(division)} disabled={divisionesId !== 0}>
                            E
                        </button>
                        <button onClick={() => quitarDivision(division.id)} disabled={divisionesId !== 0}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Divisiones;