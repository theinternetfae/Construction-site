import { createPortal } from "react-dom";

function Loader() {
    return createPortal( 
        <div className="loader-screen">

            <div className="loader">

                <div className="move-ball"></div>

                <p>Loading...</p>                

            </div>
        
        </div>,
        document.getElementById("modal-root")
    );
}

export default Loader;