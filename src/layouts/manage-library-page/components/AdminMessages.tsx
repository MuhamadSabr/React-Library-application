import { useEffect, useState } from "react"
import { getToken } from "../../utils/Authenticated";
import { Message } from "../../../models/Message";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import { Pagination } from "../../utils/pagination";
import { AdminMessage } from "./AdminMessage";
import { AdminResponseMessage } from "../../../models/AdminResponseMessage";


export const AdminMessgaes = () =>{

    //Messgaes state
    const [messages, setMessages] = useState<Message[]>();
    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(0);
    const [totalNumberOfMessages, setTotalNumberOfMessages] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<string>();

    //Pagination state
    const messagesPerPage = 5;
    const [currentPage, setCurrentPage] = useState<number>(1);

    //Admin response message state
    const [responseSubmitted, setResponseSubmitted] = useState<boolean>(false);



    useEffect(()=>{
        const url = `http://localhost:8080/api/messages/search/findByClosed?closed=false&page=${currentPage-1}&size=${messagesPerPage}`;
        const headers = new Headers();
        headers.append('Content-Type', 'Application/json');
        headers.append('Authorization', `Bearer ${getToken()}`);
        fetch(url, {
            method: "GET",
            headers: headers
        })
        .then((response)=> response.json())
        .then((response)=>{
            setMessages(response._embedded.messages);
            setTotalNumberOfMessages(response.page.totalElements);
            setTotalNumberOfPages(response.page.totalPages)
            setIsLoading(false);
        })
        .catch((error:Error)=>{
            setIsLoading(false);
            setHttpError("Error loading messages because : " + error.message);
        })

    }, [currentPage, responseSubmitted])


    const paginate = (page:number)=>{
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }


    const submitAdminResponse = async (id:number, response:string) =>{
        const adminResponse = new AdminResponseMessage(id, response);
        const url = "http://localhost:8080/api/admin/responseMessage";
        const headers = new Headers();
        headers.append('Content-Type', 'Application/json');
        headers.append('Authorization', `Bearer ${getToken()}`);
        fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(adminResponse)
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error("Something went wrong");
            }
            setResponseSubmitted(!responseSubmitted);  
        })
        .catch((error:Error)=>{
            throw new Error("Error loading sending response because : " + error.message);
        })

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
            <h3 className="mt-2">Pending Q/A({totalNumberOfMessages})</h3>
            {
                messages?.map(message=>(
                    <AdminMessage message={message} submitAdminResponse={submitAdminResponse} key={message.id}/>
                ))
            }
            {
                totalNumberOfPages >1 &&
                <Pagination currentPage={currentPage} totalNumberOfPages={totalNumberOfPages} paginate={paginate}/>
            }
        </div>
    )
}
