import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [baseRectangulo, setBaseRectangulo] = useState(0);
  const [alturaRectangulo, setAlturaRectangulo] = useState(0);
  const [listaCalculos, setListaCalculos] = useState([]);
  const [calculoEnEdicion, setCalculoEnEdicion] = useState(null);

  useEffect(() => {
    const obtenerCalculos = async () => {
      const res = await fetch("http://localhost:3000/api/calculos");

      if (res.ok) {
        const calculosObtenidos = await res.json();
        console.log(calculosObtenidos);
        setListaCalculos(calculosObtenidos);
      }
    };

    obtenerCalculos();
  }, []);

  const agregarCalculo = async () => {
    const res = await fetch("http://localhost:3000/api/calculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base: baseRectangulo,
        altura: alturaRectangulo,
      }),
    });

    if (res.ok) {
      const nuevoCalculo = await res.json();
      setListaCalculos([...listaCalculos, nuevoCalculo]);
      limpiar();
    }
  };

  const editarCalculo = (calculo) => {
    setCalculoEnEdicion(calculo);
    setBaseRectangulo(calculo.base);
    setAlturaRectangulo(calculo.altura);
  };

  const guardarCalculo = async () => {
    const res = await fetch(`http://localhost:3000/api/calculos/${calculoEnEdicion.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base: baseRectangulo,
        altura: alturaRectangulo,
      }),
    });

    if (res.ok) {
      const calculoActualizado = await res.json();
      setListaCalculos(listaCalculos.map((c) => (c.id === calculoActualizado.id ? calculoActualizado : c)));
      limpiar();
    }
  };

  const eliminarCalculo = async (id) => {
    const res = await fetch(`http://localhost:3000/api/calculos/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setListaCalculos(listaCalculos.filter((c) => c.id !== id));
    }
  };

  const limpiar = () => {
    setBaseRectangulo(0);
    setAlturaRectangulo(0);
    setCalculoEnEdicion(null);
  };

  return (
    <>
      
        <div>
          <label htmlFor="base">Base: </label>
          <input
            value={baseRectangulo}
            type="number"
            step={0.1}
            onChange={(e) => setBaseRectangulo(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="altura">Altura: </label>
          <input
            value={alturaRectangulo}
            type="number"
            step={0.1}
            onChange={(e) => setAlturaRectangulo(parseFloat(e.target.value))}
          />
        </div>
        {!calculoEnEdicion && (
          <button type="button" onClick={agregarCalculo}>
            Agregar cálculo
          </button>
        )}
        {calculoEnEdicion && (
          <button type="button" onClick={guardarCalculo}>
            Guardar cálculo
          </button>
        )}
        <button type="button" onClick={limpiar}>Cancelar</button>

      <h6>Historial de cálculos</h6>
      <ul>
        {listaCalculos.map((c) => (
          <li key={c.id}>
            {c.id} Base: {c.base} - Altura: {c.altura} - Perímetro:{" "}
            {c.perimetro} - Área: {c.area} - Tipo:{" "}
            {c.base === c.altura ? "Cuadrado" : "Rectángulo"} -{" "}
            <button onClick={() => editarCalculo(c)}>Modificar</button>
            <button onClick={() => eliminarCalculo(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
