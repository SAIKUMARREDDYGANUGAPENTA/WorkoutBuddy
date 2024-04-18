const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.signup = async function(email, password) {
    // Validations
    if (!email || !password) {
        throw new Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Invalid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong");
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error("Email already exists");
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await this.create({ email, password: hash });
        return user;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
};

userSchema.statics.login = async function(email, password) {
    // Validations
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("Incorrect email");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Incorrect password");
    }

    return user;
};

module.exports = mongoose.model('user', userSchema, 'user');
