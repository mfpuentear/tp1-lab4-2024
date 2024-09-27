import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListaTareas from './features/listaTareas.jsx';
import './App.css'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ListaTareas />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App