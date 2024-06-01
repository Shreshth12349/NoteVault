import {useLogout} from "../hooks/useLogout";

function LogoutButton() {
    const styles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 'fit-content',
        height: "2.5rem",
        fontSize: '1.2rem',
        background: '#cc6735',
        padding: "7px 10px",
        borderRadius: '1.25rem',
        marginRight: '10px',
        fontWeight: 'bolder'
    }

    const {logout} = useLogout()
    const handleClick = async () => {
        logout()
    }
    return (
        <button style={styles} onClick={handleClick}>
            Logout
        </button>
    )
}

export default LogoutButton