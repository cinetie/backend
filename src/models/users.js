import mongoose from 'mongoose';

const schema = mongoose.Schema;
const userSchema = new schema({
    firstName :{
        type:String,
        required:true

    },
    lastName :{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    plan:{
        type:String,
        required:true
    },
    hasReachedMaximumProfiles:{
        type:Boolean,
        required:true
    },
    accounts : [ new schema({
        name :{
            type:String,
            required:true
        }
    })]
    


});
module.exports = Users = mongoose.model("Users",userSchema);