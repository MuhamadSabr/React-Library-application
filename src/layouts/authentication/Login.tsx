import { useState, FormEvent } from "react";


export const Login = () =>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event:FormEvent, username:string, password:string) =>{
        
        event.preventDefault();

        const url = "http://localhost:8080/login";
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
            
        fetch(url, {
        method:'POST',
        headers: headers,
        body: new URLSearchParams({
            username,
            password
            })
        })
        .then((response)=>{
            console.log(response);
        })
        .catch((error:string)=>{
            console.log(error);
        })

        console.log(username, password)

    }


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