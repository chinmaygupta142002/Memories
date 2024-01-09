const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/memories-app");
const memorySchema = new mongoose.Schema({
    title:String, 
    message:String, 
    creator:String, 
});
const userSchema = new mongoose.Schema({
    username:String, 
    password:String,
});
const memoryModel = mongoose.model("memorie", memorySchema);
const userModel = mongoose.model("user", userSchema);
app.get("/",  function(req, res){
    memoryModel.find().then(
        result => res.json(result)
    ).catch(err => console.log(err));
});
app.post("/newMemory", function(req, res){
    const newMemory = new memoryModel({
        title: req.body.title, 
        message: req.body.message,
        creator: req.body.creator
    });
    newMemory.save();
    res.json(newMemory);
})
app.post("/register", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new userModel({
        username: username, 
        password: password,
    })
    newUser.save();
    res.json(newUser);
})
app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    userModel.find({username, password}).then(
        result => res.json(result)
    ).catch(err => console.log(err))
})
app.delete("/delete", function(req, res) {
    const title = req.body.title;
    const message = req.body.message;
    const creator = req.body.creator;
    memoryModel.deleteOne({ title, message, creator })
        .then(result => res.json(result))
        .catch(err => console.log(err))
});
app.listen(5000, function(req, res){
    console.log("Server Running");
})
