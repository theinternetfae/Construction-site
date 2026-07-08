import { Link } from "react-router-dom";

function WelcomeBack() {
    return ( 
        <div className="welcome-back">   

            <div className="welcome-body">
                
                <section className="welcome-body-sect welcome-body-sect-one">

                    <div className="logo-box">
                    </div>

                    <h1>Productivity<br/>that adapts to <span>you</span>.</h1>
                
                    <h2>Optima analyzes your task patterns<br/>and evolves with you — helping you<br/>achieve more, sustainably.</h2>

                    <div className="benefit">
                        <i className="bi bi-clipboard-data-fill"></i>   
                        <div className="benefit-info">
                            <p className="title">Adapts to Your Consistency</p>
                            <p>Optima adjusts your daily task capacity based on your completion trends.</p>
                        </div>
                    </div>

                    <div className="benefit">
                        <i className="bi bi-stars"></i>   
                        <div className="benefit-info">
                            <p className="title">Encourages Sustainable Habits</p>
                            <p>With a simple logic system it provides support that evolves with you.</p>
                        </div>
                    </div>

                    <div className="benefit">
                        <i className="bi bi-bullseye"></i>
                        <div className="benefit-info">
                            <p className="title">Focus on What Matters</p>
                            <p>Quiet the noise and organize your thoughts. Optima helps you stay committed to important tasks.</p>
                        </div>
                    </div>

                </section>

                <section className="welcome-body-sect welcome-body-sect-two">

                    <div className="sign-up-one">
                        <h2>Welcome Back!</h2>
                        <h3>Sign In to continue Optima.</h3>
                    </div>

                    <form className="sign-up-two">

                        <input type="email" placeholder="Email" className="actual-input"/>

                        <div className="password-input">

                            <input type="password" placeholder="Password"/>
                            <i className="bi bi-eye-slash"></i>   

                        </div>

                        <input type="submit" value={"Sign In"} className="submit-input"/>

                    </form>

                    <div className="sign-up-three">
                        <p>
                            Don't have an account?{" "}
                            
                            <Link to={"/"}>
                                <span>Sign Up</span>
                            </Link>
                        </p>

                        <button>
                            Sign In another way
                            <i className="bi bi-google"></i>
                            <i className="bi bi-apple"></i>    
                        </button>
                    </div>

                </section>

            </div>

        </div>
    );
}

export default WelcomeBack;