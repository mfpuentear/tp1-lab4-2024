import { useNavigate } from "react-router-dom";
function Lobby() {
  const navigate = useNavigate()

  const redireccion = (pagina)=>{
    navigate(pagina)
  }
  return (
    <> 
    <div>
        <h1 style={{textAlign: "center"}}>Calculadora</h1>
        <div style={{ display: 'flex', gap: '10px'}}>
          <button onClick={() => redireccion("/sumas")}>Sumas</button>
          <button onClick={() => redireccion("/divisiones")}>Divisiones</button>
          <button onClick={() => redireccion("/restas")}>Restas</button>
          <button onClick={() => redireccion("/multiplicaciones")}>Multiplicaciones</button>
        </div>
    </div>
    </>
  )
}
export default Lobby;