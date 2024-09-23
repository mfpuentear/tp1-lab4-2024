import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./app.css"
import Lobby from "./features/lobby.jsx"
import Sumas from "./features/sumas.jsx"

function App() {
  return (
    <> 
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />}/>
        <Route path="/sumas" element={<Sumas />} />
      </Routes>
    </Router>
    </>
  )
}
export default App;