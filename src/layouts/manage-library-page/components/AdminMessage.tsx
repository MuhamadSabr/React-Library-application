import { useState } from "react"
import { Message } from "../../../models/Message"


export const AdminMessage:React.FC<{message:Message; submitAdminResponse:(id:number, response:string)=>void}> = (props) =>{

    const [response, setResponse] = useState<string>('');
    const [displayWarning, setDisplayWarning] = useState<boolean>(false);

    const submitResponse = () =>{
        if(response.trim()===''){
            setDisplayWarning(true);
        }
        else{
            props.submitAdminResponse(props.message.id!, response);
            setDisplayWarning(false);
            setResponse('');
        }
    }


    return (
        <div className="card shadow mb-2" key={props.message.id}>
            <div className="card-body">
                <h6>Case #{props.message.id} : {props.message.title}</h6>
                <h5>{props.message.userEmail}</h5>
                <p>{props.message.question}</p>
                <hr></hr>
                <label className="form-label mt-2 lead">Response:</label>
                <textarea rows={5} className="form-control" placeholder="Submit a response" onChange={event=> setResponse(event.target.value)} value={response}></textarea>
                {
                    displayWarning &&
                    <div className="alert alert-warning alert-dismissible fade show">
                        <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setDisplayWarning(false)}></button>
                        <strong>Failed:</strong> A response is required.
                    </div>
                }
                <button id="submitResponseBtn" className="btn btn-primary mt-3" onClick={submitResponse}>Submit Response</button>
            </div>
        </div>
    )
}