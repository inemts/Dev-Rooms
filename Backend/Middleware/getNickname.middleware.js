const db = require("../Database/db");


export default getNickname = async (req , res, next) => {
    const {accessToken} = req.body;

    
    next();
}