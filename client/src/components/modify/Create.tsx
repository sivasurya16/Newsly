import axios from 'axios';
import Modify from './Modify';
// import "./modify.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const api = import.meta.env.VITE_SERVER_URL || "";

function Create() {
    const navigateTo = useNavigate();
    async function handleSave(title: string, text: JSON) {

        const body = JSON.stringify({
            "section": "ytd",
            "tags": [
                "ytd"
            ],
            "createdDate": Date(),
            "itemTitle": title,
            "body": text,
            "updates": [],
            "published": true,
            "publishedDate": Date(),
            "email": "example@example.com"
        })
        const token = localStorage.getItem('token')!;
        const headers = {
            "Content-Type": "application/json",
            "x-auth-token": token,
        };
        try {
            const res = await axios.post(`${api}/record/`, body, { headers })
            toast.success(res.data.msg)
            navigateTo("/")
        } catch (err) {
            if (axios.isAxiosError(err))
                toast.error(err.response?.data.msg)
            else
                toast.error("Something went wrong")
        }
    }
    return (
        <div>
            <h1>Create a post</h1>
            <Modify handleSave={handleSave} itemTitle={""} itemSubTitle={""} itemText={Object()} />
        </div>
    )
}

export default Create