const mongoose=require('mongoose')
const Workout=require('../model/model')

const getWorkout=async(req,res)=>{
    const workout=await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workout)
}

const getSingleWorkout=async(req, res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such item with this ID"})
    }
    const workout=await Workout.findById(id)
    if(!workout){
        return res.status(400).json({error:"No such item with this ID"})   
    }
    res.status(200).json(workout)
}

const createWorkout=async(req,res)=>{
    const {title,load, reps}=req.body;
    try{
        const workout=await Workout.create({title, load, reps})
        res.status(200).json(workout);
    }
    catch(error){
        res.status(400).json({error:error.message}) 
    }
   
}
const deleteWorkout=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such item with this ID"})
    }
    const workout=await Workout.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(400).json({error:"No such workout"})   
    }
    res.status(200).json(workout)

}
const updateWorkout=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such item with this ID"})
    }
    const workout=await Workout.findOneAndUpdate({_id:id},{...req.body})
    if(!workout){
        return res.status(400).json({error:"No such workout"})   
    }
    res.status(200).json(workout)
}
module.exports={getWorkout, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout}
