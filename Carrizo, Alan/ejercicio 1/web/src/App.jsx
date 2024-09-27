import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./app.css"
import Lobby from "./features/lobby.jsx"
import Sumas from "./features/sumas.jsx"
import Divisiones from './features/divisiones.jsx';
import Restas from "./features/restas.jsx"
import Multiplicaciones from './features/multiplicaciones.jsx';

function App() {
  return (
    <> 
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />}/>
        <Route path="/sumas" element={<Sumas />} />
        <Route path="/divisiones" element={<Divisiones />} />
        <Route path="/restas" element={<Restas />} />
        <Route path="/multiplicaciones" element={<Multiplicaciones />} />
      </Routes>
    </Router>
    </>
  )
}
export default App;