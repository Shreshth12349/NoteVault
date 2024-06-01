import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        console.log("successfully logged out")
    }

    return {logout}
}