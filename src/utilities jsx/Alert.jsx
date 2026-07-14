import { createPortal } from "react-dom";

function Alert() {
    return createPortal( 
        <div className="alert-container">
            ALERTTTTTTTTT
        </div>,
        document.getElementById("modal-root")
    );
}

export default Alert;