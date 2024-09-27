import { useState, useEffect } from 'react';

function App() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [err, setErr] = useState('');

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:3000/productos');
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            setErr(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('');

        const endpoint = editingId
            ? `http://localhost:3000/productos/${editingId}`
            : 'http://localhost:3000/productos';

        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, precio: parseFloat(precio) }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new err(errData.err);
            }

            fetchProductos();
            setNombre('');
            setPrecio('');
            setEditingId(null);
        } catch (err) {
            setErr(err.message);
        }
    };

    const handleEdit = (product) => {
        setNombre(product.nombre);
        setPrecio(product.precio.toString());
        setEditingId(product.id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/productos/${id}`, { method: 'DELETE' });
            fetchProductos();
        } catch (error) {
            setErr(error.message);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "green"
        }}
        className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Listado de verduleria</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="nombre del producto"
                    className="mr-2 p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="precio"
                    className="mr-2 p-2 border rounded"
                    step="0.01"
                    min="0.01"
                    required
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    {editingId ? 'Cargar producto' : 'Añadir producto'}
                </button>
            </form>
            {err && <p className="text-red-500 mb-4">{err}</p>}
            <ul className="space-y-2">
                {productos.map((product) => (
                    <li key={product.id} className="flex items-center justify-between p-2 border rounded">
                        <span>{product.nombre}: ${product.precio.toFixed(2)}</span>
                        <div>
                            <button
                                onClick={() => handleEdit(product)}
                                className="mr-2 p-1 bg-yellow-500 text-white rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="p-1 bg-red-500 text-white rounded"
                            >
                                Borrar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;