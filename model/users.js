const mongoose = require('mongoose');
const {format} = require('date-fns');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    oAuthID:String,
    username:{
        type:String,
        required:true
    },
    email:String,  
    password:String,
    refreshToken:String
});
module.exports = mongoose.model('User', userSchema); 