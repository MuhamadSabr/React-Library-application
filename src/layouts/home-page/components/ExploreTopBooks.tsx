import { Link } from "react-router-dom";

export const ExploreTopBooks = () =>{

    return(
        <div className="p-5 mb-4 header">
            <div className="container-fluid text-white d-flex justify-content-center align-items-center  py-5">
                <div>
                    <h1 className="display-6 fw-bold">Find your next adventure</h1>
                    <p className="col-md-8 fs-5">Where would you like to go next?</p>
                    <Link type="button" to="/search" className="btn main-color btn-lg text-white">Explore top books</Link>
                </div>
            </div>
        </div>
    );

}
