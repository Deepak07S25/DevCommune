const validator = require("validator");



const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password, age, gender } = req.body;

    if (!firstName || !lastName || !emailId || !password || !age || !gender) {
        throw new Error("All fields are required");
    }
    if (firstName.length < 4 || lastName.length < 4 || firstName.length > 50 || lastName.length > 50) {
        throw new Error("Name should be between 4-50 characters");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Enter a valid email id");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be strong");
    }
    if (typeof age !== "number" || age <= 0) {
        throw new Error("Age must be a positive number");
    }
    if (!gender) {
        throw new Error("Gender is required");
    }
};


const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );

    return isEditAllowed; // Return true if all fields are allowed, otherwise false
};

module.exports = { validateSignUpData, validateEditProfileData };
