import {createContext, useEffect, useReducer, useState} from "react";
import {set} from "react-hook-form";

export const AuthContext = createContext(null)
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default: return state
    }
}
export const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        user: null,
    })
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
           dispatch({type: 'LOGIN', payload: user})
        }
        setLoading(false)
    }, []);
    console.log('AuthContext state: ', authState)

    return (
        <AuthContext.Provider value={{authState, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}