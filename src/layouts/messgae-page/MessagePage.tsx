import { useState } from "react";
import { SubmitQuestion } from "./components/SubmitQuestion";
import { QA } from "./components/QA";

export const MessagePage = () =>{

    sessionStorage.setItem("redirectPath", "/MessagePage");
    const [historyClick, setHistoryClick] = useState(false);


    return(
        <div className="container mt-3">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button onClick={()=> setHistoryClick(false)} className="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-question">
                        Submit Question
                    </button>
                </li>
                <li>
                    <button onClick={()=> setHistoryClick(true)} className="nav-link" data-bs-toggle="tab" data-bs-target= "#nav-qa">
                        Q/A
                    </button>
                </li>
            </ul>
            <div className="tab-content">
                <div id="nav-question" className="container tab-pane fade show active pe-lg-5 ps-lg-5">
                    <SubmitQuestion/>
                </div>
                <div id="nav-qa" className="container tab-pane fade pe-lg-5 ps-lg-5">
                    {historyClick ? <QA/> : <></>}
                </div>
            </div>
        </div>
    );
}
