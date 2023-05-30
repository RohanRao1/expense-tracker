import React, {useState} from "react";

const AuthContext = React.createContext({
    token : '',
    email : '',
    isLoggedIn : false,
    login : (id) => {},
    logout : () => {}
})

export const AuthContextProvider = props => {
    const initialtoken = localStorage.getItem('token')
    const initialEmail = localStorage.getItem('email')
    const [token, setToken] = useState(initialtoken)
    const [email , setEmail ] = useState(initialEmail)

    const userLoggedIn = token ? true : false

    const loginHandler = (tokenId, email) => {
        setToken(tokenId)
        setEmail(email)
        localStorage.setItem('token', tokenId)
        localStorage.setItem('email', email)
    }

    const logoutHandler = () => {
        setToken(null)
        setEmail(null)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }
 

    const authContext = {
        token : token,
        email : email,
        isLoggedIn : userLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }

    return <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>
}


export default AuthContext