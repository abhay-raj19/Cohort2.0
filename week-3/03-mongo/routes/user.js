const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course } = require("../db");
// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username:username,
        password:password
    
    });
    res.json({
        message: 'User created successfully'
    });
});

router.get('/courses',async (req, res) => {
    const courses = await Course.find({});
    res.json({
        courses
    });
    
});
//this endpoint is for purchasing the courses
router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
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

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
        // Implement fetching purchased courses logic
    const user = await User.findOne({
        username:req.headers.username
    });
    console.log(user.purchasedCourses);
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