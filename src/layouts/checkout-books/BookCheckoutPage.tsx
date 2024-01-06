import { useEffect, useState } from "react";
import { Book } from "../../models/Book";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { ReviewStars } from "../review/ReviewStars";
import { Checkout } from "./components/Checkout";
import { Review } from "../../models/Review";
import { ReviewComponent } from "../review/ReviewComponent";
import { getToken } from "../utils/Authenticated";
import { useAuth } from "../../contexts/AuthContext";
import { ReviewDTO } from "../../models/ReviewDTO";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";


export const BookCheckoutPage = () =>{

    //Book State
    const [book, setBook] = useState<Book> (new Book(-1, "", "", "", -1, -1, "", ""));
    const [isLoading, setIsLoading] = useState<boolean> (true);
    const [httpError, setHttpError] = useState<string> ();


    //Getting the bookId from the url, and saving the current url in session storage.
    const bookId = window.location.pathname.split('/')[2];
    sessionStorage.setItem("redirectPath", `/checkout/${bookId}`)


    //Review State
    const [isReviewLoading, setReviewIsLoading] = useState<boolean> (true);
    const [reviews, setReviews] = useState<Review[]> ([]);
    const [averageRating, setAverageRating] = useState<number> (0);
    const [averageStar, setAverageStar] = useState<number> (0);
    const [hasUserLeftReview, setHasUserLeftReview] = useState(false);
    const [isLoadingHasUserLeftReview, setIsLoadingHasUserLeftReview] = useState(true);
    const [totalNumberOfReviews, setTotalNumberOfReviews] = useState(0);

    //See more review related states
    const [currentSetOfReviews, setCurrentSetOfReviews] = useState(1);
    const reviewNumberPerLoad = 5;
    let [totalLoadedReviews, setTotalLoadedReviews] = useState(5);


    //Checkout State
    const [currentCheckedOutBooks, setCurrentCheckedOutBooks] = useState(0);
    const [isLoadingCurrentCheckedOutBooks, setIsLoadingCurrentCheckedOutBooks] = useState(true);
    const [isBookCheckedOutByUser, setIsBookCheckedOutByUser] = useState(false);
    const [isLoadingBookCheckedOutByUser, setIsLoadingBookCheckedOutByUser] = useState(true);


    const {isAuthenticated} = useAuth();


    useEffect(()=>{

        const fetchBook = async () =>{

            const baseUrl = "http://localhost:8080/api/books";
            
            let url = `${baseUrl}/${bookId}`;


            const response = await fetch(url);

            if(!response.ok){
                throw new Error("Something went wrong, pardon the interruption");
            }

            const responseJson = await response.json();

            const loadedBook = new Book(responseJson.id, responseJson.title, responseJson.author, responseJson.description,
                responseJson.copies, responseJson.copiesAvailable, responseJson.category, responseJson.image);

            setBook(loadedBook);
            setIsLoading(false);

        }

        fetchBook().catch((error:Error)=>{
            setHttpError("Failed to load book for reason : " + error.message);
            setIsLoading(false);
        })

    },[bookId, isBookCheckedOutByUser])


    
    useEffect(()=>{

        const url = `http://localhost:8080/api/reviews/search/findByBookIdOrderByReviewDateDesc?bookId=${bookId}`

        const fetchBookReview = async () =>{

            const resonse = await fetch(url);

            if(!resonse.ok){
                throw new Error("Something went wrong");
            }

            const responseJson = await resonse.json();
            const loadedReviews = responseJson._embedded.reviews;
            setTotalNumberOfReviews(responseJson.page.totalElements);
            const bookReviews:Review[] = [];


            let avgRating = 0;
            for(const review of loadedReviews){
                bookReviews.push(new Review(
                    review.id,
                    review.userEmail,
                    new Date(review.reviewDate),
                    review.rating,
                    review.bookId,
                    review.reviewDescription
                ));
                avgRating += review.rating;
            }

            avgRating = avgRating / bookReviews.length;
            avgRating = Number(avgRating.toFixed(1));
            const avgStar = avgRating % 1 ===  0 ? avgRating : Math.trunc(avgRating)+.5;


            setReviews(bookReviews);
            setAverageRating(avgRating);
            setAverageStar(avgStar)
            setReviewIsLoading(false);


        }

        fetchBookReview().catch((error:Error)=>{
            setReviewIsLoading(false);
            setHttpError("Failed to load review for reason : " + error.message);
        })

    }, [bookId, hasUserLeftReview])



    useEffect(()=>{

        if(isAuthenticated){
            const url = "http://localhost:8080/api/books/currentCheckedOutCountByUser";
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", `Bearer ${getToken()}`)

            fetch(url,{
                method: "GET",
                headers: headers
            })
            .then((resonse)=> resonse.json())
            .then((response)=>{
                setCurrentCheckedOutBooks(response);
                setIsLoadingCurrentCheckedOutBooks(false);
            })
            .catch((error:Error)=>{
                setHttpError("Error loading current checkedout Books because : " + error.message);
                setIsLoadingCurrentCheckedOutBooks(false);
            })
        }
        else{
            setCurrentCheckedOutBooks(0);
            setIsLoadingCurrentCheckedOutBooks(false);
        }
        
    },[currentCheckedOutBooks, isAuthenticated, isBookCheckedOutByUser])



    useEffect(()=>{
        if(isAuthenticated){
            const url = `http://localhost:8080/api/books/isCheckedOutByUser/${bookId}`;
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", `Bearer ${getToken()}`)

            fetch(url,{
                method: "GET",
                headers: headers
            })
            .then((resonse)=> resonse.json())
            .then((response)=>{
                setIsBookCheckedOutByUser(response);
                setIsLoadingBookCheckedOutByUser(false);
            })
            .catch((error:Error)=>{
                setHttpError("Error loading, is book already checkedout because : " + error.message);
                setIsLoadingBookCheckedOutByUser(false);
            })
        }
        else{
            setIsBookCheckedOutByUser(false);
            setIsLoadingBookCheckedOutByUser(false);
        }
    }, [isAuthenticated, isBookCheckedOutByUser, bookId, isBookCheckedOutByUser])



    useEffect(()=>{
        if(isAuthenticated){
            const url = `http://localhost:8080/api/reviews/hasUserLeftReview/${bookId}`;
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", `Bearer ${getToken()}`)

            fetch(url,{
                method: "GET",
                headers: headers
            })
            .then((resonse)=> resonse.json())
            .then((response)=>{
                setHasUserLeftReview(response);
                setIsLoadingHasUserLeftReview(false);
            })
            .catch((error:Error)=>{
                setHttpError("Error loading, is book already checkedout because : " + error.message);
                setIsLoadingHasUserLeftReview(false);
            })
        }
        else{
            setHasUserLeftReview(false);
            setIsLoadingHasUserLeftReview(false);
        }
    }, [isAuthenticated, bookId])



    const checkoutBook = async() =>{
        const url = `http://localhost:8080/api/books/checkout/${bookId}`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", `Bearer ${getToken()}`)

        fetch(url,{
            method: "POST",
            headers: headers
        })
        .then((resonse)=> resonse.json())
        .then((response)=>{
            setIsBookCheckedOutByUser(true);
        })
        .catch((error:Error)=>{
            setHttpError("Error Checking book, because : " + error.message);
        })
    }



    const submitReview = async(rating:number, reviewDescription:string) =>{
        const url = `http://localhost:8080/api/reviews/add`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", `Bearer ${getToken()}`)

        const reviewDto = new ReviewDTO(rating, +bookId, reviewDescription);

        fetch(url,{
            method: "POST",
            headers: headers,
            body: JSON.stringify(reviewDto)
        })
        .then((resonse)=> resonse.text())
        .then((response)=>{
            if(response==='Success'){
            setHasUserLeftReview(true);
            }
        })
        .catch((error:Error)=>{
            setHttpError("Error submitting review, because : " + error.message);
        })
    }



    const loadReviews = async () =>{
        const url = `http://localhost:8080/api/reviews/search/findByBookIdOrderByReviewDateDesc?bookId=${bookId}&page=${currentSetOfReviews}&size=${reviewNumberPerLoad}`;

        const fetchBookReview = async () =>{

            const resonse = await fetch(url);

            if(!resonse.ok){
                throw new Error("Something went wrong");
            }

            const responseJson = await resonse.json();
            const loadedReviews = responseJson._embedded.reviews;
            const reviewDiv = document.getElementById("reviewDiv")!;

        let tempLoadedReviewsInLoop = 0;
            for(const review of loadedReviews){
                const rev = (new Review(
                    review.id,
                    review.userEmail,
                    new Date(review.reviewDate),
                    review.rating,
                    review.bookId,
                    review.reviewDescription
                ));
                const reviewContainer = document.createElement('div');
                const root = createRoot(reviewContainer);
                root.render(<ReviewComponent review={rev} key={rev.id} />);
                reviewDiv.appendChild(reviewContainer);
                tempLoadedReviewsInLoop += 1;
            }
            setTotalLoadedReviews(totalLoadedReviews+tempLoadedReviewsInLoop);
        }

        fetchBookReview().catch((error:Error)=>{
            setHttpError("Failed to load review for reason : " + error.message);
        })

        setCurrentSetOfReviews(currentSetOfReviews+1);
    }

    const toTheTop = () =>{
        window.scrollTo(0,0);
    }
 


    if(isLoading || isReviewLoading || isLoadingCurrentCheckedOutBooks || isLoadingBookCheckedOutByUser || isLoadingHasUserLeftReview){
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
        <div className="container p-3">
            <div className="row justify-content-between">
                <div className="col-lg-2 m-3 d-flex justify-content-center">
                    <img src={book.image ? book.image : require("../../Images/BooksImages/book-luv2code-1000.png")}
                    alt="book" width={190} height={280}/>
                </div>
                <div className="col-lg-5 m-3 text-justified lead">
                    <h3>{book.title}</h3>
                    <h5 className="text-primary">{book.author}</h5>
                    <p>{book.description}</p>
                    {
                        reviews.length >0 &&
                    <div className="d-flex justify-content-start align-items-start">
                        <ReviewStars rating={averageStar} size={32} />
                        <p className="ms-2 fs-4 fw-bold">{averageRating}</p>
                    </div>
                    }
                </div>
                
                < Checkout copies={book.copies} copiesAvailable={book.copiesAvailable} currentCheckedOutBooks={currentCheckedOutBooks}
                isBookCheckedOutByUser={isBookCheckedOutByUser} isAuthenticated={isAuthenticated}
                checkoutBook={checkoutBook} hasUserLeftReview={hasUserLeftReview}
                submitReview={submitReview}/>

            </div>
            <hr/>

            {   
                reviews.length>0 ?
                <div>
                     <div id="reviewDiv" className="row mt-4">
                        <p className="text-info fs-4">What other readers think of this book!? <em className="text-dark">{`(${totalNumberOfReviews} reviews)`}</em></p>
                        {
                            reviews.slice(0,5).map(review =>(
                            <ReviewComponent review={review} key={review.id} />
                            ))
                        }
                    </div>
                    <div>
                        {
                            totalNumberOfReviews <=reviewNumberPerLoad ?
                            <></> :
                            totalLoadedReviews===totalNumberOfReviews ?
                            <button className="btn btn-outline-secondary" onClick={()=>toTheTop()}>To the top of the page</button>
                            :
                            <button id="seeMoreBtn" onClick={()=>loadReviews()} className="btn btn-outline-secondary ">See More Reviews</button>
                        }
                    </div>
                </div> :
                <div className="row mt-4">
                    <p className="text-info fs-4 align-content-center">No reviews yet<ReviewStars rating={5} size={30} /> </p>
                </div>
            }
        </div>
    )
}