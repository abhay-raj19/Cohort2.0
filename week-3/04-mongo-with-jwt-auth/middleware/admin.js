const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const { Course } = require('../db');


// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try {
        const jwtToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(jwtToken, JWT_SECRET);
        if(decoded.username){
            next();
        } else {
            res.status(403).json({
                msg:"you are not authunticated"
            })
        }
    } catch (error) {
        res.status(403).json({
            msg:"wrong inputs are given"
        })
    }

}

module.exports = adminMiddleware;