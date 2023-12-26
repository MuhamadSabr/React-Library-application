import { Book } from "./Book";
import{Book as BookModel} from "../../../models/Book";

export const CarouselItem:React.FC<{booksToRender:BookModel[], active?:'active'}>= (props) =>{
    return(
        <div className={ props.active ? "carousel-item active" : "carousel-item" }>
                        <div className="row d-flex justify-content-center align-items-center">

                            <Book bookToRender={props.booksToRender[0]}/>
                            <Book bookToRender={props.booksToRender[1]}/>
                            <Book bookToRender={props.booksToRender[2]}/>

                        </div>
                    </div>
    );
}
