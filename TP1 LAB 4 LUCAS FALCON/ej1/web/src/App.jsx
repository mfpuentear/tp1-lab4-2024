import Sumas from "./Sumas";
import Divisiones from "./Divisiones";
import Restas from "./Restas";
import Multiplicaciones from "./Multiplicaciones";
function App() {


  return (
      <>
      <div>
      <Sumas/>
      <Restas/>
      </div>
      <div>
      <Divisiones/>
      <Multiplicaciones/>
      </div>
      </>
  );
}

export default App;