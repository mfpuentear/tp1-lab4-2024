import { createRoot } from "react-dom/client";
import Sumas from "./Sumas";
import Restas from "./Restas";
import Divisiones from "./Divisiones";
import Multiplicaciones from "./Multiplicaciones";

createRoot(document.getElementById("root")).render(
    <>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "blue",
            padding: "50px",
            borderRadius: "50px"
            }}>
            <div>
                <Sumas />
            </div>

            <div>
                <Restas />
            </div>

            <div>
                <Divisiones />
            </div>

            <div>
                <Multiplicaciones />
            </div>
        </div>
    </>
);