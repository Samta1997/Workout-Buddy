const express=require('express');

const { getSingleWorkout,getWorkout,createWorkout,deleteWorkout,updateWorkout } =require ('../controller/workoutController');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();
//require auth for all workout route
router.use(requireAuth)

router.get('/',getWorkout);
router.get('/:id',getSingleWorkout);
router.post('/',createWorkout);
router.delete('/:id',deleteWorkout);
router.patch('/:id',updateWorkout);


module.exports=router;