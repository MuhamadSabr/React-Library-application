import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingSpinner } from "../utils/LoadingSpinner";

export const Login = () =>{


    //Login state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authResult, setAuthResult] = useState("");
    const navigate =  useNavigate();
    const {isAuthenticated, setAuthenticated} = useAuth();



    const handleLogin = async (event:FormEvent, username:string, password:string) =>{
        
        event.preventDefault();

        const url = "http://localhost:8080/login";
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
        headers.append("X-XSRF-TOKEN", sessionStorage.getItem("XSRF-TOKEN")!);
        
        fetch(url, {
            method:'POST',
            headers: headers,
        })
        .then((response)=>{
            const autherizationHeader = response.headers.get("Authorization");
            const xsrf = response.headers.get("X-XSRF-TOKEN");
            if(autherizationHeader!==null){
                sessionStorage.setItem("JWT Token", autherizationHeader);
                sessionStorage.setItem("XSRF-TOKEN", xsrf!);
                setAuthenticated(true);
                setAuthResult("Success");
            }
        })
        .catch((error:Error)=>{
            console.log("Failed for " + error);
            setAuthResult("Failed for " + error)
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
            <div className="p-5 row d-flex justify-content-center align-content-center align-items-center">
                <div  className="container shadow-sm col-lg-7 justify-content-center align-content-center">
                    <form onSubmit={(event)=>handleLogin(event, username, password)}>
                    <div>
                        <label htmlFor="username" className="form-label h4 pt-3 mb-2">Username:</label>
                        <input id="username" type="text" className="form-control" placeholder="Enter username"
                        onChange={event=> setUsername(event.target.value)} value={username}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label h4 pt-5 mb-2">Password:</label>
                        <input id="password" type="password" className="form-control mb-5" placeholder="Enter password"
                        onChange={event=> setPassword(event.target.value)} value={password} />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-lg mb-3 mt-3">Login</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}