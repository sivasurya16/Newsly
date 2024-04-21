import Modify from './modify'
import "../loginPage/login.css"


function Create(){
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
        const res = await fetch(`https://news-letter-yynp.onrender.com/record/`,requestOptions)
        
        
        if (res.status== 200){
            window.alert("Editted the post successfully")
        } else {
            window.alert("Something went wrong")
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