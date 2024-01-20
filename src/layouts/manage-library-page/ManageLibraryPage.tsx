import { useState } from "react";
import { AdminMessgaes } from "./components/AdminMessages";
import { AddNewBook } from "./components/AddNewBook";

export const ManageLibraryPage = () =>{

    sessionStorage.setItem("redirectPath", "/ManageLibraryPage");
    const [changeBookClick, setChangeBookClick] = useState<boolean>(false);
    const [messageClick, setMessageClick] = useState<boolean>(false);

    const addBookOnClick = () =>{
        setChangeBookClick(false);
        setMessageClick(false);
    }
    const changeBookOnClick = () =>{
        setChangeBookClick(true);
        setMessageClick(false);
    }
    const messageOnClick = () =>{
        setChangeBookClick(false);
        setMessageClick(true);
    }


    return(
        <div className="container mt-3">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button onClick={addBookOnClick} className="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-add-book">
                        Add Book
                    </button>
                </li>
                <li>
                    <button onClick={changeBookOnClick} className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-change-book">
                        Chagne Book
                    </button>
                </li>
                <li>
                    <button onClick={messageOnClick} className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-message">
                        Messages
                    </button>
                </li>
            </ul>
            <div className="tab-content">
                <div id="nav-add-book" className="container tab-pane fade show active pe-lg-5 ps-lg-5">
                    <AddNewBook/>
                </div>
                <div id="nav-change-book" className="container tab-pane fade pe-lg-5 ps-lg-5">
                    {changeBookClick ? <p>Change book</p> : <></>}
                </div>
                <div id="nav-message" className="container tab-pane fade pe-lg-5 ps-lg-5">
                    {messageClick ? <AdminMessgaes/> : <></>}
                </div>
            </div>
        </div>
    );
}
