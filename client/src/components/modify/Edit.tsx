import { useLocation } from 'react-router-dom';
import Modify from './Modify';
// import "./modify.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const api = import.meta.env.VITE_SERVER_URL || "";

function edit() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const itemTitle = queryParams.get("itemTitle") || ""
    const itemText = JSON.parse(queryParams.get("itemText") || "")
    const navigateTo = useNavigate();

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
            <Modify itemText={itemText} itemTitle={itemTitle} handleSave={handleSave} itemSubTitle={""} />
        </div>
    )
}

export default edit