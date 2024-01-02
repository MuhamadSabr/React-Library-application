import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () =>{
    
    const navigate = useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
        navigate("/login");
    })

    return(
        <div></div>
    )

}
