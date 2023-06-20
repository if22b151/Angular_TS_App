const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, default: "", trim: true, required: true },
    password: { type: String, default: "", trim: true, required: true },
    company: { type: String, default: "FH Technikum Wien", trim: true },
    address: { type: String, default: "", trim: true },
    postalcode : { type: number, default: "", trim: true }, 
    city : { type: String, default: "", trim: true },
    authToken : { type: number, default: "", trim: true },
});
