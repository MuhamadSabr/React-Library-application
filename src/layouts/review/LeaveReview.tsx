import { useState } from "react";
import { ReviewStars } from "./ReviewStars";


export const LeaveReview: React.FC<{submitReview:(rating:number, reviewDescription:string)=>void}> = (props) =>{

    const [starInput, setStarInput] = useState(0);
    const [displayDescription, setDisplayDescription] = useState(false);
    const [reviewDescription, setReviewDescription] = useState<string>();


    const setRating = (rating:number) =>{
        setStarInput(rating);
        setDisplayDescription(true);
    }



    return(
        <div className="dropdown mt-3">
            <button className="btn dropdown-toggle" data-bs-toggle="dropdown"><em className="fs-5">Leave a Review?</em></button>
            <ul className="dropdown-menu">
                <li><button onClick={()=> setRating(0)} className="dropdown-item">0</button></li>
                <li><button onClick={()=> setRating(1)} className="dropdown-item">1</button></li>
                <li><button onClick={()=> setRating(1.5)} className="dropdown-item">1.5</button></li>
                <li><button onClick={()=> setRating(2)} className="dropdown-item">2</button></li>
                <li><button onClick={()=> setRating(2.5)} className="dropdown-item">2.5</button></li>
                <li><button onClick={()=> setRating(3)} className="dropdown-item">3</button></li>
                <li><button onClick={()=> setRating(3.5)} className="dropdown-item">3.5</button></li>
                <li><button onClick={()=> setRating(4)} className="dropdown-item">4</button></li>
                <li><button onClick={()=> setRating(4.5)} className="dropdown-item">4.5</button></li>
                <li><button onClick={()=> setRating(5)} className="dropdown-item">5</button></li>
            </ul>
            <ReviewStars rating={starInput} size={36}/>
            {
                displayDescription &&
                <div className="row mt-3">
                    <textarea className="col- form-control" placeholder="Description" rows={4} onChange={(event)=> setReviewDescription(event.target.value)}></textarea>
                    <button type="button" onClick={()=>props.submitReview(starInput, reviewDescription !=null ? reviewDescription : "")} className="col-5 btn btn-primary mt-3">Send Review</button>
                </div>
            }
        </div>
    );
}

