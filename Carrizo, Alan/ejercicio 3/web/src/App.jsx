import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Verduleria from './features/verduleria';
import './App.css'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Verduleria />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App