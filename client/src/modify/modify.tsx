import { useState } from "react";
import "./modify.css"
import { EditorContent } from '@tiptap/react'


// new Editor({
//   element: document.querySelector('.element'),
//   extensions: [StarterKit],
//   content: '<p>Hello World!</p>',
// })


function Modify(props) {
    const [title, setTitle] = useState(props.itemTitle);
    const [subTitle, setSubTitle] = useState(props.itemSubTitle);
    const [text, setText] = useState(props.itemText);
    const [body, setBody] = useState(props.body);


    function handleTitleChange(event) {
        setTitle(event.target.value);
    }


    function handleTextChange(event) {
        setText(event.target.value);
    }

    function handleSubTitleChange(event) {
        setSubTitle(event.target.value);
    }

    return (
        <div id="news-flash" className="create-container">
            <div className="input-container">
                <label htmlFor="title">Title</label>
                <textarea id="title" defaultValue={props.itemTitle} onChange={handleTitleChange} />
            </div>

            <div className="input-container">
                <label htmlFor="subtitle">SubTitle</label>
                <textarea id="subtitle" defaultValue={props.itemSubTitle} onChange={handleSubTitleChange} />
            </div>

            <div className="input-container">
                <label htmlFor="body">Body</label>
                {/* <textarea id="body" defaultValue={props.itemText} onChange={handleTextChange} />
                 */}
                {/* <EditorContent editor={editor} /> */}
                <div className="element">
                    
                </div>
            </div>

            <button onClick={() => {
                props.handleSave(title, text);
            }}>Save</button>

        </div>
    )
}

export default Modify