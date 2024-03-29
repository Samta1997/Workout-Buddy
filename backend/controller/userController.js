const User=require('../model/userModel')
const jwt=require('jsonwebtoken')

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'1h'})
}



//login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.login(email,password)
        const token=createToken(user._id)
        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
}


//signup user
const signupUser=async(req,res)=>{
    const {email,password}=req.body

    try{
        //calling static signup function 
        const user= await User.signup(email,password)
        //creating token
        const token=createToken(user._id) 
        res.status(200).json({email,token}) //sending email and token as reponse
    }catch(error){
        //catching error if any thrown by static signup funciton and reponsing it error message as json object
        res.status(400).json({error:error.message})
    }    

}

module.exports={loginUser, signupUser}