import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate()

  const redireccion = (pagina)=>{
    navigate(pagina)
  }
  return (
    <> 
    <div>
        <h1>Calculadora</h1>
        <div style={{ display: 'flex', gap: '10px'}}>
          <button onClick={() => redireccion("/sumas")}>Sumas</button>
          <button onClick={() => redireccion("/divisiones")}>Divisiones</button>
        </div>
    </div>
    </>
  )
}
export default App;