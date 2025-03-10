import React, { useContext, useState } from "react";
import { createContext } from "react";
import { getTokens } from "../localStorage";

const AuthContext = createContext({
    user: null,
    setUser: null
});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>

}


export {
    AuthContext,
    AuthProvider
};