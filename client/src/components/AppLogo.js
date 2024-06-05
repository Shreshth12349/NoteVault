import app_logo from "../assets/app_logo.jpg";

function AppLogo(){
    const styles = {
        width: '25em',
        display: 'flex',
        borderRadius: '20px',
        position: 'absolute',
        justifyContent: 'center',
        left: '3em',
        bottom: '3em'
    }
    return(
        <div>
            <img src={app_logo} className='app-logo' style={styles}/>
        </div>
    );
}
export default AppLogo