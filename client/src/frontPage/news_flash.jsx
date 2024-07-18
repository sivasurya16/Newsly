import "./news_flash.css"
import useAuth from "../loginPage/useAuth"
import { useState } from "react";
const api = import.meta.env.VITE_SERVER_URL || "";
function container(props){
    const {isAdmin} = useAuth();
    const { _id, section, itemTitle, itemText, itemLink, tags, createdDate, submitter, updates, published, publishedDate, email } = props.article;
    
    async function handleDelete(){
        const token = localStorage.getItem("token")
        const res = await fetch(`${api}${_id}`,{
            method:"delete",
            headers : {
                "x-auth-token" : token
            }
        })
        if (res.status == 200){
            window.alert("You deleted the article")
            props.change();
        } else {
            window.alert("something is wrong")
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