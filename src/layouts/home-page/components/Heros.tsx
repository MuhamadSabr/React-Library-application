export const Heros = () =>{
    return(
        <div className="m-3">
            {/*Desktop */}
            <div className="d-none d-lg-block">
                <div className="row">
                    <div className="col-image-left col-6"></div>
                    <div className="col-6 p-5">
                        <h1 className="mt-3">What have you been reading?</h1>
                        <p className="lead ml-5 mr-5">The library team would love to know what you have been reading.
                            Whether it is to learn a new skill or grow within one,
                            we will be able to to provide the top content for you!
                        </p>
                        <a type="button" className="btn main-color btn-lg text-white" href="#">Sign up</a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 p-5">
                        <h1 className="mt-3">Our collection is always changing!</h1>
                        <p className="lead ml-5">Try to check in daily as our collection is always changing!
                        We work nonstop to provide the most accurate book selection possible for our Mmd library students!
                        We are diligent about our book selection and our books are always going to be our trop priority.
                        </p>
                    </div>
                    <div className="col-image-right col-6"></div>
                </div>

            </div>

            {/*Mobile */}
            <div className="d-lg-none m-2">
                <div>
                    <div className="col-image-left"></div>
                    <div className="pt-3">
                        <h2 className="display-6 fw-bold">What have you been reading?</h2>
                        <p className="fs-4">The library team would love to know what you have been reading.
                            Whether it is to learn a new skill or grow within one,
                            we will be able to to provide the top content for you!
                        </p>
                        <a type="button" className="btn main-color btn-lg text-white" href="#">Sign up</a>
                    </div>
                </div>

                <div >
                    <div className=" pt-3">
                        <h2 className="display-6 fw-bold">Our collection is always changing!</h2>
                        <p className="fs-4">Try to check in daily as our collection is always changing!
                        We work nonstop to provide the most accurate book selection possible for our Mmd library students!
                        We are diligent about our book selection and our books are always going to be our trop priority.
                        </p>
                    </div>
                    <div className="col-image-right"></div>
                </div>

            </div>
        </div>
    );
}