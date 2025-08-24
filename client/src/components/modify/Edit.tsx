import { useParams } from 'react-router-dom';
import Modify from './Modify';
// import "./modify.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import type { NewsItem } from '@/types/news';
import { useEffect, useState } from 'react';


const api = import.meta.env.VITE_SERVER_URL || "";

function Edit() {
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const id = queryParams.get('id');
    // const itemTitle = queryParams.get("itemTitle") || ""
    // const itemText = JSON.parse(queryParams.get("itemText") || "")
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState<NewsItem>();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!id) return;
        const fetchFullNews = async () => {
            try {
                const res = await axios.get(`${api}/record/${id}`);
                setNewsItem(res.data);
            } catch (err) {
                if (axios.isAxiosError(err))
                    toast.error(err.response?.data);
                else
                    console.error(err);
            }
        };
        fetchFullNews();
    }, [id]);

    async function handleSave(title: string, text: string) {
        const body = JSON.stringify({
            "itemTitle": title,
            "body": text
        })

        const token = localStorage.getItem('token')!;
        const headers = {
            "Content-Type": "application/json",
            "x-auth-token": token,
        };
        try {
            const res = await axios.patch(`${api}/record/${id}/`, body, { headers })
            toast.success(res.data.msg)
            navigateTo("/");
        } catch (err) {
            if (axios.isAxiosError(err))
                toast.error(err.request?.data.msg);
            else
                toast.error("Something went wrong")
        }
    }
    return (
        <div>
            <h1>Edit a post</h1>
            {
                newsItem ? 
                <Modify itemText={newsItem.body} itemTitle={newsItem.itemTitle} handleSave={handleSave} itemSubTitle={""} />
                : <p>Loading...</p>
            }
        </div>
    )
}

export default Edit