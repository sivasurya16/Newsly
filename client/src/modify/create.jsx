import Modify from './modify'
import "../loginPage/login.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const api = import.meta.env.VITE_SERVER_URL || "";

function Create(){
    const navigateTo = useNavigate();
    async function handleSave(title,text){
        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('x-auth-token', token)
        const raw = JSON.stringify({
            "section" : "ytd",
            "tags":[
                "ytd"
            ],
            "createdDate": Date(),
            "itemTitle":title,
            "itemText":text,
            "updates": [],
            "published": true,
            "publishedDate": Date(),
            "email": true
        })
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const res = await fetch(`${api}/record/`,requestOptions)
        
        
        if (res.ok){
            toast.success("Created the post successfully")
            navigateTo("/")
        } else {
            toast.error("Something went wrong")
        }
    }
    return(
        <div>
            <h1>Create a post</h1>
            <Modify handleSave={handleSave} />
        </div>
    )
}

export default Create