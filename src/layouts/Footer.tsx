import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getRole } from "./utils/Authenticated";

export const Footer = ()=>{

    const {isAuthenticated} = useAuth();

    return(
        <div className="navbar navbar-expand-lg bg-body-tertiary text-light" data-bs-theme='dark'>

            <div className="container-fluid">
                
                <footer className="col-12 p-3">
                    <ul className="navbar-nav  justify-content-center align-items-center pb-2">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">Home</Link> 
                        </li>
                        <li className="nav-item">
                            <Link to="/search" className="nav-link">Search Books</Link> 
                        </li>
                        {
                            isAuthenticated &&
                            <li className="nav-itme">
                                <Link to="/ShelfPage" className="nav-link">Shelf</Link>
                            </li>
                        }
                        {
                            isAuthenticated &&
                            <li className="nav-itme">
                                <Link to="/MessagePage" className="nav-link">Messages</Link>
                            </li>
                        }
                        {
                            isAuthenticated &&
                            <li className="nav-itme">
                                <Link to="/PaymentPage" className="nav-link">Payments</Link>
                            </li>
                        }
                        {
                            isAuthenticated && getRole()==='ROLE_ADMIN' &&
                            <li className="nav-itme">
                                <Link to="/ManageLibraryPage" className="nav-link">Admin</Link>
                            </li>
                        }
                    </ul>
                    <div className=" container border "></div>
                    <p className="d-flex justify-content-center align-items-center pt-2">@ 2023, Mmd, Inc</p>
                </footer>
            </div>
        </div>
    );
}
