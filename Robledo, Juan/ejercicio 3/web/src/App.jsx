import { useEffect, useState } from "react";

function App() {
  const [inventario, setInventario] = useState([]);
  const [itemId, setItemId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0.0);

  const URL = "http://localhost:3000/inventario/";

  const getInventario = async () => {
    const response = await fetch(URL);
    if (response.ok) {
      const { data } = await response.json();
      setInventario(data);
    }
  };

  useEffect(() => {
    getInventario();
  }, []);

  // ------------------------------------------------

  const modificarItem = (item) => {
    setItemId(item.id);
    setNombre(item.nombre);
    setPrecio(item.precio);
  };

  const modificarItemApi = async () => {
    const response = await fetch(`${URL}${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setInventario(
        inventario.map((item) => (item.id == data.id ? data : item))
      );
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  const quitarItem = async (id) => {
    if (confirm("¿Desea quitar este elemento?")) {
      const response = await fetch(`${URL}${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInventario(inventario.filter((item) => item.id !== id));
      }
    }
  };

  //--------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    });
    if (response.ok) {
      const { data } = await response.json();
      setInventario([...inventario, data]);
      setNombre("");
      setPrecio(0);
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre" style={{ marginRight: 10 }}>
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Zapallo"
          />
          <label htmlFor="precio" style={{ margin: "0 10px" }}>
            Precio
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
          />
        </div>
        {itemId === 0 && (
          <button type="submit" style={{ ...styles.button, marginTop: 10 }}>
            Agregar
          </button>
        )}
        {itemId !== 0 && (
          <div>
            <button
              onClick={modificarItemApi}
              type="button"
              style={{ ...styles.button, marginTop: 10 }}
            >
              Modificar
            </button>
            <button
              onClick={() => {
                setItemId(0);
                setNombre("");
                setPrecio(0);
              }}
              style={{ ...styles.button, marginTop: 10 }}
            >
              Cancelar
            </button>
          </div>
        )}
      </form>

      <h1 style={styles.title}>Productos de la Verdulería</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Precio</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>{item.nombre}</td>
              <td style={styles.td}>${item.precio.toFixed(2)}</td>
              <td style={styles.td}>
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() => modificarItem(item)}
                    disabled={itemId !== 0}
                    style={styles.button}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => quitarItem(item.id)}
                    disabled={itemId !== 0}
                    style={styles.button}
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",
    padding: 20,
    maxWidth: 800,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f2f2f2",
    border: "1px solid #ddd",
    padding: 12,
  },
  td: {
    border: "1px solid #ddd",
    padding: 12,
  },
  button: {
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
    cursor: "pointer",
  },
};

export default App;
