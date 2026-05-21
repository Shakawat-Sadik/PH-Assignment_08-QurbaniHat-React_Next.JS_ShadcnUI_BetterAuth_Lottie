import { useState } from "react"
import { SignContext } from "./signContext";


const SignProvider = ({children}) => {
    const [signInStatus, setSignInStatus] = useState(false);
    const [signUpStatus, setSignUpStatus] = useState(false);
    return (
        <SignContext.Provider value={{ signInStatus, setSignInStatus, signUpStatus, setSignUpStatus}}>
            {children}
        </SignContext.Provider>
    )
}

export default SignProvider;