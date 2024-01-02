export const authenticated = () : boolean => {

    const jwtToken = sessionStorage.getItem("JWT Token");

    
    if(jwtToken===null){
        return false;
    }

    const payloadBase64 = jwtToken.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const decodedPayloadToJson = JSON.parse(decodedPayload);
    const expiration = decodedPayloadToJson.exp;
    const expired = (Date.now() >= expiration * 1000);
    if(expired){
        sessionStorage.clear();
        return false;
    }
    return true;
}


export const getToken = () =>{
    return sessionStorage.getItem("JWT Token");
}