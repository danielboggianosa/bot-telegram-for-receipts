const { mongoose } = require('../db/mongodb');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    first_name: String,
    last_name: String,
    username: String,
    language_code: String,
    rol: String,
    createdAt: { type: Date, default: Date.now }
});