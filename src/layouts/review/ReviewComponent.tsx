import { Review } from "../../models/Review";
import { ReviewStars } from "./ReviewStars";

const currentDate = new Date();

    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour   = millisecondsPerMinute * 60;
    const millisecondsPerDay    = millisecondsPerHour * 24;
    const millisecondsPerWeek   = millisecondsPerDay * 7;
    const millisecondsPerMonth  = millisecondsPerDay * 30;
    const millisecondsPerYear   = millisecondsPerMonth * 12;

export const ReviewComponent:React.FC<{review:Review}> = (props) =>{


    const differenceInMillisecond = currentDate.getTime() - props.review.reviewDate.getTime();

    const getTimeAgo = (millisecondsMeasure:number) =>{
        return Math.trunc(differenceInMillisecond/millisecondsMeasure);
    }

    

    const renderDate =  differenceInMillisecond < millisecondsPerWeek ? ( getTimeAgo(millisecondsPerDay) === 0  ? "Today" : 
                        getTimeAgo(millisecondsPerDay)   + " days ago")   : 
                        differenceInMillisecond < millisecondsPerMonth ? (getTimeAgo(millisecondsPerWeek) === 1  ? " 1 week ago" : 
                        getTimeAgo(millisecondsPerWeek)  + " weeks ago") :
                        differenceInMillisecond < millisecondsPerYear ? (getTimeAgo(millisecondsPerMonth) === 1  ? " 1 month ago" : 
                        getTimeAgo(millisecondsPerMonth) + " months ago") : (getTimeAgo(millisecondsPerYear) ===1 ? "1 year ago" :
                        getTimeAgo(millisecondsPerYear)  + " years ago");


    return(
        <div className="container mt-1">
            <h5 className="fw-bold text-dark mb-3">{props.review.userEmail.split("@")[0]}.</h5>
            <div className=" d-flex justify-content-start align-items-start col-lg-3">
                <ReviewStars rating={props.review.rating} size={20}/>
                <p className="ms-3 fs-5">{renderDate}</p>
            </div>
            <p className="col-lg-6">{props.review.reviewDescription}</p>
            <hr className="col-lg-6"></hr>
        </div>
    );
}
