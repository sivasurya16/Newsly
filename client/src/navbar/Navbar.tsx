import viteLogo from '/vite.svg'
import useAuth from '../auth/useAuth'
import "./Navbar.css"


function Navbar(){
    const {logOut,isAuthenticated} = useAuth();
    return (
        <div className='Navbar'>
        <div className='Navbar-logo'>
            <img src={viteLogo} alt="Newsletter logo"/>
            <h1>Newsly</h1>
        </div>
        <div className='Navbar-button-container'>
            <a href="./"><button>Home</button></a>
            {!isAuthenticated && <a href="./login"><button>Login</button></a>}
            {!isAuthenticated && <a href="./register"><button>Register</button></a>}
            {isAuthenticated && <a><button onClick={logOut}>Logout</button></a>}
        </div>
        </div>
    )
}

export default Navbar;