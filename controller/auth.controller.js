const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KRY = process.env.JWT_SECRET_KRY;

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        
        if (!tokenString){
            throw new Error("invalid token");   
        }
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KRY, (error, payload) => {
            if(error){
                throw new Error("invalid token");
            }
            // res.status(200).json({status:"success", payload});
            req.userId = payload._id
            next();
        });
    } catch (error) {
        res.status(400).json({status:"fail", error:error.message});
    }
}


module.exports = authController