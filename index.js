const express = require("express");
const cors = require("cors");
const mongoose  = require("mongoose")
const User = require("./model/User")
const app = express()




app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://sunailahmad7:test123@cluster0.xbgs8ww.mongodb.net/").then(()=>{
    console.log("database is connected successfully")
}).catch((e)=>{
    console.log(`connection failed ${e}`)
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






app.listen(8000 , ()=>{
    console.log('server is running on port 8000')
})