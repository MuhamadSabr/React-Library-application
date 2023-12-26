import { Link } from "react-router-dom";

export const Footer = ()=>{
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
                    </ul>
                    <div className=" container border "></div>
                    <p className="d-flex justify-content-center align-items-center pt-2">@ 2023, Mmd, Inc</p>
                </footer>
            </div>
        </div>
    );
}
