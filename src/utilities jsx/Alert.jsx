import { createPortal } from "react-dom";

function Alert({text, buttonText, buttonActionOne, buttonActionTwo}) {
    
    return createPortal( 
        
        <div className="alert-container">
            
            <div className="alert-box">

                <p>{text}</p>
            
                <button onClick={buttonActionOne}>{buttonText}</button>
            
                {buttonActionTwo && <button>Test button</button>}
            
            </div>
        
        </div>,
        document.getElementById("modal-root")
    
    );
}

export default Alert;