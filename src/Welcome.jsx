function Welcome() {
    return ( 
        <div className="welcome">   

            <div className="welcome-body">
                
                <section className="welcome-body-sect welcome-body-sect-one">

                    <img src="images/optima-logo-nobg.png" alt="" className="sect-one-img"/>

                    <h1>Productivity that adapts to <span>you</span>.</h1>
                
                    <h2>Optima analyzes your task patterns and evolves with you; helping you achieve more, sustainably.</h2>

                    <div className="benefit">
                        <i className="bi bi-clipboard-data-fill"></i>   
                        <div className="benefit-info">
                            <p>Adapts to Your Consistency</p>
                            <p>Optima adjusts your daily task capacity based on your completion trends.</p>
                        </div>
                    </div>

                    <div className="benefit">
                        <i className="bi bi-stars"></i>   
                        <div className="benefit-info">
                            <p>Encourages Sustainable Habits</p>
                            <p>With a simple logic system it provides support that evolves with you.</p>
                        </div>
                    </div>

                    <div className="benefit">
                        <i className="bi bi-bullseye"></i>
                        <div className="benefit-info">
                            <p>Focus on What Matters</p>
                            <p>Optima adjusts your daily task capacity based on your completion trends.</p>
                        </div>
                    </div>

                </section>
                <section className="welcome-body-sect welcome-body-sect-two"></section>

            </div>

        </div>
    );
}

export default Welcome;