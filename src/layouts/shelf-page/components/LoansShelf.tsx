import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { ShelfCurrentLoans } from "../../../models/ShelfCurrentLoan";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import { getToken } from "../../utils/Authenticated";
import { Link } from "react-router-dom";
import { LoanModal } from "./LoanModal";

export const LoansShelf = () =>{

    const {isAuthenticated} = useAuth();
    const [httpError, setHttpError] = useState<string>();

    const [loadedShelfCurrentLoans, setLoadedShelfCurrentLoans] = useState<ShelfCurrentLoans[]>();
    const [isLoadingCurrentLoans, setIsLoadingCurrentLoans] = useState(true);
    const [reRenderLoanShelf, setReRenderLoanShelf] = useState(false);


    useEffect(()=>{
        if(isAuthenticated){
            const fetchUserCurrentLoans = async() =>{
                const url = `${process.env.REACT_APP_API}/api/books/currentLoans`;
                const headers = new Headers();
                headers.append("Content-Type", "application/json")
                headers.append("Authorization", `Bearer ${getToken()}`)

                const currentLoansResponse = await fetch(url, {
                    method: "GET",
                    headers: headers
                });

                if(!currentLoansResponse.ok){
                    throw new Error("Something went wrong")
                }
                const currentLoansResponseJson = await currentLoansResponse.json();
                setLoadedShelfCurrentLoans(currentLoansResponseJson);
                setIsLoadingCurrentLoans(false);
            }
            fetchUserCurrentLoans().catch((error:Error)=>{
                setIsLoadingCurrentLoans(false);
                setHttpError("Failed to load current user loans for reason : " + (error!=null ? error.message : ""));
            })
            window.scrollTo(0,0);
        }
    }, [isAuthenticated, reRenderLoanShelf])



    if(isLoadingCurrentLoans){
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

    const returnBook = async(bookId:number) =>{
        const url = `${process.env.REACT_APP_API}/api/books/returnCheckedOutBook/${bookId}`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", `Bearer ${getToken()}`)

        fetch(url, {
            method: "PUT",
            headers: headers
        })
        .then((response)=> response.text())
        .then((response)=>{
            if(response!=='Success'){
                setHttpError("Failed to return loan for reason : " + response);
            }
            setReRenderLoanShelf(!reRenderLoanShelf);
        })
        .catch((error:Error)=>{
            setHttpError("Failed to return loan for reason : " + (error!=null ? error.message : ""))
        })
    }


    const renewLoan = async(bookId:number) =>{
        const url = `${process.env.REACT_APP_API}/api/books/renewCheckedOutBook/${bookId}`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", `Bearer ${getToken()}`)

        fetch(url, {
            method: "PUT",
            headers: headers
        })
        .then((response)=> response.text())
        .then((response)=>{
            if(response!=='Success'){
                setHttpError("Failed to renew loan for reason : " + response);
            }
            setReRenderLoanShelf(!reRenderLoanShelf);
        })
        .catch((error:Error)=>{
            setHttpError("Failed to return loan for reason : " + (error!=null ? error.message : ""))
        })
    }


    return (
        <div>
            <h5 className="mt-2">Current Loans({loadedShelfCurrentLoans?.length}):</h5>
            {
                loadedShelfCurrentLoans?.map(shelfLoan=>(
                    <div className="row py-3" key={shelfLoan.book.id}>
                        <div className="col-lg-6 pe-5 ps-5 mb-3 d-flex justify-content-center justify-content-lg-start" >
                        <img src= {shelfLoan.book.image ? shelfLoan.book.image : require('../../../Images/BooksImages/book-luv2code-1000.png')}
                        alt='Book' height={325} width={216}></img>
                        </div>
                        <div className="col-lg-6 pe-5 ps-5">
                            <div className="card col-lg-8 mb-3 d-flex justify-content-end ms-auto">
                                <div className="card-body">
                                    <h5 className="mt-1">Loan Options</h5>
                                    {
                                        shelfLoan.daysLeft ===1 &&
                                        <p className="text-success">Due today</p>
                                    }
                                    {
                                        shelfLoan.daysLeft <=0 &&
                                        <p className="text-danger">{shelfLoan.daysLeft} past due date</p>
                                    }
                                    {
                                        shelfLoan.daysLeft >1 &&
                                        <p className="text-secondary">{`Due in ${shelfLoan.daysLeft} days.`}</p>
                                    }
                                    <div className="list-group">
                                        <button className="list-group-item list-group-item-action"
                                        data-bs-toggle="modal" data-bs-target={`#modal${shelfLoan.book.id}`}>Manage Loan</button>
                                        <Link to="/search" className="list-group-item list-group-item-action">Search more books</Link>
                                    </div>
                                    <hr></hr>
                                    <p>Help others find their adventure by leaving a review</p>
                                    <Link to={`/checkout/${shelfLoan.book.id}`} className="btn btn-primary">Leave a Review</Link>
                                </div>
                            </div>
                        </div>
                        <hr className="pt-2"></hr>
                        <LoanModal shelfLoan={shelfLoan} returnBook={returnBook} renewLoan={renewLoan}/>
                    </div>
                ))
            }
        </div>
    );

}
