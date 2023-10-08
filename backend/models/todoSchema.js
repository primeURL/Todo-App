const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
    text: {type : String, required : true},
    completed: {type : Boolean, default : false},
    deleteBtn : {type:Boolean,default:true}
});


const TodoSchema = mongoose.model("todo", Todo);

module.exports = TodoSchema