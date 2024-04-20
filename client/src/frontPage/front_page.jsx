import { useEffect, useState } from "react"
import Navbar from "../navbar/Navbar.jsx"
import "./front_page.css"
import NewsFlash from "./news_flash.jsx"
import axios from "axios"
import Edit from "../edit/edit.jsx"

function frontPage(){
    
    const [records,setRecords] = useState([]);
    const [toggle,setToggle] = useState(false);

    function handleUpdate(){
        setToggle(res=>!res);
    }

    useEffect(() => {
      function getRecords() {
        axios.get('https://news-letter-yynp.onrender.com/record/', {
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
        <>
        <div className="Subtitle">
            <h1>Get your news quickly</h1>
            <p>Here is what you need to know this week</p>
            {/* Last updated need to add */}
        </div>
        <div className="news-section">
            <h2>News you can use</h2>
            
            {records.map(article => (
                <NewsFlash key={article._id} article={article} change={handleUpdate} />
            ))}
        </div>
        
        </>
    )
}

export default frontPage