import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:admin@cluster0.vghufvr.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // reference for User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})


const User = mongoose.model('User', userSchema); //model
const Account = mongoose.model('Account', accountSchema)

export {User, Account}