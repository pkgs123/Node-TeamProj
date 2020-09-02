const User = require("../models/user");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


exports.signup  = (req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err ,user)=>{
        if(err){
            return res.status(400).json({
                err : "Unable to singup"
            });
        } 

       return res.json({
            name : user.name,
            email : user.email,
            id  :user._id
        });
    })
   
}


exports.signin  = (req , res)=>{
    const {email,password} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }

    User.findOne({email} , (err , user)=>{
        if(err || !user){
           return res.status(400).json({
                error : "User email does not exist"
            });
        }

        if(!user.authenticate(password)){
           return res.status(401).json({
                error : "Email or Password does not match"
            });
        }

        //create new token
        const token  = jwt.sign({_id : user._id} ,
            "Pappqw!@#2592"
          //   process.env.SECRET 
             , {
            expiresIn : "24h"
        } )

        //assign to cookie
        res.cookie("token" , token);

        //send response to frontend
        const {_id ,name ,  email, role } = user;
        return res.json({token , user:{_id , name ,email , role}});

    })
}

exports.signout =(req ,res)=>{
    res.clearCookie();
    return res.json({
        message : "User signed out"
    })
}

// //protected routes
// exports.isSignedIn = expressJwt({
//     secret : "Pappqw!@#2592" , //process.env.SECRET,
//     userProperty : "auth"
// })


// // custom middleware
// exports.isAuthenticated = (req,res , next)=>{
//     let checker = req.profile && req.auth && req.profile._id==req.auth._id;
//     if(!checker){
//         return res.status(403).json({
//             error : "Access Denied"
//         })
//     }
//     next();
// }

// exports.isAdmin=(req,res , next)=>{
//     let checker = req.profile.role ===1;
//     if(!checker){
//         return res.status(403).json({
//             error : "Unauthorized access"
//         })
//     }
//     next();
// }