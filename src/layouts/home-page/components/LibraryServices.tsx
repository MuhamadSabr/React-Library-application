import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export const LibraryServices = ()=>{

    const {isAuthenticated} = useAuth();

    return(
        <div className="container pt-5 pb-5">
            <div className="row p-3 border shadow-lg align-items-center">
                <div className="col-8 p-5 ">
                    <h1 className="diplay-4 fw-bold ">Can't find what you are looking for?</h1>
                    <p className="lead">If you cannot find what you are looking for send our library admins a message!</p>
                    {
                        isAuthenticated ?
                        <Link type="button" to="#" className="btn btn-primary main-color text-white btn-lg">Library Service</Link>
                        :
                        <Link type="button" to="/login" className="btn btn-primary main-color text-white btn-lg">Log in</Link>
                    }
                </div>
                <div className="col-4 shadow-lg lost-image"></div>
            </div>
        </div>
    );
}
