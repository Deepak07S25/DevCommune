const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    age:{
        type:Number, 
    },
    gender:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    }
  
    
});

module.exports = mongoose.model("User",userSchema);