import { useEffect, useState } from "react";

function App() {
  const [sumas, setSumas] = useState([]);
  const [restas, setRestas] = useState([]);
  const [multis, setMultis] = useState([]);
  const [divisiones, setDivisiones] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [sumaId, setSumaId] = useState(0);
  const [restaId, setRestaId] = useState(0);
  const [multiId, setMultiId] = useState(0);
  const [divisionId, setDivisionId] = useState(0);

  
  const getRestas = async () => {
    const response = await fetch("http://localhost:3000/restas");
    if (response.ok) {
      const { restas } = await response.json();
      setRestas(restas);
      console.log(restas)
    }
  };

  const getSumas = async () => {
    const response = await fetch("http://localhost:3000/sumas");
    if (response.ok) {
      const { sumas } = await response.json();
      setSumas(sumas);
      console.log(sumas)
    }
  };

  const getMultis = async () => {
    const response = await fetch("http://localhost:3000/multiplicaciones");
    if (response.ok) {
      const { multis } = await response.json();
      setMultis(multis);
      console.log(multis)
    }
  };

  const getDivisiones = async () => {
    const response = await fetch("http://localhost:3000/divisiones");
    if (response.ok) {
      const { divisiones } = await response.json();
      setDivisiones(divisiones);
      console.log(divisiones)
    }
  };


  // Obtenemos listado de sumas cuando se carga por primera vez el componente
  useEffect(() => {
    getRestas();
    getSumas();
    getMultis();
    getDivisiones();
  }, []);

  // Se agrega una nueva suma
  const handleSubmitS = async (e) => {
    e.preventDefault();
    // POST localhost:3000/sumas (body: a, b)
    const response = await fetch("http://localhost:3000/sumas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las sumas a la api
      // getSumas();

      // Agregar la suma creada devuelta por la api
      const { suma } = await response.json();
      setSumas([...sumas, suma]);
      setA(0);
      setB(0);
    }
  };

  // Se agrega una nueva suma
  const handleSubmitR = async (e) => {
    e.preventDefault();
    // POST localhost:3000/sumas (body: a, b)
    const response = await fetch("http://localhost:3000/restas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las sumas a la api
      // getSumas();

      // Agregar la suma creada devuelta por la api
      const { resta } = await response.json();
      setRestas([...restas, resta]);
      setA(0);
      setB(0);
    }
  };

  // Se agrega una nueva suma
  const handleSubmitM = async (e) => {
    e.preventDefault();
    // POST localhost:3000/sumas (body: a, b)
    const response = await fetch("http://localhost:3000/multiplicaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las sumas a la api
      // getSumas();

      // Agregar la suma creada devuelta por la api
      const { multi } = await response.json();
      setMultis([...multis, multi]);
      setA(0);
      setB(0);
    }
  };

  // Se agrega una nueva suma
  const handleSubmitD = async (e) => {
    e.preventDefault();
    // POST localhost:3000/sumas (body: a, b)
    const response = await fetch("http://localhost:3000/divisiones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las sumas a la api
      // getSumas();

      // Agregar la suma creada devuelta por la api
      const { division } = await response.json();
      setDivisiones([...divisiones, division]);
      setA(0);
      setB(0);
    }
  };

  const modificarSuma = (suma) => {
    setSumaId(suma.id);
    setA(suma.a);
    setB(suma.b);
  };
  const modificarResta = (resta) => {
    setRestaId(resta.id);
    setA(resta.a);
    setB(resta.b);
  };
  const modificarMulti = (multi) => {
    setMultiId(multi.id);
    setA(multi.a);
    setB(multi.b);
  };
  const modificarDivision = (division) => {
    setDivisionId(division.id);
    setA(division.a);
    setB(division.b);
  };

  const modificarSumaApi = async () => {
    const response = await fetch(`http://localhost:3000/sumas/${sumaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las sumas a la api
      // getSumas();

      // Modificar la suma devuelta por la api
      const { suma } = await response.json();
      setSumas(sumas.map((s) => (s.id == suma.id ? suma : s)));

      setA(0);
      setB(0);
      setSumaId(0);
    }
  };

  const modificarRestaApi = async () => {
    const response = await fetch(`http://localhost:3000/restas/${restaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las sumas a la api
      // getSumas();

      // Modificar la suma devuelta por la api
      const { resta } = await response.json();
      setRestas(restas.map((r) => (r.id == resta.id ? resta : r)));

      setA(0);
      setB(0);
      setRestaId(0);
    }
  };

  const modificarMultiApi = async () => {
    const response = await fetch(`http://localhost:3000/multiplicaciones/${multiId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las sumas a la api
      // getSumas();

      // Modificar la suma devuelta por la api
      const { multi } = await response.json();
      setMultis(multis.map((m) => (m.id == multi.id ? multi : m)));

      setA(0);
      setB(0);
      setMultiId(0);
    }
  };

  const modificarDivisionApi = async () => {
    const response = await fetch(`http://localhost:3000/divisiones/${divisionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    if (response.ok) {
      // Pedir todas las sumas a la api
      // getSumas();

      // Modificar la suma devuelta por la api
      const { division } = await response.json();
      setDivisiones(divisiones.map((d) => (d.id == division.id ? division : d)));

      setA(0);
      setB(0);
      setDivisionId(0);
    }
  };

  const quitarSuma = async (id) => {
    if (confirm("¿Desea quitar suma?")) {
      const response = await fetch(`http://localhost:3000/sumas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Pedir todas las sumas a la api
        // getSumas();

        // Quitamos la suma de sumas
        setSumas(sumas.filter((suma) => suma.id !== id));
      }
    }
  };

  const quitarResta = async (id) => {
    if (confirm("¿Desea quitar resta?")) {
      const response = await fetch(`http://localhost:3000/restas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Pedir todas las sumas a la api
        // getSumas();

        // Quitamos la suma de sumas
        setRestas(restas.filter((resta) => resta.id !== id));
      }
    }
  };

  const quitarMulti = async (id) => {
    if (confirm("¿Desea quitar multi?")) {
      const response = await fetch(`http://localhost:3000/multiplicaciones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Pedir todas las sumas a la api
        // getSumas();

        // Quitamos la suma de sumas
        setMultis(multis.filter((multi) => multi.id !== id));
      }
    }
  };

  const quitarDivision = async (id) => {
    if (confirm("¿Desea quitar division?")) {
      const response = await fetch(`http://localhost:3000/divisiones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Pedir todas las sumas a la api
        // getSumas();

        // Quitamos la suma de sumas
        setDivisiones(divisiones.filter((division) => division.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Sumas</h1>
      <form onSubmit={handleSubmitS}>
        <div>
          <label htmlFor="a">a</label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">b</label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        {sumaId === 0 && <button type="submit">Agregar</button>}
      </form>
      {sumaId !== 0 && (
        <>
          <button onClick={() => modificarSumaApi()}>Modificar</button>
          <button
            onClick={() => {
              setSumaId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {sumas.map((suma) => (
          <li key={suma.id}>
            {`${suma.id}: ${suma.a} + ${suma.b} = ${suma.resultado} `}
            <button onClick={() => modificarSuma(suma)} disabled={sumaId !== 0}>
              E
            </button>
            <button onClick={() => quitarSuma(suma.id)} disabled={sumaId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>

      <h1>Restas</h1>
      <form onSubmit={handleSubmitR}>
        <div>
          <label htmlFor="a">a</label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">b</label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        {restaId === 0 && <button type="submit">Agregar</button>}
      </form>
      {restaId !== 0 && (
        <>
          <button onClick={() => modificarRestaApi()}>Modificar</button>
          <button
            onClick={() => {
              setRestaId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {restas.map((resta) => (
          <li key={resta.id}>
            {`${resta.id}: ${resta.a} - ${resta.b} = ${resta.resultado} `}
            <button onClick={() => modificarResta(resta)} disabled={restaId !== 0}>
              E
            </button>
            <button onClick={() => quitarResta(resta.id)} disabled={restaId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>


      <h1>Multiplicaciones</h1>
      <form onSubmit={handleSubmitM}>
        <div>
          <label htmlFor="a">a</label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">b</label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        {multiId === 0 && <button type="submit">Agregar</button>}
      </form>
      {multiId !== 0 && (
        <>
          <button onClick={() => modificarMultiApi()}>Modificar</button>
          <button
            onClick={() => {
              setMultiId(0);
              setA(0);
              setB(0);
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {multis.map((multi) => (
          <li key={multi.id}>
            {`${multi.id}: ${multi.a} * ${multi.b} = ${multi.resultado} `}
            <button onClick={() => modificarMulti(multi)} disabled={multiId !== 0}>
              E
            </button>
            <button onClick={() => quitarMulti(multi.id)} disabled={multiId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>


      <h1>Divisiones</h1>
      <form onSubmit={handleSubmitD}>
        <div>
          <label htmlFor="a">a</label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">b</label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        {divisionId === 0 && <button type="submit">Agregar</button>}
      </form>
      {divisionId !== 0 && (
        <>
          <button onClick={() => modificarDivisionApi()}>Modificar</button>
          <button
            onClick={() => {
              setDivisionId(0);
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
            {`${division.id}: ${division.a} / ${division.b} = ${division.resultado} `}
            <button onClick={() => modificarDivision(division)} disabled={divisionId !== 0}>
              E
            </button>
            <button onClick={() => quitarDivision(division.id)} disabled={divisionId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>

    </>
  );
}

export default App;
