import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function About() {

    const [info, setInfo] = useState(false);


    const [copied, setCopied] = useState(false);
    const [copiedText, setCopiedText] = useState('bi-link-45deg');

    function copyText() {
        navigator.clipboard.writeText("http://localhost:5173/test/home");
        setCopiedText('bi-check-lg')    
        setCopied(true);
    }

    useEffect(() => {
        if(!copied) return;

        const timer = setTimeout(() => {
            setCopiedText('bi-link-45deg');
            setCopied(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [copied])

    return ( 
        <div className="about">
            
            <section className="about-info">
                <div className="opener"
                    onClick={() => setInfo(prev => !prev)}
                >
                    <i className={info ? 'bi bi-caret-down' : 'bi bi-caret-right' }></i>
                    What is Optima?
                </div>
                <p className={info ? '' : 'hidden'}>Optima is a productivity app that analyzes task completion patterns to dynamically adapt its behavior. Its core feature, a self-evolving system, adjusts based on user consistency to encourage sustainable productivity rather than burnout.</p>
            </section>
        
            <section className="separator">
                <div className="demacator"></div>
                    <p>Controls</p>
                <div className="demacator"></div>
            </section>

            <section className="about-contacts">

                <div className="contact">
                    <div className="contact-label">
                        <p>Contact us</p>
                        <p className="subtitle">Send us a message</p>
                    </div>
                    <a className="button" href="mailto:favoregwele@gmail.com?subject=Hello">
                        <i className="bi bi-envelope"></i>
                    </a>
                </div>

                <div className="contact">
                    <div className="contact-label">
                        <p>Documentation</p>
                        <p className="subtitle">View the Github code</p>
                    </div>
                    <a className="button" href="https://github.com/theinternetfae/Optima-V.2" target="blank">
                        <i className="bi bi-github"></i>
                    </a>
                </div>

                <div className="contact">
                    <div className="contact-label">
                        <p>Share</p>
                        <p className="subtitle">Share to family and friends 🤞</p>
                    </div>
                    <button className="button"
                        onClick={() => copyText()}
                    >
                        <i className={`bi ${copiedText}`}></i>
                    </button>
                </div>
            
            </section>

            <p className="copyright">© 2026 • Built with sweat & tears by Favour Egwele — v2.0</p>

        </div>
    );
}

export default About;