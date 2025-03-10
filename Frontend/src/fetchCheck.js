import { AuthContext } from "./context/authContext";
import { getTokens } from "./localStorage";
import checkTokens from "./checkTokens";
import { saveTokens } from "./localStorage";

const fetchData = async (tokens) => {
    
  try {
    const {accessToken} = tokens;
    const {refreshToken} = tokens;

    if (accessToken && refreshToken){
      const checkTokensRes = await checkTokens(tokens);
      const newAccessToken = checkTokensRes.accessToken;
      const newRefreshToken = checkTokensRes.refreshToken;

      saveTokens(newAccessToken, newRefreshToken);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user:{
          id: checkTokensRes.decoded.id,
          login: checkTokensRes.decoded.login,
          role: checkTokensRes.decoded.role,
          isLogged: true
        }
      }
    }

    else{
      return {
        accessToken: null,
        refreshToken: null,
        user: {
          id: null,
          login: null,
          role: null,
          isLogged: false
        }
      }
    }
  } catch (error) {
    
  }

};

export default fetchData;