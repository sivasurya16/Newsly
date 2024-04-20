import { useState } from "react";
import { useLocation } from 'react-router-dom';
import "../loginPage/login.css"
function edit(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const itemTitle = queryParams.get("itemTitle")
    const itemText = queryParams.get("itemText")
    const [title,setTitle] = useState(itemTitle);
    const [text,setText] = useState(itemText);
    
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }


    function handleTextChange(event) {
        setText(event.target.value);
    }
    async function handleSave(){
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
        const res = await fetch(`https://news-letter-yynp.onrender.com/record/${id}`,requestOptions)
        
        
        if (res.status== 200){
            window.alert("Editted the post successfully")
        } else {
            window.alert("Something went wrong")
        }
    }
    return (
        <div className="news-flash">
            <br />
            <div className={'inputContainer'}>
            <textarea defaultValue={itemTitle} onChange={handleTitleChange} />
            </div>
            <br />
            <textarea defaultValue={itemText} onChange={handleTextChange} />
            <br />
            <button onClick={handleSave}>Save</button>
        </div>
    )
}

export default  edit