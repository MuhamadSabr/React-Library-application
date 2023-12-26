import{Book as BookModel} from "../../../models/Book";

export const Book:React.FC<{bookToRender:BookModel}>= (props) =>{
    return(
        <div className="text-center col-sm-6 col-md-4 col-lg-3">
                <img src={props.bookToRender.image ? props.bookToRender.image : require('../../../Images/BooksImages/book-luv2code-1000.png')}
                 alt="book" width='151' height='233'></img>
                <h6 className="mt-2">{props.bookToRender.title}</h6>
                <p>{props.bookToRender.author}</p>
                <a className="btn main-color text-white" href="#">Reserve</a>
        </div>
    );
}