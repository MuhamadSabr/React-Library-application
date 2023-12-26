import {useState, useEffect} from 'react';
import {Book} from '../../models/Book';
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { BookCard } from './BookCard';
import {Pagination} from '../utils/pagination';

enum Category{
    ALL ="All", FE ="Front-End" , BE ="Back-End", DATA ="Data", DEVOPS = "Dev-Ops"
}

// Utility function for getting the name of a Category instance
const getEnumKeyByValue = (categoryValue: string): Category|undefined => {
    const keys = Object.keys(Category) as (keyof typeof Category)[];
    return keys.find(key => Category[key] === categoryValue) as Category | undefined;
}

export const SearchBooksPage = ()=>{


    const [books, setBooks] = useState<Book[]> ([]);
    const [isLoading, setIsLoading] = useState<boolean> (true);
    const [httpError, setHttpError] = useState<string> ();
    const [totalNumberOfBooks, setTotalNumberOfBooks] = useState<number> (0);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number> (1);
    const [currentPage, setCurrentPage] = useState<number> (1);
    const [search, setSearch] = useState<string>('');
    const [category, setCategory]   = useState<Category> (Category.ALL);

    
    const numberOfBooksPerPage =5;
    const firstBookIndex = (currentPage-1)*numberOfBooksPerPage+1;
    const lastBookIndex  = Math.min((currentPage-1)*numberOfBooksPerPage+numberOfBooksPerPage, totalNumberOfBooks);
    

    useEffect(()=>{

        const fetchBooks = async ()=>{

            const baseUrl = "http://localhost:8080/api/books";

            let url = '';

            if(search.trim()===''){
                url = `${baseUrl}?page=${currentPage-1}&size=${numberOfBooksPerPage}`;
            }else{
                url = category===Category.ALL ?
                `${baseUrl}/search/findByTitleContainingIgnoreCase?title=${search}&page=${currentPage-1}&size=${numberOfBooksPerPage}` :
                `${baseUrl}/search/findByCategoryContainingIgnoreCaseAndTitleContainingIgnoreCase?category=${getEnumKeyByValue(category)}&title=${search}&page=${currentPage-1}&size=${numberOfBooksPerPage}` ;
            }

            if(category!==Category.ALL && search.trim()===''){
                url = `${baseUrl}/search/findByCategoryIgnoreCase?category=${getEnumKeyByValue(category)}&page=${currentPage-1}&size=${numberOfBooksPerPage}`;
            }

            const response = await fetch(url);
            
            if(!response.ok){
                throw new Error("Something went wrong");
            }

            const responseJson = await response.json();

            const loadedData = responseJson._embedded.books;

            setTotalNumberOfBooks(responseJson.page.totalElements);
            setTotalNumberOfPages(responseJson.page.totalPages);
            setCurrentPage(responseJson.page.number+1);

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
            setHttpError(errorMessage);
        })

        window.scrollTo(0,0);
    }, [currentPage, category, search]);


    const paginate =(page:number) =>{
        setCurrentPage(page);
    }


    const handleSearchCase = ()=>{
        if(search.trim()!==''){
            setCurrentPage(1);
        }
    }

    const handleCategory = (categ:Category)=>{

        if(categ!==category){
            setCategory(categ);
            setCurrentPage(1);
        }
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
        
        <div className='container py-3'>

            <div className='row d-flex py-3'>

                <div className='row col-6 m-0'>
                    <input className='form-control' type="search" placeholder='Search' onChange={(event)=>{
                         setSearch( event.target.value);
                         handleSearchCase();
                    }}></input>
                </div>
                
                {/* <div className='col-2'>
                    <button type='button' className='btn btn-outline-primary' onClick={handleSearchCase}>Search</button>
                </div>       */}

                <div className='dorpdown col-2'>
                    <button id='category-dropdown' type='button' className='btn btn-secondary dropdown-toggle' data-bs-toggle='dropdown'>{category}</button>
                    <ul className='dropdown-menu' aria-labelledby='category-dropdown'>
                        <li> <button onClick={()=>handleCategory(Category.ALL)}    className='dropdown-item'>All</button></li>
                        <li> <button onClick={()=>handleCategory(Category.FE)}     className='dropdown-item'>Front-end</button></li>
                        <li> <button onClick={()=>handleCategory(Category.BE)}     className='dropdown-item'>Back-end</button></li>
                        <li> <button onClick={()=>handleCategory(Category.DEVOPS)} className='dropdown-item'>Dev-ops</button></li>
                        <li> <button onClick={()=>handleCategory(Category.DATA)}   className='dropdown-item'>Data</button></li>
                    </ul>
                </div>

                <div className='row d-flex py-3'>
                    <h4>Number of results:({totalNumberOfBooks!.toString()})</h4>
                    { books.length===0 ?
                      <div className='container-fluid mt-3 mb-5'>
                        <p className='h3'>Can't find what you are looking for?</p>
                        <a type='button' href='#' className='btn main-color text-white fw-bold btn-md'>Library Service</a>
                      </div> :
                      <p>{firstBookIndex +' to ' + lastBookIndex + ' of ' + totalNumberOfBooks!.toString()} items:</p>
                    }
                </div>
            </div>

            {
                books.map(book =>(
                <BookCard book={book} key={book.id} />
                ))
            }

            {
                totalNumberOfPages>1 &&
                <Pagination currentPage={currentPage} totalNumberOfPages={totalNumberOfPages} paginate={paginate}/>
            }

        </div>
            
    );

}
