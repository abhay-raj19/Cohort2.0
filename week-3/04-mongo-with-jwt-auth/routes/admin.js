const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../../04-mongo-with-jwt-auth/db/index.js");
const router = Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');


// Admin Routes
router.post('/signup', async(req, res) => {
    try {
        if(!req.body.username || !req.body.password){
            res.status(404).json({
                msg:"username or password is missing"
            })
        }
        const response = await Admin.create({
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

router.post('/signin',async (req, res) => {
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

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    const courseDetails = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    console.log(courseDetails);
    res.json({
        msg:"Course created successfully",
        courseId:courseDetails._id
    });

});
router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json({
        courses
    });
});

module.exports = router;