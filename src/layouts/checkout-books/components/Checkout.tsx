import { Link } from "react-router-dom";

export const Checkout:React.FC<{copies:number|undefined; copiesAvailable:number|undefined; currentCheckedOutBooks:number;
    isBookCheckedOutByUser:boolean; isAuthenticated:boolean; checkoutBook:()=>void}> = (props) =>{


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
                                !props.isBookCheckedOutByUser ?
                                props.currentCheckedOutBooks < 5 ?
                                <button onClick={()=> props.checkoutBook()} className="btn btn-success">Checkout</button>
                                :
                                <p><b>5/5 books checked out</b></p>
                                :
                                <p><b>Book is Checked Out</b></p>
                                :
                                <Link to="/login" className="btn btn-success">Log In</Link>
                            }
                            <hr></hr>
                            <p>This number can change until placing order has been complete</p>
                            <p className="mt-3">Sign in to be able to leave a review.</p>
                        </div>
                </div>
    );
}
