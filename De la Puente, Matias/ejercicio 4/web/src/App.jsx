import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListaAlumnos from './features/listaAlumnos.jsx';
import './App.css'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ListaAlumnos />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App