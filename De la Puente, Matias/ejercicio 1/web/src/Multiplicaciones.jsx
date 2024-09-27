import { useEffect, useState } from "react";

function Multiplicaciones() {
    const [multiplicaciones, setMultiplicaciones] = useState([]);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [multiplicacionesId, setMultiplicacionesId] = useState(0);

    const getMultiplicaciones = async () => {
        const response = await fetch("http://localhost:3000/multiplicaciones");
        if (response.ok) {
            const { multiplicaciones } = await response.json();
            setMultiplicaciones(multiplicaciones);
        }
    };

    
    useEffect(() => {
        getMultiplicaciones();
    }, []);

    // Se agrega una nueva suma
    const handleSubmit = async (e) => {
        e.preventDefault();
        // POST localhost:3000/sumas (body: a, b)
        const response = await fetch("http://localhost:3000/multiplicaciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ a, b }),
        });
        if (response.ok) {
        

            const { multiplicacion } = await response.json();
            setMultiplicaciones([...multiplicaciones, multiplicacion]);
            setA(0);
            setB(0);
        }
    };

    const modificarMultiplicacion = (multiplicacion) => {
        setMultiplicacionesId(multiplicacion.id);
        setA(multiplicacion.a);
        setB(multiplicacion.b);
    };

    const modificarMultiplicacionApi = async () => {
        const response = await fetch(`http://localhost:3000/multiplicaciones/${multiplicacionesId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ a, b }),
        });
        if (response.ok) {
            
            const { multiplicacion } = await response.json();
            setMultiplicaciones(multiplicaciones.map((s) => (s.id == multiplicacion.id ? multiplicacion : s)));

            setA(0);
            setB(0);
            setMultiplicacionesId(0);
        }
    };

    const quitarMultiplcacion = async (id) => {
        if (confirm("¿Desea quitar multiplicacion?")) {
            const response = await fetch(`http://localhost:3000/multiplicaciones/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                
                setMultiplicaciones(multiplicaciones.filter((multiplicacion) => multiplicacion.id !== id));
            }
        }
    };

    return (
        <div>
            <h1>Multiplicaciones</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="a">Factor</label>
                    <input
                        type="number"
                        id="a"
                        value={a}
                        onChange={(e) => setA(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="b">Coeficiente</label>
                    <input
                        type="number"
                        id="b"
                        value={b}
                        onChange={(e) => setB(parseFloat(e.target.value))}
                    />
                </div>
                {multiplicacionesId === 0 && <button type="submit">Agregar</button>}
            </form>
            {multiplicacionesId !== 0 && (
                <>
                    <button onClick={() => modificarMultiplicacionApi()}>Modificar</button>
                    <button
                        onClick={() => {
                            setMultiplicacionesId(0);
                            setA(0);
                            setB(0);
                        }}
                    >
                        Cancelar
                    </button>
                </>
            )}
            <ul>
                {multiplicaciones.map((multiplicacion) => (
                    <li key={multiplicacion.id}>
                        {`${multiplicacion.id}: ${multiplicacion.a} - ${multiplicacion.b} = ${multiplicacion.resultado} `}
                        <button onClick={() => modificarMultiplicacion(multiplicacion)} disabled={multiplicacionesId !== 0}>
                            E
                        </button>
                        <button onClick={() => quitarMultiplcacion(multiplicacion.id)} disabled={multiplicacionesId !== 0}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Multiplicaciones;