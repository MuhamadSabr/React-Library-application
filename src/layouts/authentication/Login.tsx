import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Login = () =>{


    //Login state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authResult, setAuthResult] = useState("");
    const navigate =  useNavigate();
    const {isAuthenticated, setAuthenticated} = useAuth();

    //Warning state
    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
    const [emailNotConfirmed, setEmailNotConfirmed] = useState<boolean>(false);



    const handleLogin = async (event:FormEvent, username:string, password:string) =>{
        
        event.preventDefault();

        const url = `${process.env.REACT_APP_API}/login`;
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
        headers.append("X-XSRF-TOKEN", sessionStorage.getItem("XSRF-TOKEN")!);
        
        fetch(url, {
            method:'POST',
            headers: headers,
        })
        .then((response)=>{
            if(response.status===401){
                setEmailNotConfirmed(false);
                setPassword("");
                setInvalidCredentials(true);
            }
            else if(response.status===400){
                setInvalidCredentials(false);
                setEmailNotConfirmed(true);
            }
            return response;
        })
        .then((response)=>{
            const autherizationHeader = response.headers.get("Authorization");
            const xsrf = response.headers.get("X-XSRF-TOKEN");
            if(autherizationHeader!==null){
                sessionStorage.setItem("JWT Token", autherizationHeader);
                sessionStorage.setItem("XSRF-TOKEN", xsrf!);
                setAuthenticated(true);
                setAuthResult("Success");
                setInvalidCredentials(false);
                setEmailNotConfirmed(false);
            }
        })
        .catch((error:Error)=>{
            console.log("Failed for " + error);
            setAuthResult("Failed for " + error);
        })

    }

    useEffect(()=>{
        if(isAuthenticated){
            const path = sessionStorage.getItem("redirectPath");
            navigate(path===null ? "/" : path);
        }
    }, [isAuthenticated])


    return(
        <div className="container">
            <div className="p-5 row d-flex">
                <div  className="container border shadow col-lg-7">
                    <h3 className="pt-3 d-flex justify-content-center align-content-center">Please log in</h3>
                    <form onSubmit={(event)=>handleLogin(event, username, password)} autoComplete="on">
                    <div>
                        <label htmlFor="username" className="form-label h4 pt-3 mb-2">Username:</label>
                        <input id="username" type="email" className="form-control" placeholder="Enter email address"
                        onChange={event=> setUsername(event.target.value)} value={username} required />
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label h4 pt-5 mb-2">Password:</label>
                        <input id="password" type="password" className="form-control mb-3" placeholder="Enter password"
                        onChange={event=> setPassword(event.target.value)} value={password} required />
                    </div>
                    {/* <div className="form-check">
                        <input type="checkbox" className="form-check-input" name="rememberMe"></input>
                        <label className="form-check-label">Remember me</label>
                    </div> */}
                    <div>
                        <button type="submit" className="btn btn-primary btn-lg mb-3 mt-3">Login</button>
                    </div>
                    </form>
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    {
                        invalidCredentials &&
                        <div className="alert alert-warning alert-dismissible fade show">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setInvalidCredentials(false)}></button>
                            <strong>Invalid credentials:</strong> Please check your username and password.
                        </div>
                    }
                    {
                        emailNotConfirmed &&
                        <div className="alert alert-warning alert-dismissible fade show">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setEmailNotConfirmed(false)}></button>
                            <strong>Email not Confirmed:</strong> Please confirm your email and try again.
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}