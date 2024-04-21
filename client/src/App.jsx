import FrontPage from  "./frontPage/front_page"
import LoginPage from "./loginPage/login"
import RegiserPage from "./loginPage/register"
import Navbar from "./navbar/Navbar";
import Edit from "./modify/edit";
import Create from "./modify/create";
import './index.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function App(){
    return (
        <Router>
            <Navbar />
            <Routes basename={"https://news-letter-frontend.onrender.com"}>
                <Route exact path="" element={<FrontPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegiserPage />} />
                <Route exact path="/edit" element={<Edit />} />
                <Route exact path="/create" element={< Create/>} />
            </Routes>
        </Router>
    )
}

export default App