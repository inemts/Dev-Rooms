const saveTokens = (accessToken, refreshToken) => {

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}


const getTokens = () => {
    return {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken")
    }
}

const deleteTokens = () =>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export {
    saveTokens,
    getTokens,
    deleteTokens
}
