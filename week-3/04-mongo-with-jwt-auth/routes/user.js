const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course,User } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup',async (req, res) => {
    try {
        if(!req.body.username || !req.body.password){
            res.status(404).json({
                msg:"username or password is missing"
            })
        }
        const response = await User.create({
            username:req.body.username,
            password:req.body.password
        });
        res.json({
            msg:"Admin created successfully"
        })
        console.log(response);
    } catch (error) {
        console.log(error);        
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    // console.log(JWT_SECRET);

    const user = await User.find({
        username,
        password
    })
    if (user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(411).json({
            message: "Incorrect email and pass"
        })
    }
    
    

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.json({
        courses
    });
    
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    // console.log(username);
    try {
        await User.updateOne({
            username:username
        },{
            "$push" : {
                purchasedCourses:courseId
            }
        })
    } catch (e) {
        console.log(e);
    }
    res.json({
        msg:"Course purchased successfully"    
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username:req.username
    });
    // console.log(user.purchasedCourses);
    try {
        const courses = await Course.find({
            _id:{
                "$in":user.purchasedCourses
            }
        });
        console.log(courses);
        res.json({
            courses:courses
        })
    } catch (e) {
        console.log(e);
    }
});

module.exports = router