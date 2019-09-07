import mongoose from 'mongoose';

const schema = mongoose.Schema;
const userSchema = new schema({
    FirstName :{
        type:String,
        required:true

    },
    Lastname :{
        type:String,
        required:true

    },
    username :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    typeOfAccount:{
        type:String,
        required:true
    },
    hasReachedMaximumProfiles:{
        type:Boolean,
        required:true
    }
    


});
module.exports = Users = mongoose.model("Users",userSchema);