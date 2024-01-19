import { useEffect, useState } from "react";
import { getToken, getUsername } from "../../utils/Authenticated";
import { useAuth } from "../../../contexts/AuthContext";
import { Message } from "../../../models/Message";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import { Pagination } from "../../utils/pagination";

export const QA = () =>{

    const {isAuthenticated} = useAuth();
    const [httpError, setHttpError] = useState<string> ();
    
    const [messages, setMessages] = useState<Message[]> ([]);
    const [isLoading, setIsLoading] = useState<boolean> (true);

    const [totalNumberOfMessages, setTotalNumberOfMessages] = useState<number> (0);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number> (1);
    const [currentPage, setCurrentPage] = useState<number> (1);
    const numberOfQuestionsPerPage = 5;


    useEffect(()=>{
        if(isAuthenticated){
            const url = `http://localhost:8080/api/messages/search/findByUserEmail?userEmail=${getUsername()}&page=${currentPage-1}&size=${numberOfQuestionsPerPage}`;
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${getToken()}`);
    
            fetch(url,{
                method: "GET",
                headers: headers
            })
            .then((resonse)=> resonse.json())
            .then((response)=>{
                setTotalNumberOfMessages(response.page.totalElements);
                setTotalNumberOfPages(response.page.totalPages);
                setCurrentPage(response.page.number+1);
                setMessages(response._embedded.messages);
                setIsLoading(false);
            })
            .catch((error:Error)=>{
                setHttpError("Error loading current questions because : " + error.message);
                setIsLoading(false);
            })
        }
    },[isAuthenticated, currentPage])


    const paginate =(page:number) =>{
        setCurrentPage(page);
    }

    if(isLoading){
        return(
            <LoadingSpinner/>
        );
    }

    if(httpError){
        return(
            <div className='container d-flex m-5 justify-content-center align-items-center'>
                <p>{httpError.toString()}</p>
            </div>
        );
    }


    return(
        <div>
            <h3 className="mt-2">Current Q/A({totalNumberOfMessages})</h3>
            {
                messages.map(message=>(
                    <div className="card shadow mb-2" key={message.id}>
                        <div className="card-body">
                            <h6>Case #{message.id} : {message.title}</h6>
                            <h5>{message.userEmail}</h5>
                            <p>{message.question}</p>
                            <hr></hr>
                            <p className="lead">Response:</p>
                            {
                                message.response && message.adminEmail
                                ?
                                <>
                                <h6>{message.adminEmail}</h6>
                                <p>{message.response}</p>
                                </>
                                :
                                <p>Pending response from Admins, thank you for your patience</p>
                            }
                        </div>
                    </div>
                ))
            }
            {
                totalNumberOfPages>1 &&
                <Pagination currentPage={currentPage} totalNumberOfPages={totalNumberOfPages} paginate={paginate}/>
            }
        </div>
    );
}
