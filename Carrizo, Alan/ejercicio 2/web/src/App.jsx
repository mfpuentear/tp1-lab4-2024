import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./app.css"
import Lobby from "./features/lobby.jsx"
import Perimetro from './features/perimetro.jsx';
import Area from './features/area.jsx';

function App() {
  return (
    <> 
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />}/>
        <Route path="/perimetro" element={<Perimetro />}/>
        <Route path="/area" element={<Area />}/> 
      </Routes>
    </Router>
    </>
  )
}
export default App;