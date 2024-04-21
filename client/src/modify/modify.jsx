import { useState } from "react";
import { useLocation } from 'react-router-dom';
import "../loginPage/login.css"
function Modify(props){
    const [title,setTitle] = useState(props.itemTitle);
    const [text,setText] = useState(props.itemText);
    
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }


    function handleTextChange(event) {
        setText(event.target.value);
    }
    
    return (
        <div className="news-flash">
            <br />
            <div className={'inputContainer'}>
            <textarea defaultValue={props.itemTitle} onChange={handleTitleChange} />
            </div>
            <br />
            <textarea defaultValue={props.itemText} onChange={handleTextChange} />
            <br />
            <button onClick={()=>props.handleSave(title,text)}>Save</button>
        </div>
    )
}

export default Modify