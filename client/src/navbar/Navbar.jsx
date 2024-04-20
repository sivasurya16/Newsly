import viteLogo from '/vite.svg'
import "./Navbar.css"
import useAuth from '../loginPage/useAuth'
function Navbar(){
    const {logOut} = useAuth();
    return (
        <div className='Navbar'>
        <div className='Navbar-logo'>
            <img src={viteLogo} alt="Newsletter logo"/>
            <h1>News Feed</h1>
        </div>
        <div>
            <a href="./"><button>Home</button></a>
            <a href="./login"><button>Login</button></a>
            <a href="./register"><button>Register</button></a>
            <a><button onClick={()=>{
                logOut();
                window.alert("Logged Out")
                window.location.reload();    
            }}>Logout</button></a>
        </div>
        </div>
    )
}

export default Navbar;