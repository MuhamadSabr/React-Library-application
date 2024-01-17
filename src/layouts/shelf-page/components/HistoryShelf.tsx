import { useEffect, useState } from "react";
import { History } from "../../../models/History";
import { useAuth } from "../../../contexts/AuthContext";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import { getUsername, getToken } from "../../utils/Authenticated";
import { Pagination } from "../../utils/pagination";

export const HistoryShelf = () =>{

    const {isAuthenticated} = useAuth();
    const [httpError, setHttpError] = useState<string>();

    const [historyBooks, setHistoryBooks] = useState<History[]>();
    const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);

    const [totalNumberOfBooks, setTotalNumberOfBooks] = useState<number> (0);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number> (1);
    const numberOfBooksPerPage =5;
    const [currentPage, setCurrentPage] = useState<number> (1);


    useEffect(()=>{
        if(isAuthenticated){
            const url = `http://localhost:8080/api/histories/search/findBooksByUserEmail?email=${getUsername()}&page=${currentPage-1}&size=${numberOfBooksPerPage}`;
            const fetchUserHistory = async() =>{
                const headers = new Headers();
                headers.append("Content-Type", "application/json")
                headers.append("Authorization", `Bearer ${getToken()}`)
                const historyResponse = await fetch(url, {
                    method: "GET",
                    headers: headers
                });
                if(!historyResponse.ok){
                    throw new Error("Something went wrong");
                }
                const historyResponseJson = await historyResponse.json();
                setHistoryBooks(historyResponseJson._embedded.histories);
                setTotalNumberOfPages(historyResponseJson.page.totalPages)
                setTotalNumberOfBooks(historyResponseJson.page.totalElements)
                setIsLoadingHistory(false);
            }
            fetchUserHistory().catch((error:Error)=>{
                setIsLoadingHistory(false);
                setHttpError("Failed to load history of loans for reason : " + (error!=null ? error.message : ""));
            })
        }

    }, [isAuthenticated, currentPage])



    const paginate =(page:number) =>{
        setCurrentPage(page);
        window.scrollTo(0,0);
    }



    if(isLoadingHistory){
        return(
            <LoadingSpinner/>
        )
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
            <h5 className="mt-2 mb-3">Recent history({totalNumberOfBooks}):</h5>
            {
                historyBooks?.map(historyBook=>(
                    <div key={historyBook.id+historyBook.userEmail+historyBook.checkedOutDate+historyBook.returnedDate}>
                        <div className="card shadow mb-5">
                            <div className="card-body row">
                                <div className="col-lg-2 justify-content-center justify-content-lg-start d-flex">
                                <img src= {historyBook.image ? historyBook.image : require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                alt='Book' height={190} width={123}></img>
                                </div>
                                <div className="col-lg-9">
                                    <h3 className='card-title'>{historyBook.author}</h3>
                                    <h5 className='mb-3'>{historyBook.title}</h5>
                                    <p className='card-text'>{historyBook.description}</p>
                                    <hr></hr>
                                    <p className='card-text'>{`Checked out on: ${historyBook.checkedOutDate}`}</p>
                                    <p className='card-text'>{`Returned on : ${historyBook.returnedDate}`}</p>
                                </div>
                            </div>
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