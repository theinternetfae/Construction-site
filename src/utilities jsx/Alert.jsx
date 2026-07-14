import { createPortal } from "react-dom";

function Alert() {
    return createPortal( 
        <div className="alert-container">
            <div className="alert-box">
                <p>Press the button to verify your account</p>
                <button>Verify</button>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default Alert;