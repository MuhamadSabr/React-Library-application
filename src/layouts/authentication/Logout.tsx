import { useEffect } from "react";


export const Logout = () =>{

    useEffect(()=>{
        sessionStorage.removeItem("JWT Token");
    })

    return(
        <div></div>
    )

}
