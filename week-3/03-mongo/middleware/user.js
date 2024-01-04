const { User } = require("../db");
// Async function for handling auth
async function userMiddleware(req, res, next) {
  try {
    const username = req.headers.username;
    const password = req.headers.password;
    const user = await User.findOne({
      username: username,
      password: password,
    });
    if (user) {
      next();
    } else {
      res.status(403).json({
        msg: "User doesn't exist",
      });
    }
  } catch (error) {
    console.log("Error in the user middleware", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

// without async await syntax

// function userMiddleware(req, res, next) {
//     // Implement user auth logic
//     // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
//     const username = req.headers.username;
//     const password = req.headers.password;
//     User.findOne({
//         username:username,
//         password:password
//     }).then(function(value){
//         if(value){
//         next();
//         }else{
//         res.status(401).json({
//             msg:"user doesn't exist"
//         })
//         }
//     })
// }

module.exports = userMiddleware;
