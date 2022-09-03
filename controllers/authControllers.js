const User = require('../models/User')
const jwt = require('jsonwebtoken')

// @DESCR   Register
// @Routes  POST /api/v1/auth/register
// @Access  public
exports.register = async(req, res, next)=>{
    try{
        const{name, email, password, role} = req.body

        const user = await User.create({
            name,
            email,
            password,
            role
        })

        // Function to generate token from model method => NOT WORKING
        // const token = user.getSignedJwtToken()

        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })

        res.status(200).json({
            success: true,
            token 
        })

    }catch(err){
        console.log(err)
    }
}

// @DESCR   Login
// @Route   POST /api/v1/auth/login
// @Access  public

exports.login = async(req, res, next)=>{
    try{
        const{email, password} = req.body
        const user = User.findOne({email}).select('+password')

        if(!email & !password){
            returnmres.status(400).json({
                    success: failed,
                    msg: 'please enter username and password'
                }
            )
        }

        if(!user){
            return res.status(401).json({
                    success: failed,
                    msg: 'Invalid Credentials'
                }
            )
        }

    // check if password matches
const isMatch = user.comparePassword(password)

if(!isMatch){
   return res.status(401).json({
			success: failed,
			msg: "Invalid Credentials",
		});
    }

res.status(200).json({
    success: true,
    data: user
})

    }catch(err){
        console.log(err)
    }
}