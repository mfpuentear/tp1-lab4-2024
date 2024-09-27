import  { useState, useEffect } from 'react';

function App() {
    const [calculos, setCalculos] = useState([]);
    const [ancho, setAncho] = useState('');
    const [alto, setAlto] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCalculos();
    }, []);

    const fetchCalculos = async () => {
        const response = await fetch('http://localhost:3000/calculos');
        const data = await response.json();
        setCalculos(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await fetch(`http://localhost:3000/calculos/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ancho: Number(ancho), alto: Number(alto) }),
            });
        } else {
            await fetch('http://localhost:3000/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ancho: Number(ancho), alto: Number(alto) }),
            });
        }
        setAncho('');
        setAlto('');
        setEditingId(null);
        fetchCalculos();
    };

    const handleEdit = (calc) => {
        setAncho(calc.ancho);
        setAlto(calc.alto);
        setEditingId(calc.id);
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3000/calculos/${id}`, { method: 'DELETE' });
        fetchCalculos();
    };

    const esCuadrado = (ancho, alto) => ancho === alto;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: "400px",
            backgroundColor: "lightblue"
        }} className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Rectangulos</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="number"
                    value={ancho}
                    onChange={(e) => setAncho(e.target.value)}
                    placeholder="Ancho"
                    className="mr-2 p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    value={alto}
                    onChange={(e) => setAlto(e.target.value)}
                    placeholder="Alto"
                    className="mr-2 p-2 border rounded"
                    required
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    {editingId ? 'Cargar' : 'Calcular'}
                </button>
            </form>
            <ul>
                {calculos.map((calc) => (
                    <li key={calc.id} className="mb-2 p-2 border rounded">
                        <div>
                            {esCuadrado(calc.ancho, calc.alto) ? 'Cuadrado' : 'Rectangulo'}: {calc.ancho} x {calc.alto}
                        </div>
                        <div>Perimetro: {calc.perimeter}</div>
                        <div>Area: {calc.area}</div>
                        <button onClick={() => handleEdit(calc)} className="mr-2 p-1 bg-yellow-500 text-white rounded">
                            Editar
                        </button>
                        <button onClick={() => handleDelete(calc.id)} className="p-1 bg-red-500 text-white rounded">
                            Borrar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;