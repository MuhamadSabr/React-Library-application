import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { getToken, getUsername } from "../utils/Authenticated";
import { PaymentInfo } from "../../models/PaymentInfo";

export const PaymentPage = () =>{

    const {isAuthenticated} = useAuth();

    const [fees, setFees] = useState<number>(0);

    const [isLoadingFees, setIsLoadingFees] = useState<boolean> (true);
    const [httpError, setHttpError] = useState<string> ();

    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

    const[displayWarning, setDisplayWarning] = useState<boolean>(false);
    const[displaySuccess, setDisplaySuccess] = useState<boolean>(false);

 
    useEffect(()=>{
        if(isAuthenticated){
            const url = `${process.env.REACT_APP_API}/api/payments/search/findByUserEmail?userEmail=${getUsername()}`;
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", `Bearer ${getToken()}`)

            fetch(url,{
                method: "GET",
                headers: headers
            })
            .then((response)=>{
                if(response.status===404){
                    setFees(0);
                }
                return response.json();
            })
            .then((response)=>{
                setFees(response.amount);
                setIsLoadingFees(false);
            })
            .catch((error:Error)=>{
                // setHttpError("Error loading fees, because : " + error.message);
                setIsLoadingFees(false);
            })
        }
    }, [isAuthenticated])



    const elements = useElements();
    const stripe = useStripe();

    const payFee = async () =>{
        if(!stripe || !elements){
            return;
        }
        setSubmitDisabled(true);
        let paymentInfo = new PaymentInfo(fees*100, "USD", getUsername());
        const url = `${process.env.REACT_APP_API}/api/payment/payment-intent`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", `Bearer ${getToken()}`)

        fetch(url,{
            method: "POST",
            headers: headers,
            body: JSON.stringify(paymentInfo)
        })
        .then((resonse)=> resonse.json())
        .then((response)=>{
            stripe.confirmCardPayment(
                response.client_secret, {
                    payment_method: {
                        card: elements.getElement(CardElement)!,
                        billing_details: {
                            email: getUsername()
                        }
                    }
                }, {handleActions: false}
            )
            .then(async function(result:any){
                if(result.error){
                    setSubmitDisabled(false);
                    setDisplayWarning(true);
                }else{
                    const url = `${process.env.REACT_APP_API}/api/payment/complete-payment`;
                    fetch(url,{
                        method: "PUT",
                        headers: headers,
                        body: JSON.stringify(paymentInfo)
                    })
                    .then(()=>{
                        setFees(0);
                        setDisplaySuccess(true);
                        setDisplayWarning(false);
                        setSubmitDisabled(false);
                    })
                    .catch((error:Error)=>{
                    setHttpError("Error completing payment, because : " + error.message);
                    setSubmitDisabled(false)})
                }
            })
        })
        .catch((error:Error)=>{
            setHttpError("Error creating payment intent, because : " + error.message);
            setSubmitDisabled(false);
        })
    }


    if(isLoadingFees){
        return(
            <LoadingSpinner/>
        );
    }

    if(httpError){
        return(
            <div className='container d-flex m-5 justify-content-center align-items-center'>
                <p>{httpError.toString()}</p>
            </div>
        );
    }


    return(
        <div className="container">
            {
                displayWarning &&
                <div className="alert alert-warning alert-dismissible fade show mt-3">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setDisplayWarning(false)}></button>
                    <strong>Failed:</strong> Your card details is not correct.
                </div>
            }

            <div className="card mt-3">
                <div className="card-header fs-5">
                    <strong>Fees pending: <span className="text-danger">${fees}</span></strong>
                </div>
                <div className="card-body">
                    <h4 className="card-title mb-3">Card details</h4>
                    <CardElement id="card-element"/>
                    {
                        fees !== 0 ?
                        <button className="btn btn-primary mt-3" onClick={payFee}>Pay fees</button>
                        :
                        <button className="btn btn-primary mt-3" disabled>No pending fees</button>
                    }
                </div>
                <div className="card-footer">
                {
                displaySuccess &&
                <div className="alert alert-success alert-dismissible fade show mt-3">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setDisplaySuccess(false)}></button>
                    <strong>Success:</strong> Thank you for your payment.
                </div>
            }
                </div>
            </div>
            {
                submitDisabled && <LoadingSpinner />
            }
        </div>
    )
}
