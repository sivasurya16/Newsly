import "./news_flash.css";
import useAuth from "../auth/useAuth";
import { toast } from 'react-toastify';
import type { NewsItem } from "@/types/news";
import axios from "axios";


interface NewsFlashProps {
    article: NewsItem
    update: Function
}

const api = import.meta.env.VITE_SERVER_URL || "";

function NewsFlash(props: NewsFlashProps) {
    const { isAdmin } = useAuth();
    const { _id, itemTitle, body } = props.article;

    async function handleDelete() {
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
        <div className="news-flash">
            <h3>{itemTitle}</h3>
            {/* <p>{JSON.stringify(body)}</p> */}
            {isAdmin && <div>
                <button onClick={handleDelete}>Delete</button>
                <a href={`./edit?id=${_id}&itemTitle=${itemTitle}&itemText=${JSON.stringify(body)}`}><button>Edit</button></a>
            </div>}
        </div>
    )
}

export default NewsFlash;