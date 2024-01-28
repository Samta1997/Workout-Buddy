require('dotenv').config();
const express=require('express'); 
const mongoose=require('mongoose');
const workoutRoutes=require('./routes/workoutRoutes');
const userRoutes=require('./routes/userRoutes')
const cors=require("cors");

const app=express();
app.use(cors())

//middleware
app.use(express.json()); //for req body
app.use((req, res, next)=>{             //this will be executed for every request and then next will call the next middlware
    console.log(req.path, req.method);
    next();
})
app.use('/api/workout',workoutRoutes); //for setting workout routes
app.use('/api/user',userRoutes);  //for setting user routes


//setting connection to mongodb Atlas
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Connected to MongoDB Atlas and server is listening on port',process.env.PORT);
        
    })
})


