import FrontPage from "./components/frontPage/FrontPage";
import LoginPage from "./components/loginPage/Login";
import RegiserPage from "./components/loginPage/Register";
import Navbar from "./components/navbar/Navbar";
import Edit from "./components/modify/Edit";
import Create from "./components/modify/Create";
import { ToastContainer, Slide } from "react-toastify";
import GuestGuard from "./GuestGuard";
import './index.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import NewsDetail from "./components/frontPage/NewsDetail";


function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="" element={<FrontPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegiserPage />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/view/:id" element={<NewsDetail />} />
                    
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