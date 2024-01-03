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

    if( ( (expiration * 1000) - Date.now()) <1000*60*20 ){
        refreshToken();
    }

    return true;
}


export const getToken = () =>{
    return sessionStorage.getItem("JWT Token");
}


const refreshToken = async () =>{

    const url = "http://localhost:8080/refreshJwtToken";
        
    const jwtToken = getToken();
        
    fetch(url, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
    })
    .then((response)=>{
        const autherizationHeader = response.headers.get("Authorization");
        if(autherizationHeader!==null){
            sessionStorage.setItem("JWT Token", autherizationHeader);
        }
    })
    .catch((error:Error)=>{
        console.log("Failed for " + error);
    })
}

