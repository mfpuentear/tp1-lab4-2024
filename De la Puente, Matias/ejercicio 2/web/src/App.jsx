import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./app.css"
import Lobby from "./features/lobby.jsx"
import Perimetro from './features/perimetro.jsx';

function App() {
  return (
    <> 
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />}/>
        <Route path="/perimetro" element={<Perimetro />}/>
      </Routes>
    </Router>
    </>
  )
}
export default App;