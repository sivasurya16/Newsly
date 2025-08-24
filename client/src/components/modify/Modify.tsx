import { useState } from "react";
import "./modify.css";
import Editor from '../simple/TiptapEditor';

interface ModifyProps {
    itemTitle: string,
    itemSubTitle: string,
    itemText: JSON,
    handleSave: Function
}


function Modify(props: ModifyProps) {
    const [title, setTitle] = useState<string>(props.itemTitle);
    const [_subTitle, setSubTitle] = useState<string>(props.itemSubTitle);
    const [jsonContent, setJsonContent] = useState<JSON>(props.itemText);
    // const [body, setBody] = useState(props.body);


    function handleTitleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTitle(event.target.value);
    }

    // function handleBodyChange(res) {
    //     setJsonContent(res);
    //     // setText(event.target.value);
    // }

    function handleSubTitleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setSubTitle(event.target.value);
    }

    return (
        <>
            <div id="news-flash" className="create-container">
                <div className="input-container">
                    <label htmlFor="title">Title</label>
                    <textarea id="title" defaultValue={props.itemTitle} onChange={handleTitleChange} />
                </div>

                <div className="input-container">
                    <label htmlFor="subtitle">SubTitle</label>
                    <textarea id="subtitle" defaultValue={props.itemSubTitle} onChange={handleSubTitleChange} />
                </div>
                <Editor content={jsonContent} updateContent={setJsonContent} />

                <button onClick={() => {
                    props.handleSave(title, jsonContent);
                }}>Save</button>

            </div>

        </>
    )
}

export default Modify