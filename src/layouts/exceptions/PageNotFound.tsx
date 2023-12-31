import { Link } from "react-router-dom"

export const PageNotFound = () =>{
    return(
        <div className="container">
            <div className="row d-flex justify-content-center align-content-center align-items-center p-5">
                <div className="card justify-content-center shadow">
                    <div className="card-body">
                        <h3>No page here, lost!? You can navigate back to home page</h3>
                        <Link to="/" className="btn btn-outline-secondary btn-lg mt-3">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}