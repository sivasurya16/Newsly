import FrontPage from "./frontPage/front_page"
import LoginPage from "./loginPage/login"
import RegiserPage from "./loginPage/register"
import Navbar from "./navbar/Navbar"
import Edit from "./modify/edit"
import Create from "./modify/create"
import { ToastContainer,Slide } from "react-toastify"
import GuestGuard from "./guestGuard"
import './index.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";


function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="" element={<FrontPage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/register" element={<RegiserPage />} />
                    <Route exact path="/edit" element={<Edit />} />
                    <Route exact path="/create" element={< Create />} />
                </Routes>
            </Router>
            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
        </>
    )
}

export default App