const mongoose=require('mongoose');
const {Schema}=mongoose;
const workoutoutSchema=new Schema({
    title:{
        type:String,
        required: true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    }
})
module.exports=mongoose.model('Workout',workoutoutSchema)