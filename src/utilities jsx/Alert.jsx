import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

function Alert({text, buttonTextOne, buttonTextTwo, buttonActionOne, buttonActionTwo}) {
    
    const [scrolling, setScrolling] = useState("");

    useEffect(() => {
        
        const scroll = setTimeout(() => {
            setScrolling("translate-y-0");
        })

        return () => clearTimeout(scroll);        
    
    }, [])

    useEffect(() => {
        const exit = setTimeout(() => {
            buttonActionOne();
        }, 5000)

        return () => clearTimeout(exit);
    }, [])


    return createPortal( 
        
        <div className="alert-container">
            
            <div className={`alert-box ${scrolling}`}>

                <p>{text}</p>
            
                <div className="choices">
    
                    <button onClick={buttonActionOne}>{buttonTextOne}</button>
                
                    {buttonActionTwo && <button onClick={buttonActionTwo}>{buttonTextTwo}</button>}

                </div>

            </div>
        
        </div>,
        document.getElementById("modal-root")
    
    );
}

export default Alert;