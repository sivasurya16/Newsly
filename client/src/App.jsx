import FrontPage from  "./frontPage/front_page"
import LoginPage from "./loginPage/login"
import RegiserPage from "./loginPage/register"
import Navbar from "./navbar/Navbar";
import Edit from "./edit/edit";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";


function App(){
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<FrontPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegiserPage />} />
                <Route path="/edit" element={<Edit />} />
            </Routes>
        </Router>
    )
}

export default App