import { useEffect, useState } from "react"

function Tres() {

  const [prod, setProd] = useState({
    prod: '',
    precio: 0
  })
  const [lista, setLista] = useState([])
  const [prodAModificar, setProdAModificar] = useState(-1)
  const [productoModificado, setProductoModificado] = useState({
    prod: '',
    precio: 0
  })

  const handleInputChange = (e) => {
    setProd({
      ...prod,
      [e.target.id]: e.target.value
    })
  }

  useEffect(() => {
    fetch("http://localhost:7777/productos")
      .then(data => data.json())
      .then(res => {
        setLista(res)
      })
  }, [])

  useEffect(() => {
    if (prodAModificar >= 0) {
      setProductoModificado({
        prod: lista[prodAModificar][0],
        precio: lista[prodAModificar][1]
      })
    }
  }, [prodAModificar, lista])

  const handleSubmit = () => {
    fetch("http://localhost:7777/productos", {
      method: 'POST',
      body: JSON.stringify(prod),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(data => data.json())
      .then(res => {
        if (res.message) {
          alert(res.message)
        } else {
          setLista(res)
        }
      })
  }

  const handleDelete = (indice) => {
    fetch(`http://localhost:7777/productos/${indice}`, {
      method: 'DELETE'
    })
      .then(data => data.json())
      .then(res => setLista(res))
  }

  const handleModify = (index) => {
    fetch(`http://localhost:7777/productos/${index}`, {
      method: 'PUT',
      body: JSON.stringify({
        prod: productoModificado.prod,
        precio: productoModificado.precio
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json())
      .then(() => { window.location.reload() })
  }

  const handleInputModifyChange = (e) => {
    setProductoModificado({
      ...productoModificado,
      [e.target.id]: e.target.value
    })

  }

  return (
    <>
      <div>
        <label htmlFor="prod">Producto: </label>
        <input type="text" id="prod" onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="precio">Precio: </label>
        <input type="text" id="precio" onChange={handleInputChange} />
      </div>
      <button onClick={handleSubmit}>Subir Producto</button>

      <p>Lista de productos:</p>
      <ul>
        {
          lista.length > 0 &&
          lista.map((prod, index) => (
            <div key={prod[0]}>
              <li>{prod[0]} - ${prod[1]}</li>
              <button onClick={() => setProdAModificar(index)}>Editar</button>
              <button onClick={() => { handleDelete(index) }}>Eliminar</button>
            </div>
          ))
        }
        {
          prodAModificar >= 0 &&
          <div className="modify-modal">
            <div className="modify-box">
              <div onClick={() => setProdAModificar(-1)}>X</div>
              <label htmlFor="prod">Nombre: </label>
              <input type="text" id="prod" value={productoModificado.prod} onChange={handleInputModifyChange} />
              <label htmlFor="precio">Precio: </label>
              <input type="number" id="precio" value={productoModificado.precio} onChange={handleInputModifyChange} />
              <button onClick={() => handleModify(prodAModificar)}>Modificar</button>
            </div>
          </div>
        }
      </ul>
    </>
  )
}

export default Tres
