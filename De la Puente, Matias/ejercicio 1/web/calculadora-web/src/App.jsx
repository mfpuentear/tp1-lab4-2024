import Division from "./components/Division"
import Multiplicacion from "./components/Multiplicacion"
import Resta from "./components/Resta"
import Suma from "./components/Suma"

function App() {
  return (
    <>
      <h1>CALCULADORA</h1>
      <Suma/>
      <hr />
      <Resta/>
      <hr />
      <Multiplicacion/>
      <hr />
      <Division/>
    </>
  )
}

export default App
