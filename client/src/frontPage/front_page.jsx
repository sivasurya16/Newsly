import { useEffect, useState } from "react"
import Navbar from "../navbar/Navbar.jsx"
import "./front_page.css"
import NewsFlash from "./news_flash.jsx"
import axios from "axios"
import Edit from "../modify/edit.jsx"
import useAuth from "../auth/useAuth.jsx"
const api = import.meta.env.VITE_SERVER_URL || "";

function frontPage(){
    const {isAdmin} = useAuth()
    const [records,setRecords] = useState([]);
    const [toggle,setToggle] = useState(false);

    function handleUpdate(){
        setToggle(res=>!res);
    }

    useEffect(() => {
      function getRecords() {
        axios.get(`${api}/record/`, {
            headers: { "x-auth-token": localStorage.getItem("token") }
        })
        .then(response => {
            if (!response.data || !Array.isArray(response.data)) {
                console.error('Invalid response data');
                return;
            }
            setRecords(response.data);
        })
        .catch(error => {
            console.error('Error fetching records:', error.message);
        });
    }

        getRecords();
        return;
      }, [records.length,toggle]);
    return (
        <div className="front-page">
        <div className="Subtitle">
            <h1>Get your news quickly</h1>
            
            {/* Last updated need to add */}
        </div>
        <div className="news-section">
            <h2>News you can use</h2>
            {isAdmin && <a className="post-button" href="./create"><button>Create a post</button></a>}
            
            {records.map(article => (
                <NewsFlash key={article._id} article={article} change={handleUpdate} />
            ))}
        </div>
        </div>
    )
}

export default frontPage