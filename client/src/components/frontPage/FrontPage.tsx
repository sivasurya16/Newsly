import { useEffect, useState } from "react";
import "./front_page.css";
import NewsFlash from "./NewsFlash.js";
import axios from "axios";
import { toast } from 'react-toastify';
import useAuth from "../auth/useAuth.js";
import { type NewsItem } from "@/types/news.js";

const api = import.meta.env.VITE_SERVER_URL || "";

function FrontPage() {
    const { isAdmin } = useAuth()
    const [records, setRecords] = useState<NewsItem[]>([]);
    const [toggle, setToggle] = useState<boolean>(false);
    function handleUpdate() {
        setToggle(res => !res);
    }

    useEffect(() => {
        axios.get(`${api}/record/`, {
            headers: { "x-auth-token": localStorage.getItem("token") }
        })
            .then(response => {
                if (!response.data || !Array.isArray(response.data)) {
                    toast.error("Invalid response data");
                    return;
                }
                setRecords(response.data);
            })
            .catch(error => {
                toast.error(error.msg);
            });
    }, [records.length, toggle]);
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
                    <NewsFlash key={article._id} article={article} update={handleUpdate} />
                ))}
            </div>
        </div>
    )
}

export default FrontPage