const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')

const {Schema}=mongoose

//creating schema
const userSchema= new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
       type:String,
       required:true 
    }
})

//creating static function signup
userSchema.statics.signup=async function(email, password){
    //validating email and password
    if(!email||!password){
        throw Error('Email or Password field can not be empty')
    }
    if(!validator.isEmail(email)){
        throw Error('Please enter valid email')
    }
    //check if email already exist
    const exist=await this.findOne({email});
    if(exist){
        throw Error('This email already exists')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough please enter it again')
    }

    

    //hashing password
    const salt=await bcrypt.genSalt(10)       //generating salt
    const hash=await bcrypt.hash(password, salt)      //hashing password according to salt

    //Creating document in collection user with field email and password
    const user=await this.create({email,password:hash}) 
    return user;
}

//creating static function login
userSchema.statics.login=async function(email,password){
    if(!email||!password){
        throw Error('Email or Password field can not be empty')
    }
    const user=await this.findOne({email})
    if(!user){
        throw Error('Incorrect email')
    }
    const match= await bcrypt.compare(password,user.password)
    if(!match){
        throw Error("Incorrect Password")
    }
    return user
}

//creating model User
module.exports=mongoose.model('User',userSchema)