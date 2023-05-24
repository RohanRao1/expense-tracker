import React, {useState} from "react";

const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    login : (id) => {},
    logout : () => {}
})

export const AuthContextProvider = props => {
    const [token, setToken] = useState(null)

    const userLoggedIn = token ? true : false

    const loginHandler = tokenId => {
        setToken(tokenId)
    }

    const logoutHandler = () => {
        setToken(null)
    }
 

    const authContext = {
        token : token,
        isLoggedIn : userLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }

    return <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>
}


export default AuthContext