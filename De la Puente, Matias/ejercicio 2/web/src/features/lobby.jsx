import { useNavigate } from "react-router-dom";
function Lobby() {
  const navigate = useNavigate()

  const redireccion = (pagina)=>{
    navigate(pagina)
  }
  return (
    <> 
    <div>
        <h1 style={{textAlign: "center"}}>Cálculos</h1>
        <div style={{ display: 'flex', gap: '10px'}}>
          <button onClick={() => redireccion("/area")}>Cálculo de Área</button>
          <button onClick={() => redireccion("/perimetro")}>Cálculo de Perímetro</button>
        </div>
    </div>
    </>
  )
}
export default Lobby;