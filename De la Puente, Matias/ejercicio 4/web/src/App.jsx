import { useState, useEffect } from 'react';

function App() {
    const [alumnos, setAlumnos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [notas, setNotas] = useState(['', '', '']);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchalumnos();
    }, []);

    const fetchalumnos = async () => {
        try {
            const response = await fetch('http://localhost:3000/alumnos');
            const data = await response.json();
            setAlumnos(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const endpoint = editingId
            ? `http://localhost:3000/alumnos/${editingId}`
            : 'http://localhost:3000/alumnos';

        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, notas: notas.map(Number) }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            fetchalumnos();
            setNombre('');
            setNotas(['', '', '']);
            setEditingId(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (alumno) => {
        setNombre(alumno.nombre);
        setNotas(alumno.notas.map(String));
        setEditingId(alumno.id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/alumnos/${id}`, { method: 'DELETE' });
            fetchalumnos();
        } catch (err) {
            setError(err.message('error al borrar alumno'));
        }
    };

    const calcularPromedio = (notas) => {
        return notas.reduce((sum, grade) => sum + grade, 0) / notas.length;
    };

    const getCondicion = (promedio) => {
        if (promedio >= 8) return 'Promocionado';
        if (promedio >= 6) return 'Aprobado';
        return 'Desaprobado';
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor : "blue"
        }}
        className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Notas de alumnos</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del estudiante"
                    className="mr-2 p-2 border rounded"
                    required
                />
                {notas.map((grade, index) => (
                    <input
                        key={index}
                        type="number"
                        value={grade}
                        onChange={(e) => {
                            const newnotas = [...notas];
                            newnotas[index] = e.target.value;
                            setNotas(newnotas);
                        }}
                        placeholder={`nota ${index + 1}`}
                        className="mr-2 p-2 border rounded"
                        min="0"
                        max="10"
                        step="0.1"
                        required
                    />
                ))}
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    {editingId ? 'Cargar alumno' : 'Añadir alumno'}
                </button>
            </form>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <ul className="space-y-2">
                {alumnos.map((alumno) => {
                    const promedio = calcularPromedio(alumno.notas);
                    const condicion = getCondicion(promedio);
                    return (
                        <li key={alumno.id} className="p-2 border rounded">
                            <div className="flex justify-between items-center">
                                <span className="font-bold">{alumno.nombre}</span>
                                <div>
                                    <button
                                        onClick={() => handleEdit(alumno)}
                                        className="mr-2 p-1 bg-yellow-500 text-white rounded"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(alumno.id)}
                                        className="p-1 bg-red-500 text-white rounded"
                                    >
                                        Borrar
                                    </button>
                                </div>
                            </div>
                            <div>notas: {alumno.notas.join(', ')}</div>
                            <div>promedio: {promedio.toFixed(2)}</div>
                            <div>condicion: {condicion}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;