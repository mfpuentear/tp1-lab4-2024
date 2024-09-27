import { useEffect, useState } from "react";

function Verduleria() {
    const [productos, setProductos] = useState([])
    const [producto, setProducto] = useState("")
    const [precio, setPrecio] = useState(0)
    const [addProduct, setAddProduct] = useState(false)
    const [edit, setEdit] = useState(null)
  
    const getProductos = async()=>{
        const response = await fetch('http://localhost:3000/verduleria/')
        if(response.ok){
            const { productos } = await response.json();
            console.log({productos})
            setProductos(productos)
        }
    }

    useEffect(()=>{
        getProductos()
    },[])
    
    const agregarProductos = async(e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:3000/verduleria/',{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({ producto, precio })
        })
        if(response.ok){
            console.log("Producto agregado.")
            getProductos()
            setAddProduct(false)
        } else{
            alert("No se pueden repetir los productos y su precio debe ser mayor a 0.")
        }
    }

    const eliminarProductos = async(id)=>{
        if(confirm(`¿Desea eliminar el producto Nº${id}?`)){
            const response = await fetch(`http://localhost:3000/verduleria/${id}`,{
            method: "DELETE"
        })
        if(response.ok){
            console.log("Producto eliminado.")
            getProductos()
        }}
    }

    const onEdit = async(p)=>{
        setAddProduct(true)
        setProducto(p.producto);
        setPrecio(p.precio);
        setEdit(p)
    }

    const editarProducto = async()=>{
        const response = await fetch(`http://localhost:3000/verduleria/${edit.id}`,{
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({producto, precio})
        })
        if(response.ok){
            const { data } = await response.json();
            setProductos(productos.map((p)=>p.id == data.id ? data : p))
            setPrecio(0);
            setProducto("");
            setEdit(null);
            setAddProduct(false);
        }else{
            alert("No se pueden repetir los productos y su precio debe ser mayor a 0.")
        }
    }

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems:"center"}}>
        <h1>Verdulería</h1>
        {addProduct == false && <button onClick={()=>setAddProduct(true)}>Agregar Producto</button>}
        {addProduct == true &&
        (<form onSubmit={agregarProductos} style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems:"center", padding:"0.5rem"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <label htmlFor="producto">Nombre del Producto: </label>
                <input type="text" id="producto" value={producto} onChange={(e)=>parseFloat(setProducto(e.target.value))} style={{width: '3rem'}}/>
                <label htmlFor="precio">Precio del Producto: </label>
                <input type="number" id="precio" value={precio} onChange={(e)=>parseFloat(setPrecio(e.target.value))} style={{width: '3rem'}}/>
            </div>
            {edit == null &&
            (<div style={{ display:"flex", gap:"0.5rem"}}>
                <button type="submit">Agregar</button>
                <button type="button"onClick={()=>setAddProduct(false)}>Cancelar</button>
            </div>)}
            {edit !== null &&
            (<div style={{ display:"flex", gap:"0.5rem"}}>
                <button type="button" onClick={editarProducto}>Modificar</button>
                <button type="button"onClick={()=>{
                    setProducto("");
                    setPrecio(0);
                    setEdit(null);
                    setAddProduct(false)}
                }>Cancelar</button>
            
            </div>)}
        </form>)
        }
        <ul>
            {productos.map((producto)=>(
                <li key={producto.id}>
                    <strong>{`Producto Nº${producto.id}`}</strong><br />
                    {`Nombre: ${producto.producto}, Precio: ${producto.precio} `}
                    <button onClick={()=>onEdit(producto)}>Edit</button>
                    <button onClick={()=>eliminarProductos(producto.id)}>X</button>
                </li>
            ))}
        </ul>
    </div>
    </>
  )
}

export default Verduleria