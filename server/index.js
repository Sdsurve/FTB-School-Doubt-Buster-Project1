import express from "express";
import cors from "cors";
import Signup from "./controllers/Signup.js";
import Login from "./controllers/Login.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import {createStudent, getAllStudents, getStudentById} from "./controllers/student.js";

import{ postComplaint,
    getComplaintById,
    getComplaints,
    updateComplaint ,
    deleteComplaint,
    getComplaintsByUser,
    getComplaintsByParent,
    getComplaintsByClass} from "./controllers/complaint.js";  

    import { postParent, getAllParent, getParentById, putParent, delParent} from "./controllers/parent.js";

import { getClassbyId, postClass } from "./controllers/class.js";


const app = express()
app.use(express.json())
app.use(cors())

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URL)

    if (conn) {
        console.log('MongoDB Connected');
    }
    else {
        console.log('Failure in connection')
    }
}
connectDB();

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: "server is working successfully!!!"
    })
})

app.post("/login",Login)
app.post("/signup",Signup)

app.post("/createstudent",createStudent)
app.get("/getAllStudents",getAllStudents)
app.get("/getStudentById",getStudentById)

app.post('/complaint', postComplaint)
app.get('/complaintsbyid/:id', getComplaintById)
app.get('/complaints',getComplaints)
app.put('/updatecomplaint/:id', updateComplaint)
app.delete('/deletecomplaint/:id', deleteComplaint)
app.get('/complaintsbyuser/:id', getComplaintsByUser)
app.get('/complaintbyparent/:id',getComplaintsByParent)
app.get('/complaintsbyclass/:id', getComplaintsByClass)


app.post('/createClass',postClass)
app.get('/fetchClasses/:id',getClassbyId)

app.post('/parent', postParent)
app.get('/parents', getAllParent)
app.get('/parents/:id', getParentById)
app.put('/parents/:id', putParent)
app.delete('/parents/:id',delParent)

// app.post("/teacher",postTeacher);
// app.get("/teachers",getTeacher);
// app.get("/teacher/:id",getTeacherById);
// app.put("/teacher/:id", putTeacher);
// app.delete("/teacher/:id",deleteTeacher)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
