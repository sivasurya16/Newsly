import "./news_flash.css";
import useAuth from "../auth/useAuth";
import { toast } from 'react-toastify';
import type { NewsItem } from "@/types/news";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface NewsFlashProps {
    article: NewsItem
    update: Function
}

const api = import.meta.env.VITE_SERVER_URL || "";

function NewsFlash(props: NewsFlashProps) {
    const { isAdmin } = useAuth();
    const { _id, itemTitle } = props.article;
    const navigateTo = useNavigate();

    async function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        const token = localStorage.getItem("token")
        try {
            const res = await axios.delete(`${api}/record/${_id}`, {
                headers: {
                    "x-auth-token": token
                }
            });
            const data = await res.data;
            toast.success(data.msg);
            props.update();
        }
        catch (err) {
            if (axios.isAxiosError(err))
                toast.error(err.response?.data.msg);
            else
                console.error(err);
        }
    }

    return (
        <div className="news-flash" onClick={() => navigateTo(`/view/${_id}`)}>
            <h3>{itemTitle}</h3>
            {/* <p>{JSON.stringify(body)}</p> */}
            {isAdmin && <div>
                <button onClick={(event) => handleDelete(event)}>Delete</button>
                <a href={`/edit/${_id}`} onClick={(event) => event.stopPropagation()}><button>Edit</button></a>
            </div>}
        </div>
    )
}

export default NewsFlash;