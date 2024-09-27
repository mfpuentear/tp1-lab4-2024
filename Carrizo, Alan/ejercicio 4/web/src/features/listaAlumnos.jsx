import { useEffect, useState } from "react"

function ListaAlumnos() {
  
    const [lista, setLista] = useState([]);
    const [alumno, setAlumno] = useState("")
    const [n1, setN1] = useState("");
    const [n2, setN2] = useState("");
    const [n3, setN3] = useState("");
    const [addAlumno, setAddAlumno] = useState(false);
    const [edit, setEdit] = useState(null);

    const getAlumnos = async () => {
        const response = await fetch("http://localhost:3000/listaAlumnos/")
        if (response.ok) {
            const { lista }  = await response.json();
            setLista(lista)
            console.log(lista)
        }
    }

    useEffect(() => {
        getAlumnos()
    }, [])

    const agregarAlumnos = async () => {
        const response = await fetch("http://localhost:3000/listaAlumnos/", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({alumno, n1: parseFloat(n1), n2: parseFloat(n2), n3: parseFloat(n3)})
        })
        if (response.status === 409) {
            alert("Alumno ya existente.")
        }
        if (response.status === 400) {
            alert("Las notas deben estar entre 0 y 10.")
        }
        if (response.ok) {
            console.log("Alumno agregado.")
            getAlumnos()
        }
    }

    const onEdit = (a) => {
        setAddAlumno(true)
        setAlumno(a.alumno);
        setN1(a.n1);
        setN2(a.n2);
        setN3(a.n3);
        setEdit(a)
    }

    const eliminarAlumnos = async (id) => {
        if (confirm(`¿Quiere eliminar el alumno Nº${id}?`)) {
            const response = await fetch(`http://localhost:3000/listaAlumnos/${id}`, {
            method: "DELETE",
        })
        if (response.ok) {
            console.log("Alumno eliminado.")
            getAlumnos()
        }}
    }

    const editarAlumno = async () => {
        const response = await fetch(`http://localhost:3000/listaAlumnos/${edit.id}`, {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({ alumno, n1: parseFloat(n1), n2: parseFloat(n2), n3: parseFloat(n3)})
        })
        if (response.status === 409) {
            alert("Alumno ya existente.")
        }
        if (response.status === 400) {
            alert("Las notas deben estar entre 0 y 10.")
        }
        if (response.ok) {
            const { data } = await response.json();
            setLista(lista.map((a) => a.id == data.id ? data : a))
            setAlumno("")
            setN1("")
            setN2("")
            setN3("")
            setAddAlumno(false)
            setEdit(null)
        }
    }

    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems:"center"}}>
            <h1>Lista de Alumnos</h1>
                {addAlumno == false && <button onClick={() => setAddAlumno(true)}>Agregar Alumno</button>}
                {addAlumno == true &&
                (<form onSubmit={agregarAlumnos} style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems:"center", padding:"0.5rem"}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"0.2rem"}}>
                        <div>
                            <label htmlFor="alumno">Nombre del Alumno: </label>
                            <input type="text" id="alumno" value={alumno} onChange={(e) => setAlumno(e.target.value)} style={{width: '5rem'}}/>
                        </div>
                        <div>
                            <label htmlFor="n1">Nota Nº1: </label>
                            <input type="number" id="n1" value={n1} onChange={(e) => setN1(e.target.value)} style={{width: '2rem'}}/>
                        </div>
                        <div>
                            <label htmlFor="n2">Nota Nº2: </label>
                            <input type="number" id="n2" value={n2} onChange={(e) => setN2(e.target.value)} style={{width: '2rem'}}/>
                        </div>
                        <div>
                            <label htmlFor="n3">Nota Nº3: </label>
                            <input type="number" id="n3" value={n3} onChange={(e) => setN3(e.target.value)} style={{width: '2rem'}}/>
                        </div>
                    </div>
                    {edit == null &&
                    (<div style={{ display:"flex", gap:"0.5rem"}}>
                        <button type="submit" disabled={!alumno.trim() || !n1.trim() || !n2.trim() || !n3.trim()}>Agregar</button>
                        <button type="button" onClick={() => {
                            setAlumno("");
                            setN1("");
                            setN2("");
                            setN3("");
                            setAddAlumno(false)
                        }}>Cancelar</button>
                    </div>)}
                    {edit !== null &&
                    (<div style={{ display:"flex", gap:"0.5rem"}}>
                        <button type="button" onClick={editarAlumno} disabled={!alumno?.trim() || !n1?.toString().trim() || !n2?.toString().trim() || !n3?.toString().trim()}>Modificar</button>
                        <button type="button" onClick={() => {
                            setAlumno("");
                            setN1("");
                            setN2("");
                            setN3("");
                            setEdit(null);
                            setAddAlumno(false)
                        }}>Cancelar</button>
                    </div>)}
                </form>)
                }
            <ul>
            {lista.map((alumno) => (
                <li key={alumno.id}>
                    <strong>{`Alumno Nº${alumno.id}`}</strong><br />
                    {`Nombre: ${alumno.alumno}, Nota Nº1: ${alumno.n1}, Nota Nº2: ${alumno.n2}, Nota Nº3: ${alumno.n3}, Promedio: ${((parseFloat(alumno.n1) + parseFloat(alumno.n2) + parseFloat(alumno.n3)) / 3).toFixed(2)} ${
                        (() => {
                            const promedio = (parseFloat(alumno.n1) + parseFloat(alumno.n2) + parseFloat(alumno.n3)) / 3;
                            return promedio < 6 ? "Desaprobado " : promedio >= 8 ? "Promoción " : "Regular ";
                        })()
                    }`}
                    <button onClick={() => onEdit(alumno)}>Edit</button>
                    <button onClick={() => eliminarAlumnos(alumno.id)}>X</button>
                </li>
            ))}
            </ul>
        </div>
        </>
    )
}

export default ListaAlumnos;