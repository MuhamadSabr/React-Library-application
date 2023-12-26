import { NavLink } from "react-router-dom";
import { HomePage } from "./home-page/HomePage";

export const Navbar = ()=>{
    return(
        <nav className="navbar navbar-expand-lg  main-color py-3 bg-body-tertiary" data-bs-theme='dark'>
            <div className="container-fluid">
                <span className="navbar-brand">Mmd Library</span>
                <button type='button' className="navbar-toggler" aria-expanded='false' data-bs-toggle='collapse'
                 data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-label='Toggle navigation'>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/home" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/search" className="nav-link">Search Books</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                    <li className="nav-item m-1">
                            <a type="button" className="btn btn-outline-light" href="#">Sign In</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}