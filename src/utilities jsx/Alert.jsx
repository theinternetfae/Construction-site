import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

function Alert({text, buttonTextOne, buttonTextTwo, buttonActionOne, buttonActionTwo, unique}) {
    
    const [scrolling, setScrolling] = useState("");

    useEffect(() => {
        
        const scroll = setTimeout(() => {
            setScrolling("translate-y-0");
        })

        return () => clearTimeout(scroll);        
    
    }, [])

    useEffect(() => {

        if(unique) return; 

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
    
                    {buttonTextTwo && <button className="bg-[var(--red)]" onClick={buttonActionTwo}>{buttonTextTwo}</button>}

                    {buttonTextOne && <button onClick={buttonActionOne}>{buttonTextOne}</button>}                

                </div>

            </div>
        
        </div>,
        document.getElementById("modal-root")
    
    );
}

export default Alert;