// Middleware for handling auth

const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
  try {
    const username = req.headers.username;
    const password = req.headers.password;
    const admin = await Admin.findOne({
      username:username,
      password:password
    });
    if(admin){
      next();
    } else {
      res.status(403).json({
        msg:"Admin doesn't exist"
      })
    }
    
  } catch (error) {
    //for handling out the error if raised in the try block
    console.log("Error in the admin middleware",error);
    res.status(500).json({
      msg:"Internal Server Error"
    })
    
  }
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

//will find all the admins in the database


module.exports = adminMiddleware;
