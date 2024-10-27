const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    about: {
        type: String,
    },
    skills: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    photoUrl: { // Added photo URL field
        type: String,
        validate: {
            validator: function (value) {
                return validator.isURL(value); // Validate if it's a valid URL
            },
            message: props => `${props.value} is not a valid URL`
        }
    }
});

module.exports = mongoose.model("User", userSchema);
