import { Link } from "react-router-dom";
import { LeaveReview } from "../../review/LeaveReview";


export const Checkout:React.FC<{copies:number|undefined; copiesAvailable:number|undefined; currentCheckedOutBooks:number;
    isBookCheckedOutByUser:boolean; isAuthenticated:boolean; checkoutBook:()=>void; hasUserLeftReview:boolean;
    submitReview:(rating:number, reviewDescription:string)=>void}> = (props) =>{


    return(
        <div className="col-lg-3 m-3 card justify-content-end">
                        <div className="card-body">
                            <p><b>{props.currentCheckedOutBooks}/5 </b>books checkedout</p>
                            <hr></hr>
                            {
                                props.copies && props.copiesAvailable && props.copiesAvailable > 0 ?
                                <p className="fs-4 text-success">Available</p> :
                                <p className="fs-4 text-danger">Wait List</p>
                            }
                            <div className="row justify-content-between">
                                <p className="col-sm">{props.copies} Copies</p>
                                <p className="col-sm">{props.copiesAvailable} Available</p>
                            </div>
                            {
                                props.isAuthenticated ?
                                props.copiesAvailable && props.copiesAvailable >0 ?
                                !props.isBookCheckedOutByUser ?
                                props.currentCheckedOutBooks < 5 ?
                                <button onClick={()=> props.checkoutBook()} className="btn btn-success">Checkout</button>
                                :
                                <p><b>5/5 books checked out</b></p>
                                :
                                <p><b>Book is Checked Out</b></p>
                                :
                                <button onClick={()=> props.checkoutBook()} className="btn btn-success" disabled>Checkout</button>
                                :
                                <Link to="/login" className="btn btn-success">Log In</Link>
                            }
                            <hr></hr>
                            <p>This number can change until placing order has been complete</p>
                            {
                                props.isAuthenticated ?
                                props.hasUserLeftReview ?
                                <p><b>Thank you for your review</b></p>
                                :
                                <LeaveReview submitReview={props.submitReview}/>
                                :
                                <div>
                                    <div className="ps-4 pe-4"><hr></hr></div>
                                    <p className="mt-3 fw-bold">Sign in to be able to leave a review.</p>
                                </div>
                            }
                        </div>
                </div>
    );
}
