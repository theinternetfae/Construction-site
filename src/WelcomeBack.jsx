import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./js files/Contexts.js";
import Alert from "./utilities jsx/Alert";
import { isValidEmail } from "./js files/Utilities.js";

function WelcomeBack() {

    // const { verified, isVerified } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [generalError, setGeneralError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    
    const [hiddenPass, setHiddenPass] = useState(false);

    const [alertVisibility, setAlertVisibility] = useState(false);

    function signUp(e) {

        e.preventDefault();

        if(!email || !password) {
            setGeneralError(true);
            return;
        }

        if(!isValidEmail(email)) {
            setEmailError(true);
            return;
        }

        console.log("Working:", `${email}-${password}`);
    
        setEmail('');
        setPassword('');

    }

    useEffect(() => {
        
        if (!generalError) return;

        const timer = setInterval(() => {
            setGeneralError(false);
        }, 5000)

        return () => clearInterval(timer);
    }, [generalError])

    
    useEffect(() => {
        
        if (!emailError) return;

        const timer = setInterval(() => {
            setEmailError(false);
        }, 5000)

        return () => clearInterval(timer);
    }, [emailError])

    
    useEffect(() => {
        
        if (!hiddenPass) return;

        const timer = setInterval(() => {
            setHiddenPass(false);
        }, 5000)

        return () => clearInterval(timer);
    }, [hiddenPass])


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

                    <p className={`error-message ${generalError ? '' : 'hidden'}`}>Please fill in all fields</p>
                    <form className="sign-up-two">

                        <p className={`error-message ${emailError ? '' : 'hidden'}`}>Please input a valid email address</p>
                        <input type="email" placeholder="Email" value={email} className="actual-input" onChange={(e) => setEmail(e.target.value)}/>

                        <div className="password-input">

                            <input type={hiddenPass ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <i className={hiddenPass ? "bi bi-eye" : "bi bi-eye-slash"} onClick={(() => setHiddenPass(!hiddenPass))}></i>   

                        </div>

                        <input type="submit" value={"Sign In"} className="submit-input" onClick={(e) => signUp(e)}/>

                    </form>

                    <div className="sign-up-three">
                        <p>
                            Don't have an account?{" "}
                            
                            <Link to={"/"}>
                                <span>Sign Up</span>
                            </Link>
                        </p>

                        <button onClick={(() => setAlertVisibility(true))}>
                            Sign Up with Google
                            <i className="bi bi-google"></i>    
                        </button>
                    </div>

                </section>

            </div>

            {alertVisibility && <Alert
                text={'Feature coming soon!'}
                buttonText={'Okay'}
                buttonActionOne={() => setAlertVisibility(false)}
            />}
        
        </div>
    );
}

export default WelcomeBack;