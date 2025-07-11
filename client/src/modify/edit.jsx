import { useLocation } from 'react-router-dom';
import Modify from './modify'
import "../loginPage/login.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const api = import.meta.env.VITE_SERVER_URL || "";

function edit(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const itemTitle = queryParams.get("itemTitle")
    const itemText = queryParams.get("itemText")
    const navigateTo = useNavigate();
    
    async function handleSave(title,text){
        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('x-auth-token', token)
        const raw = JSON.stringify({
            "itemTitle":title,
            "itemText":text
        })
        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const res = await fetch(`${api}/record/${id}/`,requestOptions)
        
        
        if (res.ok){
            toast.success("Editted the post successfully")
            navigateTo("/");
        } else {
            toast.error("Something went wrong")
        }
    }
    return (
        <div>
            <h1>Edit a post</h1>
            <Modify itemText={itemText} itemTitle={itemTitle} handleSave={handleSave}/>
        </div>
    )
}

export default  edit