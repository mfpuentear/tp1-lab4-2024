import{ useState, useEffect } from 'react';

function App() {
    const [tareas, setTareas] = useState([]);
    const [nombreNuevaTarea, setNombreNuevaTarea] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        obtenerTareas();
    }, []);

    const obtenerTareas = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/tareas');
            const datos = await respuesta.json();
            setTareas(datos);
        } catch (error) {
            setError('Error al obtener las tareas');
        }
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const respuesta = await fetch('http://localhost:3000/tareas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: nombreNuevaTarea, completada: false }),
            });

            if (!respuesta.ok) {
                const datosError = await respuesta.json();
                throw new Error(datosError.error);
            }

            obtenerTareas();
            setNombreNuevaTarea('');
        } catch (error) {
            setError(error.message);
        }
    };

    const alternarCompletadaTarea = async (id, completada) => {
        try {
            await fetch(`http://localhost:3000/tareas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completada: !completada }),
            });
            obtenerTareas();
        } catch (error) {
            setError('Error al actualizar la tarea');
        }
    };

    const eliminarTarea = async (id) => {
        try {
            await fetch(`http://localhost:3000/tareas/${id}`, { method: 'DELETE' });
            obtenerTareas();
        } catch (error) {
            setError('Error al eliminar la tarea');
        }
    };

    const totalTareas = tareas.length;
    const tareasCompletadas = tareas.filter(tarea => tarea.completada).length;
    const tareasIncompletas = totalTareas - tareasCompletadas;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: "gray"
        }}
        className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sistema de Gestión de Tareas</h1>
            <form onSubmit={manejarEnvio} className="mb-4">
                <input
                    type="text"
                    value={nombreNuevaTarea}
                    onChange={(e) => setNombreNuevaTarea(e.target.value)}
                    placeholder="Nombre de la Nueva Tarea"
                    className="mr-2 p-2 border rounded"
                    required
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Agregar Tarea
                </button>
            </form>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <p>Total de Tareas: {totalTareas}</p>
                <p>Tareas Completadas: {tareasCompletadas}</p>
                <p>Tareas Incompletas: {tareasIncompletas}</p>
            </div>
            <ul className="space-y-2">
                {tareas.map((tarea) => (
                    <li key={tarea.id} className="flex items-center justify-between p-2 border rounded">
                        <span className={tarea.completada ? 'line-through' : ''}>{tarea.nombre}</span>
                        <div>
                            <button
                                onClick={() => alternarCompletadaTarea(tarea.id, tarea.completada)}
                                className="mr-2 p-1 bg-green-500 text-white rounded"
                            >
                                {tarea.completada ? 'Deshacer' : 'Completar'}
                            </button>
                            <button
                                onClick={() => eliminarTarea(tarea.id)}
                                className="p-1 bg-red-500 text-white rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;