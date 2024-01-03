import { Link, NavLink, useLocation } from "react-router-dom";
import { authenticated } from "./utils/Authenticated";
import { useEffect, useState } from "react";


export const Navbar = ()=>{

    const [auth, setAuth] = useState<boolean>(authenticated());
    const location = useLocation();

    const handleLogout = () =>{
        const userConfirmed = window.confirm("Are you sure you want to logout?");
        if(userConfirmed){
            sessionStorage.clear();
            setAuth(false);
        }
    }

    useEffect(()=>{
        setAuth(authenticated());
    }, [location.pathname, auth])


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
                        {
                            auth ?
                            <li className="nav-item m-1">
                                <button type="button" className="btn btn-outline-light" onClick={handleLogout}>Log out</button>
                            </li> :
                                <li className="nav-item m-1">
                                    <Link type="button" className="btn btn-outline-light" to="/login">Log in</Link>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}