import { LoansShelf } from "./components/LoansShelf";

export const ShelfPage = () =>{

    sessionStorage.setItem("redirectPath", "/ShelfPage");

    return(
        <div className="container mt-3">
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-loans">Loans</button>
                </li>
                <li className="nav-itme">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-history">History</button>
                </li>
            </ul>
            <div className="tab-content">
                <div id="nav-loans" className="container tab-pane active pe-lg-5 ps-lg-5">
                    <LoansShelf/>
                </div>
                <div id="nav-history" className="container tab-pane fade">
                    <p>History</p>
                </div>
            </div>
        </div>
    );

}
