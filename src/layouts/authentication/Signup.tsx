import { useState, FormEvent, ChangeEvent } from "react";
import { Link} from "react-router-dom";
import { SignupNewUser } from "../../models/SignupNewUser";


export const Singup = () =>{


    //Login state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    //Warning state
    const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
    const [confirmPasswordWarning, setConfirmPasswordWarning] = useState<boolean>(false);
    const [emailExists, setEmailExists] = useState<boolean>(false);
    const [userRegistered, setUserRegistered] = useState<boolean>(false);



    const handleSignup = async (event:FormEvent, username:string, confirmPassword:string) =>{
        
        event.preventDefault();

        if(confirmPassword!==password){
            setConfirmPasswordWarning(true);
            return;
        }

        const newUser = new SignupNewUser(username, confirmPassword);
        const url = `${process.env.REACT_APP_API}/signup`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json")

        fetch(url, {
            method:'POST',
            headers: headers,
            body: JSON.stringify(newUser)
        })
        .then((response)=>{
            if(response.status===409){
                setEmailExists(true);
            }else if(response.status===201){
                setUserRegistered(true);
                setConfirmPasswordWarning(false);
                setEmailExists(false);
                setPassword('');
                setConfirmPassword('');
                setUsername('');
            }
        })
        .catch((error:Error)=>{
            console.log("Failed for " + error);
        })

    }

    const checkPasswordValidity = (event:ChangeEvent<HTMLInputElement>) =>{
        const newPass= event.target.value;
        setPassword(newPass);
        const isValidPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(newPass);
        if(!isValidPassword){
            setPasswordWarning(true);
            setConfirmPasswordWarning(false);
            return;
        }
        setPasswordWarning(false);
    }

    const checkConfirmPassword = (event:ChangeEvent<HTMLInputElement>) =>{
        const confPass = event.target.value;
        setConfirmPassword(confPass);
        if(password!==confPass){
            setConfirmPasswordWarning(true);
            return;
        }else{
        setConfirmPasswordWarning(false);
        }
    }


    return(
        <div className="container">
            <div className="p-5 row d-flex">
                <div  className="container border shadow col-lg-7">
                    <h3 className="pt-3 d-flex justify-content-center align-content-center">Welcome to Mmd Library</h3>
                    <form onSubmit={(event)=>handleSignup(event, username, confirmPassword)} autoComplete="on">
                    <div>
                        <label htmlFor="username" className="form-label h4 pt-3 mb-2">Username:</label>
                        <input id="username" type="email" className="form-control" placeholder="Enter email address"
                        onChange={event=> setUsername(event.target.value)} value={username} required />
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label h4 pt-5 mb-2">Password:</label>
                        <input id="password" type="password" className="form-control mb-3" placeholder="Enter password"
                        onChange={checkPasswordValidity} value={password} required />

                        <label htmlFor="confirmPassword" className="form-label h4 pt-3 mb-2">Confirm Password:</label>
                        <input id="confirmPassword" type="password" className="form-control mb-3" placeholder="Confirm entered password"
                        onChange={checkConfirmPassword} value={confirmPassword} required />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-lg mb-3 mt-3">Sign up</button>
                    </div>
                    </form>
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                    {
                        passwordWarning &&
                        <div className="alert alert-warning alert-dismissible fade show">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setPasswordWarning(false)}></button>
                            <strong>Invalid Password:</strong> Password must be at least 8 characters, containing at least one number and one symbol.
                        </div>
                    }
                    {
                        confirmPasswordWarning &&
                        <div className="alert alert-warning alert-dismissible fade show">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setConfirmPasswordWarning(false)}></button>
                            <strong>Invalid Password:</strong> Confirm password does not match.
                        </div>
                    }
                    {
                        emailExists &&
                        <div className="alert alert-warning alert-dismissible fade show">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setEmailExists(false)}></button>
                            <strong>User Exists:</strong> There is already a user registered with this username.
                        </div>
                    }
                    {
                        userRegistered &&
                        <div className="alert alert-warning alert-dismissible fade show">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setUserRegistered(false)}></button>
                            <strong>Successful Signup:</strong> next please check your inbox to confirm your email.
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}