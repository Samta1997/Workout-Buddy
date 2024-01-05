const express=require('express');
const router=express.Router();
const { getSingleWorkout,getWorkout,createWorkout,deleteWorkout,updateWorkout } =require ('../controller/workoutController')

router.get('/',getWorkout);
router.get('/:id',getSingleWorkout);
router.post('/',createWorkout);
router.delete('/:id',deleteWorkout);
router.patch('/:id',updateWorkout);


module.exports=router;