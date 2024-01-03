import { useEffect, useState } from "react";
import { Book } from "../../models/Book";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { ReviewStars } from "../utils/ReviewStars";
import { Checkout } from "./components/Checkout";
import { Review } from "../../models/Review";
import { ReviewComponent } from "../utils/ReviewComponent";



export const BookCheckoutPage = () =>{

    const [book, setBook] = useState<Book> (new Book(-1, "", "", "", -1, -1, "", ""));
    const [isLoading, setIsLoading] = useState<boolean> (true);
    const [httpError, setHttpError] = useState<string> ();

    const bookId = window.location.pathname.split('/')[2];

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

        fetchBook().catch((error)=>{
            setHttpError(error);
            setIsLoading(false);
        })

    },[])


    const [isReviewLoading, setReviewIsLoading] = useState<boolean> (true);
    const [reviews, setReviews] = useState<Review[]> ([]);
    const [averageRating, setAverageRating] = useState<number> (0);
    const [averageStar, setAverageStar] = useState<number> (0);
    
    useEffect(()=>{

        const url = `http://localhost:8080/api/reviews/search/findByBookIdOrderByReviewDateDesc?bookId=${bookId}`

        const fetchBookReview = async () =>{

            const resonse = await fetch(url);

            if(!resonse.ok){
                throw new Error("Something went wrong");
            }

            const responseJson = await resonse.json();
            const loadedReviews = responseJson._embedded.reviews;
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

        fetchBookReview().catch((error:string)=>{
            setReviewIsLoading(false);
            setHttpError(error);
        })

    }, [])

 

    if(isLoading || isReviewLoading){
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
                
                < Checkout copies={book.copies} copiesAvailable={book.copiesAvailable} />

            </div>
            <hr/>

            {   
                reviews.length>0 ?
                <div>
                     <div className="row mt-4">
                        <p className="text-info fs-4">What other readers think of this book!?</p>
                        {
                            reviews.slice(0,5).map(review =>(
                            <ReviewComponent review={review} key={review.id} />
                            ))
                        }
                    </div>
                    <div>
                        <button className="btn btn-outline-secondary ">See more reviews</button>
                    </div>
                </div> :
                <div className="row mt-4">
                    <p className="text-info fs-4 align-content-center">No reviews yet<ReviewStars rating={5} size={30} /> </p>
                </div>
            }
        </div>
    )
}