import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

function Alert({text, buttonText, buttonActionOne, buttonActionTwo}) {
    
    const [scrolling, setScrolling] = useState("");

    useEffect(() => {
        
        const scroll = setTimeout(() => {
            setScrolling("translate-y-0");
        })

        return () => clearTimeout(scroll);        
    
    }, [])


    return createPortal( 
        
        <div className="alert-container">
            
            <div className={`alert-box ${scrolling}`}>

                <p>{text}</p>
            
                <div className="choices">
    
                    <button onClick={buttonActionOne}>{buttonText}</button>
                
                    {buttonActionTwo && <button>Test button</button>}

                </div>

            </div>
        
        </div>,
        document.getElementById("modal-root")
    
    );
}

export default Alert;