import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    
    const logout = () => {
        const { dispatch } = useAuthContext()

        // remove user from storage
        localStorage.removeItem("token");

        // dispatch logout function
        dispatch({type: 'LOGOUT'})
    }

    return { logout }
}