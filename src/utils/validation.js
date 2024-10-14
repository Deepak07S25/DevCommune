const validator = require("validator");
const validateSignUpData = (req) =>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(firstName.length<4 || lastName.length>50){
       throw new Error("Name should be between 4-50 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("enter valid email id");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("try strong password");
    }
}

module.exports = {validateSignUpData};