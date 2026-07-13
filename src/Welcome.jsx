import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./js files/contexts";

function Welcome() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const {setIsUser} = useContext(UserContext);

    function signUp(e) {

        e.preventDefault();

        const fullName = `${firstName} ${lastName}`;
        const rightWord = `${password.toLowerCase() === confirmPass.toLowerCase() ? password : ''}`;
    
        
        const userData = { 
            name: fullName,
            email: email,
            password: rightWord
        }
        
        setIsUser(userData);
        console.log(userData);
        
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassWord('');
        setConfirmPass('');

    }    

    return ( 
        <div className="welcome">   

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
                        <h2>Welcome!</h2>
                        <h3>Sign up to access Optima.</h3>
                    </div>

                    <form className="sign-up-two">

                        <input type="text" placeholder="First Name" className="actual-input" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        <input type="text" placeholder="Last Name" className="actual-input" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        <input type="email" placeholder="Email" className="actual-input" value={email} onChange={(e) => setEmail(e.target.value)}/>

                        <div className="password-input">

                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassWord(e.target.value)}/>
                            <i className="bi bi-eye-slash"></i>   

                        </div>

                        <div className="password-input">

                            <input type="password" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
                            <i className="bi bi-eye-slash"></i>   

                        </div>

                        <input type="submit" value={"Sign Up"} className="submit-input" onClick={(e) => signUp(e)}/>

                    </form>

                    <div className="sign-up-three">
                        <p>
                            Already have an account?{" "} 
                            
                            <Link to={"/signin"}>
                                <span>Sign In</span>
                            </Link>
                        </p>
        
                        <button>
                            Sign up another way
                            <i className="bi bi-google"></i>
                            <i className="bi bi-apple"></i>    
                        </button>
                    </div>


                </section>

            </div>

        </div>
    );
}

export default Welcome;