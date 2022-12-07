var express = require("express");
var router = express.Router();

const data={
    email:"ad@gmail.com",
    password:"1234"
}

//login user
router.post('/login',(req,res)=>{
    if (req.body.email==data.email && req.body.password==data.password) {
        req.session.user=req.body.email
        res.redirect('/route/dashboard')
        // res.end("Login Successfully!")
    } else {
        res.end("Invalid username")
    }
})

//dashboard route
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.send("Unauthorized user")
    }
})

//logout route
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }
        else{
            res.render('base',{
                title:"Express",
                logout:"Logout Successfully..."
            })
        }
    })
})

module.exports = router