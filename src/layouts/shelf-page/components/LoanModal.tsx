import { ShelfCurrentLoans } from "../../../models/ShelfCurrentLoan";

export const LoanModal: React.FC<{shelfLoan:ShelfCurrentLoans; returnBook:(bookId:number)=>void; renewLoan:(bookId:number)=>void}> = (props) =>{

    

    return(
        <div id={`modal${props.shelfLoan.book.id}`} className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Loan Options</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        <div className="m-2">
                            <div className="row d-flex">
                                <div className="col-sm-2 d-flex justify-content-sm-center justify-content-md-start">
                                <img src= {props.shelfLoan.book.image ? props.shelfLoan.book.image : require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                alt='Book' height={110} width={70}></img>
                                </div>
                                <div className="col-sm-10">
                                    <h6 className="m-md-2">{props.shelfLoan.book.author}</h6>
                                    <h5 className="m-md-2">{props.shelfLoan.book.title}</h5>
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                                {
                                    props.shelfLoan.daysLeft ===1 &&
                                    <p className="text-success">Due today</p>
                                }
                                {
                                    props.shelfLoan.daysLeft <=0 &&
                                    <p className="text-danger">{props.shelfLoan.daysLeft*-1} days past due-date</p>
                                }
                                {
                                    props.shelfLoan.daysLeft >1 &&
                                    <p className="text-secondary">{`Due in ${props.shelfLoan.daysLeft} days.`}</p>
                                }
                            </div>
                            <div className="list-group">
                                <button onClick={()=>props.returnBook(props.shelfLoan.book.id)}
                                className="list-group-item list-group-item-action"data-bs-dismiss="modal">
                                    Return Book
                                </button>
                                <button onClick={()=>props.renewLoan(props.shelfLoan.book.id)}
                                className={props.shelfLoan.daysLeft<=0 ? "list-group-item disabled" : "list-group-item list-group-item-action"}
                                data-bs-dismiss="modal">
                                    {
                                        props.shelfLoan.daysLeft<=0 ?
                                        "Over-due books cannot be renewed"
                                        :
                                        "Renew Loan for Seven Days"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
