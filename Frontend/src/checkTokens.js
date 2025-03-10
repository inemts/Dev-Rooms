const checkTokens = async (tokens) => {
    const {accessToken} = tokens;
    const {refreshToken} = tokens;

    let data = null;

    try {
        
        const response = await fetch("http://localhost:3030/check-tokens", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "Refresh-Token": refreshToken
            },
        });


        if (response.ok){
            const data = await response.json();

            return data;
        }

        else{
            console.log("not ok")
        }
       
    
    } catch (error) {
        console.log(`Ошибка проверки токенов: ${error}`);
        return false;
    }



}
//я люблю креветок
export default checkTokens;