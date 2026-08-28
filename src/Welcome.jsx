import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./js files/contexts.js";
import { isValidEmail, isStrongPassword } from "./js files/utilities.js";
import Alert from "./utilities jsx/Alert.jsx";
import user from "./appwrite files/accounts.js";

function Welcome() {

    const {setUserProfile} = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [hiddenPass, setHiddenPass] = useState(false);


    const [showError, setShowError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [passErrorMessage, setPassErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [alertVisibility, setAlertVisibility] = useState(false);
    const [verificationAlert, setVerificationAlert] = useState(false);

    useEffect(() => {

        if(!showError) return;

        const timer = setTimeout(() => {
            setShowError(false);
        }, 5000)

        return () => clearTimeout(timer);

    }, [showError])

    useEffect(() => {

        if(!passError) return;

        const timer = setTimeout(() => {
            setPassError(false);
        }, 5000)

        return () => clearTimeout(timer);

    }, [passError])

    useEffect(() => {

        if(!emailError) return;

        const timer = setTimeout(() => {
            setEmailError(false);
        }, 5000)

        return () => clearTimeout(timer);

    }, [emailError])

    useEffect(() => {
        
        if (!hiddenPass) return;

        const timer = setInterval(() => {
            setHiddenPass(false);
        }, 5000)

        return () => clearInterval(timer);
    }, [hiddenPass])


    async function signUp(e) {

        e.preventDefault();

        if(!firstName || !lastName || !email || !password || !confirmPass) {
            setShowError(true);
            return;
        };

        if(password.toLowerCase() !== confirmPass.toLowerCase()) {
            setConfirmPass('');
            setPassErrorMessage('Passwords do not match');
            setPassError(true);
            return;
        }

        if(!isStrongPassword(password)) {
            setConfirmPass('');
            setPassErrorMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.');
            setPassError(true);
            return;
        }

        if(!isValidEmail(email)) {
            setEmail('');
            setEmailError(true);
            return;
        }

        const fullName = `${firstName} ${lastName}`;
    
        try {

            const result = await user.create({
                email,
                password,
                name: fullName
            });

            console.log("Created:", result);
            
            await user.login({email, password});

            const prefs = await user.prefs({
                accent: 'blue',
                quirk: true,
                quote: false,
                streak: true,
                themeDark: true,
            });

            console.log("Prefs updated:", prefs);
    
            const theUser = await user.get();
    
            console.log("Logged in user:", theUser);

            if(!theUser.emailVerification) {
                await user.createVer("http://localhost:5173/verify");

                setFirstName('');
                setLastName('');
                setEmail('');
                setPassWord('');
                setConfirmPass('');
                setVerificationAlert(true);
                
                return;
            }
    
            setUserProfile(theUser);                  

        } catch (err) {
        
            setUserProfile(null);

            if(err.type === "user_already_exists") {
                alert("An account already exists with this email.")
            }

        }

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

                    <p className={`error-message ${showError ? '' : 'hidden'}`}>Please fill in all fields</p>

                    <form className="sign-up-two">

                        <input type="text" placeholder="First Name" name="first name" className="actual-input" value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}/>
                      
                        <input type="text" placeholder="Last Name" name="last name" className="actual-input" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                
                        <p className={`error-message ${emailError ? '' : 'hidden'}`}>Please input a valid email address</p>
                        <input type="email" placeholder="Email" name="email" className="actual-input" value={email} onChange={(e) => setEmail(e.target.value)}/>

                
                        <p className={`error-message ${passError ? '' : 'hidden'}`}>{passErrorMessage}</p>
                        <div className="password-input">

                            <input type={hiddenPass ? "text" : "password"} name="input password" placeholder="Password" value={password} onChange={(e) => setPassWord(e.target.value)}/>
                            <i className={`${hiddenPass ? "bi bi-eye" : "bi bi-eye-slash"}`} onClick={() => setHiddenPass(!hiddenPass)}></i>   

                        </div>

                        <div className="password-input">

                            <input type={hiddenPass ? "text" : "password"} name="confirm password" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
                            <i className={`${hiddenPass ? "bi bi-eye" : "bi bi-eye-slash"}`} onClick={() => setHiddenPass(!hiddenPass)}></i>   

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
        
                        <button onClick={(() => setAlertVisibility(true))}>
                            Sign up with Google
                            <i className="bi bi-google"></i>    
                        </button>
                    </div>

                </section>

            </div>

            {alertVisibility && <Alert
                text={'Feature coming soon!'}
                buttonActionOne={() => setAlertVisibility(false)}
            />}

            {verificationAlert && <Alert
                text={'Account created successfully! Verify your email to access the website, check your inbox.'}
                buttonTextOne={'Okay'}
                buttonActionOne={() => setVerificationAlert(false)}
            />}

        </div>
    );
}

export default Welcome;