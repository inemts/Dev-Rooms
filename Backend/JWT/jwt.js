const jsonwebtoken = require("jsonwebtoken");

class JwtMethods{
    generateAccessToken = (userData) => {
        const token = jsonwebtoken.sign({id: userData.id, login: userData.login, role: userData.role}, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "1h"
        });

        return token;
    }

    generateRefreshToken = (userData) => {
        const token =  jsonwebtoken.sign({id: userData.id, login: userData.login, role: userData.role}, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "7d"
        });

        return token;
    }
}

module.exports = new JwtMethods();