import { useState } from "react";
import { getToken } from "../../utils/Authenticated";
import { Message } from "../../../models/Message";

export const SubmitQuestion = () =>{

    const [title, setTitle] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const[displayWarning, setDisplayWarning] = useState<boolean>(false);
    const[displaySuccess, setDisplaySuccess] = useState<boolean>(false);

    const submitMessage = ()=>{
        if(title.trim()==='' || question.trim()===''){
            setDisplaySuccess(false);
            setDisplayWarning(true);
            console.log("submitMessage was called")
        }else{

            const url = `http://localhost:8080/api/messages/postMessage`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", `Bearer ${getToken()}`)

        const newMessage = new Message(title, question);

        fetch(url,{
            method: "POST",
            headers: headers,
            body: JSON.stringify(newMessage)
        })
        .then((response)=>{
            if(response.ok){
                setDisplayWarning(false);
                setDisplaySuccess(true);
                setTitle('');
                setQuestion('');
            }else{
                throw new Error("Something went wrong")
            }
        })
        .catch((error:Error)=>{
            throw new Error("Error submitting message, because : " + error.message);
        })

        }
    }

    console.log(title);
    console.log(question);

    return(
        <div className="card mt-4">
            <div className="card-header">
                <h6>Ask Questions to Mmd Library admins</h6>
            </div>
            <div className="card-body">
                {
                    displayWarning &&
                    <div className="alert alert-warning">
                        <strong>Failed:</strong> all fields must be filled out
                    </div>
                }
                {
                    displaySuccess &&
                    <div className="alert alert-success alert-dismissible fade show">
                        <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setDisplaySuccess(false)}></button>
                        <strong>Success:</strong> message was submitted
                    </div>
                }
                <label className="form-label">Title</label>
                <input type="text" className="form-control" placeholder="Title" onChange={event=> setTitle(event.target.value)} value={title}></input>
                <label className="form-label mt-2">Question</label>
                <textarea rows={10} className="form-control" placeholder="Ask a Question" onChange={event=> setQuestion(event.target.value)} value={question}></textarea>
                <button className="btn btn-primary mt-3" onClick={submitMessage}>Submit Question</button>
            </div>
        </div>
    );
}
