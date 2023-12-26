import { Link } from 'react-router-dom';
import {Book} from '../../models/Book';

export const BookCard:React.FC<{book:Book}> = (props)=>{
    return(
        <div className='container py-3 g-0'>

            <div className='card shadow p-3 rounded'>

                {/* Desktop */}
                <div className='d-none d-lg-block'>
                    <div className='row'>
                        <div className='col-2'>
                            <img src= {props.book.image ? props.book.image : require('../../Images/BooksImages/book-luv2code-1000.png')}
                            alt='Book' height={190} width={123}></img>
                        </div>

                        <div className='card-body col-3'>
                            <h3 className='card-title'>{props.book.author}</h3>
                            <h5 className='mb-3'>{props.book.title}</h5>
                            <p className='card-text'>{props.book.description}</p>
                        </div>

                        <div className='col-3 d-flex justify-content-center align-items-center'>
                            <Link to={`/checkout/${props.book.id}`} className='btn btn-primary'>View Details</Link>
                        </div>
                    </div>
                </div>

                {/* Mobile */}
                <div className='d-lg-none'>

                    <div className='d-flex justify-content-center'>
                        <img src= {props.book.image ? props.book.image : require('../../Images/BooksImages/book-luv2code-1000.png')}
                        alt='Book' height={190} width={123}></img>
                    </div>
                    <div className='card-body'>
                        <h3 className='card-title'>{props.book.author}</h3>
                        <h5 className='mb-3'>{props.book.title}</h5>
                        <p className='card-text'>{props.book.description}</p>
                    </div>

                    <div className='d-flex justify-content-center align-items-center'>
                        <Link to={`/checkout/${props.book.id}`} className='btn btn-primary'>View Details</Link>
                    </div>

                </div>

            </div>

        </div>
    );
}