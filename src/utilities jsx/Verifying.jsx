import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import user from "../appwrite files/accounts";
import { UserContext } from "../js files/contexts";

function Verify() {

    const {setUserProfile} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const userId = params.get("userId");
        const secret = params.get("secret");

        if(!userId || !secret) return;

        async function verifyEmail() {
            console.log("Calling updateEmailVerification");

            try {
                
                await user.updateVer(userId, secret);

                const verifiedUser = await user.get();

                setUserProfile(verifiedUser);

                alert("Email verification successful!");

                navigate('/interior');

            } catch (err) {

                console.log("Verification threw:", err);

            }
        }

        console.log("Verification returned");
        verifyEmail();

    }, []);

    return ( 

        <div className="verify">

            <div className="loader">

                <div className="move-ball"></div>

                <p>Verifying...</p>                

            </div>
        
        </div>
    
    );
}

export default Verify;