const mongoose = require('mongoose');

//creating the schema
const peopleSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    college: String,
    date_of_birth: String,
    password: String,
    confirmPassword: String,
    dateOfCreation: {
        type: Date,
        default: Date.now()
    }
})

// creating our collection
const People = mongoose.model('People', peopleSchema);

module.exports = {
    People: People
}