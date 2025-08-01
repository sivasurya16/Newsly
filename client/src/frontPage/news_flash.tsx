import "./news_flash.css"
import useAuth from "../auth/useAuth"
import { toast } from 'react-toastify';


const api = import.meta.env.VITE_SERVER_URL || "";

function container(props){
    const {isAdmin} = useAuth();
    const { _id, section, itemTitle, itemText, itemLink, tags, createdDate, submitter, updates, published, publishedDate, email } = props.article;
    
    async function handleDelete() {
        const token = localStorage.getItem("token")
        const res = await fetch(`${api}/record/${_id}`, {
            method: "delete",
            headers: {
                "x-auth-token": token
            }
        });
        const data = await res.json();
        if (res.ok) {
            toast.success(data.msg);
            props.update();
        } else {
            toast.error(data.msg);
        }
    }

    return (
        <div className="news-flash">
            <h3>{itemTitle}</h3>
            <p>{itemText}</p>
            {isAdmin && <div>
                <button onClick={handleDelete}>Delete</button>
                <a href={`./edit?id=${_id}&itemTitle=${itemTitle}&itemText=${itemText}`}><button>Edit</button></a>
            </div>}
        </div>
    )
}

export default container