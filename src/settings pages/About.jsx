function About() {
    return ( 
        <div className="about">
            
            <section className="about-info">
                <div className="opener">
                    <i className="bi bi-caret-right"></i>
                    What is Optima?
                </div>
                <p>Optima is a productivity app that analyzes task completion patterns to dynamically adapt its behavior. Its core feature, a self-evolving system, adjusts based on user consistency to encourage sustainable productivity rather than burnout.</p>
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
                    <button>
                        <i className="bi bi-envelope"></i>
                    </button>
                </div>

                <div className="contact">
                    <div className="contact-label">
                        <p>Documentation</p>
                        <p className="subtitle">Behind the scenes</p>
                    </div>
                    <button>
                        <i className="bi bi-github"></i>
                    </button>
                </div>

                <div className="contact">
                    <div className="contact-label">
                        <p>Share</p>
                        <p className="subtitle">Share to family and friends 🤞</p>
                    </div>
                    <button>
                        <i className="bi bi-link-45deg"></i>
                    </button>
                </div>
            
            </section>

            <p className="copyright">© 2026 • Built with sweat & tears by Favour Egwele — v2.0</p>

        </div>
    );
}

export default About;