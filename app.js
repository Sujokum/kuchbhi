const express = require("express");
const cors = require("cors");
require('dotenv').config()
const mongoose  = require("mongoose")
const User = require("./model/User")
const app = express()

const port = process.env.PORT || 8000 ;

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database is connected successfully")
}).catch((e)=>{
    console.log(`connection failed ${e}`)
})

app.get("/" , (req , res)=>{
    res.send("hI JANU")
})

app.post('/api/user' , async (req , res )=>{
    try {
        //username --- validate --- db save -- res --- frnt
        console.log(req.body)
        const {username} = req.body;

        if(!username) return res.status(400).send("invalid user");

            const newUser = await User({
                username
            })
            await newUser.save()

            res.status(201).send(newUser);
        
    } catch (error) {
        console.log(error)
    }

})






app.listen(port , ()=>{
    console.log('server is running on port 8000')
})