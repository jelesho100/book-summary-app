const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const summarySchema = new Schema({
    bookTitle:{
        type: String,
        required: true,
        trim:true
    },
    text:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: [500, 'Character Limit Reached']
    },
    author:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true 
    },   
    timestamps: true
    
})

module.exports = mongoose.model("Summary", summarySchema);