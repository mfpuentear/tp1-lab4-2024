import { useState, useEffect } from 'react';

function App() {
  const [calculos, setCalculos] = useState([]);
  const [base, setBase] = useState('');
  const [altura, setAltura] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    obtenerCalculos();
  }, []);

  const obtenerCalculos = async () => {
    try {
      const res = await fetch('http://localhost:3000/calculos');
      const data = await res.json();
      setCalculos(data);
    } catch (error) {
      console.error('Error al obtener los calculos:', error);
    }
  };

  const agregarCalculo = async () => {
    if (!base || !altura) return;
    try {
      const res = await fetch('http://localhost:3000/calculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base, altura }),
      });
      if (res.ok) {
        obtenerCalculos();
        limpiarFormulario();
      }
    } catch (error) {
      console.error('Error al agregar:', error);
    }
  };

  const editarCalculo = async (id) => {
    if (!base || !altura) return;
    try {
      const res = await fetch(`http://localhost:3000/calculos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base, altura }),
      });
      if (res.ok) {
        obtenerCalculos();
        limpiarFormulario();
      }
    } catch (error) {
      console.error('Error al editar:', error);
    }
  };

  const eliminarCalculo = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/calculos/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        obtenerCalculos();
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const limpiarFormulario = () => {
    setBase('');
    setAltura('');
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      editarCalculo(editId);
    } else {
      agregarCalculo();
    }
  };

  return (
    <div>
      <h1>Calculadora de Rectangulos</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Base:</label>
          <input type="number" value={base} onChange={(e) => setBase(e.target.value)} required/>
        </div>
        <div>
          <label>Altura:</label>
          <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} required/>
        </div>
        <button type="submit">{editId ? 'Editar' : 'Agregar'} Calculo</button>
      </form>

      <h2>Calculos</h2>
      <ul>
        {calculos.map((calc) => (
          <li key={calc.id}>
            {`Base: ${calc.base}, Altura: ${calc.altura}, Perimetro: ${calc.perimetro}, Superficie: ${calc.superficie}`} -{' '}
            {calc.base === calc.altura ? 'Cuadrado' : 'Rectangulo'}
            <button onClick={() => {setEditId(calc.id);setBase(calc.base);setAltura(calc.altura);}}>Editar</button>
            <button onClick={() => eliminarCalculo(calc.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
