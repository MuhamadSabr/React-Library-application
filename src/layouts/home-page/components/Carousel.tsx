import {CarouselItem} from './CarouselItem';
import {useEffect, useState} from 'react';
import {Book} from '../../../models/Book';
import { LoadingSpinner } from '../../utils/LoadingSpinner';
import { Link } from 'react-router-dom';


export const Carousel = () =>{

    const [books, setBooks] = useState<Book[]> ([]);
    const [isLoading, setIsLoading] = useState<boolean> (true);
    const [httpError, setHttpError] = useState<string> ();

    useEffect(()=>{

        const fetchBooks = async ()=>{

            const baseUrl = `${process.env.REACT_APP_API}/api/books`;
            const url     = `${baseUrl}?page=1&size=9`;


            const response = await fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

            const responseJson = await response.json();

            const loadedData = responseJson._embedded.books;

            const loadedBooks:Book[] =[];

            for(let book of loadedData){
                loadedBooks.push(
                    new Book(
                        book.id,
                        book.title,
                        book.author,
                        book.description,
                        book.copies,
                        book.copiesAvailable,
                        book.category,
                        book.image)
                );
            }


            setBooks(loadedBooks);
            setIsLoading(false);

        }

        fetchBooks().catch((errorMessage:string)=>{
            setIsLoading(false);
            setHttpError(errorMessage + ".\n" +
                            "Pardon the interruption.");
        })

    }, []);


    if(isLoading){
        return(
            <LoadingSpinner/>
        );
    }

    if(httpError){
        return(
            <div className='container d-flex m-5 justify-content-center align-items-center shadow lead'>
                <pre>{httpError.toString()}</pre>
            </div>
        );
    }

    return(
        <div className="container mt-5" style={{height:550}}>
            <div className="homepage-carousel-title">
                <h3>Find your next "I stayed up too late reading" book</h3>
            </div>

            <div id="top-books-carousel" className="carousel carousel-dark slide mt-5 d-none d-lg-block">

                {/* Desktop */}
                <div className="carousel-inner">

                    <CarouselItem booksToRender={[books[0], books[1], books[2]]} active='active'/>

                    <CarouselItem booksToRender={[books[3], books[4], books[5]]}/>

                    <CarouselItem booksToRender={[books[6], books[7], books[8]]}/>

                </div>
                <button className="carousel-control-prev" type="button" data-bs-slide="prev" data-bs-target="#top-books-carousel">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-slide="next" data-bs-target="#top-books-carousel">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                
            </div>

            {/*Mobile */}
            <div className="d-lg-none mt-3">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-sm-6 col-md-4 col-lg-3 text-center">
                            <img src={books[0].image ? books[0].image : '../../../Images/BooksImages/book-luv2code-1000.png'}
                             alt="book" width='151' height='233'></img>
                            <h6 className="mt-2">{books[0].title}</h6>
                            <p>{books[0].author}</p>
                            <Link className="btn btn-primary main-color text-white" to={`/checkout/${books[0].id}`}>Reserve</Link>
                        </div>
                    </div>
                </div>

            <div className="homepage-carousel-title mt-3">
                <Link to="/search" className="btn btn-outline-secondary btn-lg">View more</Link>
            </div>
        </div>
    );
}
