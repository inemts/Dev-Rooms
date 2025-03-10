const db = require("../Database/db");

const loginMiddleware = async (req, res, next) => {

    const login = req.body.login;
    const password = req.body.password;

    const loginRes = await db.loginUser(login, password);

    req.login_res = loginRes;

    next();
}

const registerMiddleware = async (req, res, next) => {

    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email; 

    req.register_res = await db.registerNewUser(login, password, email);

    next();
}

const refreshTokens = async (req, res, next) => {
    const dbRes = await db.getRefreshToken();

    
    next();
}

module.exports = {
    loginMiddleware,
    registerMiddleware,
    refreshTokens
}