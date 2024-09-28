import React, { useState, useEffect } from 'react'

const App = () => {
  const [tareas, setTareas] = useState([])
  const [nombreTarea, setNombreTarea] = useState('')
  const [resumen, setResumen] = useState({ total: 0, completadas: 0, noCompletadas: 0 })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTareas();
    fetchResumen();
  }, []);

  const fetchTareas = async () => {
    const response = await fetch('http://localhost:3000/tareas')
    const data = await response.json()
    setTareas(data)
  };

  const fetchResumen = async () => {
    const response = await fetch('http://localhost:3000/resumen');
    const data = await response.json();
    setResumen(data);
  };

  const agregarTarea = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombreTarea }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        return;
      }

      setNombreTarea('');
      fetchTareas();
      fetchResumen();
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  const eliminarTarea = async (nombre) => {
    await fetch(`http://localhost:3000/tareas/${nombre}`, { method: 'DELETE' });
    fetchTareas();
    fetchResumen();
  };

  const tareaCompletada = async (nombre, completada) => {
    await fetch(`http://localhost:3000/tareas/${nombre}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completada }),
    });
    fetchTareas();
    fetchResumen();
  };

  return (
    <>
      <h1>Lista de Tareas</h1>
      <form onSubmit={agregarTarea}>
        <input type="text" value={nombreTarea} onChange={(e) => setNombreTarea(e.target.value)} />
        <button type="submit">Agregar Tarea</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.nombre}>
            <p>{tarea.nombre}</p>
            <button onClick={() => tareaCompletada(tarea.nombre, !tarea.completada)}>
              {tarea.completada ? 'Desmarcar' : 'Completar'}
            </button>
            <button onClick={() => eliminarTarea(tarea.nombre)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h3>Resumen</h3>
      <p>Total de tareas: {resumen.total}</p>
      <p>Completadas: {resumen.completadas}</p>
      <p>No completadas: {resumen.noCompletadas}</p>
    </>
  );
};

export default App;

