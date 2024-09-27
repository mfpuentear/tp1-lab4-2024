import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchTareas = async () => {
      const res = await fetch('http://localhost:3000/api/tareas');
      const data = await res.json();
      setTareas(data);
    };

    fetchTareas();
  }, []);

  
  const agregarTarea = async () => {
    const res = await fetch('http://localhost:3000/api/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }),
    });

    if (res.ok) {
      const nuevaTarea = await res.json();
      setTareas([...tareas, nuevaTarea]);
      setNombre(''); 
      setError('');  
    } else {
      const data = await res.json();
      setError(data.error);
      setTimeout(() => setError(''), 3000); 
    }
  };

  const toggleTareaCompletada = async (tarea) => {
    const res = await fetch(`http://localhost:3000/api/tareas/${tarea.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completada: !tarea.completada }),
    });

    if (res.ok) {
      const tareaActualizada = await res.json();
      setTareas(tareas.map(t => t.id === tareaActualizada.id ? tareaActualizada : t));
    }
  };

  const eliminarTarea = async (id) => {
    const res = await fetch(`http://localhost:3000/api/tareas/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setTareas(tareas.filter(t => t.id !== id));
    }
  };

  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter(t => t.completada).length;
  const tareasPendientes = totalTareas - tareasCompletadas;

  return (
    <div className="App">
      <h1>Listado de Tareas</h1>

      {error && <div className="error">{error}</div>}

      <form>
        <input
          type="text"
          value={nombre}
          placeholder="Nombre de la tarea"
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="button" onClick={agregarTarea}>Agregar Tarea</button>
      </form>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <strong>{tarea.nombre}</strong>
            <p>Estado: {tarea.completada ? 'Completada' : 'Pendiente'}</p>
            <button onClick={() => toggleTareaCompletada(tarea)}>
              {tarea.completada ? 'Marcar como pendiente' : 'Marcar como completada'}
            </button>
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <div>
        <p>Total de tareas: {totalTareas}</p>
        <p>Tareas completadas: {tareasCompletadas}</p>
        <p>Tareas pendientes: {tareasPendientes}</p>
      </div>
    </div>
  );
}

export default App;
