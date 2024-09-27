import { useEffect, useState } from "react"

function App() {
  const [sumas, setSumas] = useState([])
  const [sumaId, setSumaId] = useState(0)
  const [restas, setRestas] = useState([])
  const [restaId, setRestaId] = useState(0)
  const [multiplicaciones, setMultiplicaciones] = useState([])
  const [multiplicacionId, setMultiplicacionId] = useState(0)
  const [divisiones, setDivisiones] = useState([])
  const [divisionId, setDivisionId] = useState(0)

  const [a, setA] = useState(0)
  const [b, setB] = useState(0)



  /* ---------------SUMAS--------------- */
  const getSumas = async () => {
    const response = await fetch("http://localhost:3000/sumas")
    if (response.ok) {
      const { sumas } = await response.json()
      setSumas(sumas)
    }
  }

  useEffect(() => {
    getSumas()
  }, [])

  const handleSubmitSumas = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/sumas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    })

    if (response.ok) {
      const { suma } = await response.json()
      setSumas([...sumas, suma])
      setA(0)
      setB(0)
    }
  }

  const modificarSuma = (suma) => {
    setSumaId(suma.id)
    setA(suma.a)
    setB(suma.b)
  }

  const modificarSumaApi = async () => {
    const response = await fetch(`http://localhost:3000/sumas/${sumaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    })
    if (response.ok) {
      const { suma } = await response.json()
      setSumas(sumas.map((s) => (s.id == suma.id ? suma : s)))
      setA(0)
      setB(0)
      setSumaId(0)
    }
  }

  const quitarSuma = async (id) => {
    if (confirm("¿Desea quitar suma?")) {
      const response = await fetch(`http://localhost:3000/sumas/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSumas(sumas.filter((suma) => suma.id !== id))
      }
    }
  }
  /* ---------------SUMAS--------------- */

  /* ---------------RESTAS-------------- */
  const getRestas = async () => {
    const response = await fetch("http://localhost:3000/restas")
    if (response.ok) {
      const { restas } = await response.json()
      setRestas(restas)
    }
  }
  
  useEffect(() => {
    getRestas()
  }, [])

  const handleSubmitRestas = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/restas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    })

    if (response.ok) {
      const { data: resta } = await response.json()
      setRestas([...restas, resta])
      setA(0)
      setB(0)
    }
  }

  const modificarResta = (resta) => {
    setRestaId(resta.id)
    setA(resta.a)
    setB(resta.b)
  }

  const modificarRestaApi = async () => {
    const response = await fetch(`http://localhost:3000/restas/${restaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    })
    if (response.ok) {
      const { resta } = await response.json()
      setRestas(restas.map((s) => (s.id == resta.id ? resta : s)))
      setA(0)
      setB(0)
      setRestaId(0)
    }  
  }

  const quitarResta = async (id) => {
    if (confirm("¿Desea quitar resta?")) {
      const response = await fetch(`http://localhost:3000/restas/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setRestas(restas.filter((resta) => resta.id !== id))
      }
    }
  }
  /* ---------------RESTAS-------------- */

  /*-----------MULTIPLICACIONES--------- */
  const getMultiplicaciones = async () => {
    const response = await fetch("http://localhost:3000/multiplicaciones")
    if (response.ok) {
      const { multiplicaciones } = await response.json()
      setMultiplicaciones(multiplicaciones)
    }
  }

  useEffect(() => {
    getMultiplicaciones()
  }, [])

  const handleSubmitMultiplicaciones = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/multiplicaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    })

    if (response.ok) {
      const { multiplicacion } = await response.json()
      setMultiplicaciones([...multiplicaciones, multiplicacion])
      setA(0)
      setB(0)
    }
  }

  const modificarMultiplicacion = (multiplicacion) => {
    setMultiplicacionId(multiplicacion.id)
    setA(multiplicacion.a)
    setB(multiplicacion.b)
  }

  const modificarMultiplicacionApi = async () => {
    const response = await fetch(`http://localhost:3000/multiplicaciones/${multiplicacionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    })
    if (response.ok) {
      const { multiplicacion } = await response.json()
      setMultiplicaciones(multiplicaciones.map((s) => (s.id == multiplicacion.id ? multiplicacion : s)))
      setA(0)
      setB(0)
      setMultiplicacionId(0)
    }
  }

  const quitarMultiplicacion = async (id) => {
    if (confirm("¿Desea quitar multiplicación?")) {
      const response = await fetch(`http://localhost:3000/multiplicaciones/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMultiplicaciones(multiplicaciones.filter((multiplicacion) => multiplicacion.id !== id))
      }
    }
  }
  /*-----------MULTIPLICACIONES--------- */

  /*--------------DIVISIONES------------ */
  const getDivisiones = async () => {
    const response = await fetch("http://localhost:3000/divisiones")
    if (response.ok) {
      const { divisiones } = await response.json()
      setDivisiones(divisiones)
    }
  }

  useEffect(() => {
    getDivisiones()
  }, [])

  const handleSubmitDivisiones = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/divisiones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    })

    if (response.ok) {
      const { data: division } = await response.json()
      setDivisiones([...divisiones, division])
      setA(0)
      setB(0)
    }
  }
  const modificarDivision = (division) => {
    setDivisionId(division.id)
    setA(division.a)
    setB(division.b)
  }

  const modificarDivisionApi = async () => {
    const response = await fetch(`http://localhost:3000/divisiones/${divisionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    })
    if (response.ok) {
      const { division } = await response.json()
      setDivisiones(divisiones.map((s) => (s.id == division.id ? division : s)))
      setA(0)
      setB(0)
      setDivisionId(0)
    }
  }

  const quitarDivision = async (id) => {
    if (confirm("¿Desea quitar división?")) {
      const response = await fetch(`http://localhost:3000/divisiones/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setDivisiones(divisiones.filter((division) => division.id !== id))
      }
    }
  }
  /*--------------DIVISIONES------------ */

  return (
    <>
    <h2>Ejercicio 1</h2>
    {/* SUMAS */}
      <h3>Sumas</h3>
      <form onSubmit={handleSubmitSumas}>
        <div>
          <label htmlFor="a">a: </label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">b: </label>
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

      {/* RESTAS */}
      <h3>Restas</h3>
      <form onSubmit={handleSubmitRestas}>
        <div>
          <label htmlFor="a">a: </label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">b: </label>
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

      {/* MULTIPLICACIONES */}
      <h3>Multiplicaciones</h3>
      <form onSubmit={handleSubmitMultiplicaciones}>
        <div>
          <label htmlFor="a">a: </label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">b: </label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        {multiplicacionId === 0 && <button type="submit">Agregar</button>}
      </form>
      {multiplicacionId !== 0 && (
        <>
          <button onClick={() => modificarMultiplicacionApi()}>Modificar</button>
          <button
            onClick={() => {
              setMultiplicacionId(0);
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
            {`${multiplicacion.id}: ${multiplicacion.a} * ${multiplicacion.b} = ${multiplicacion.resultado} `}
            <button onClick={() => modificarMultiplicacion(multiplicacion)} disabled={multiplicacionId !== 0}>
              E
            </button>
            <button onClick={() => quitarMultiplicacion(multiplicacion.id)} disabled={multiplicacionId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul>

      {/* DIVISIONES */}
      <h3>Divisiones</h3>
      <form onSubmit={handleSubmitDivisiones}>
        <div>
          <label htmlFor="a">a: </label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">b: </label>
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
