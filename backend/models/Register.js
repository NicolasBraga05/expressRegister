const mongoose = require('../db/conn')
const { Schema } = mongoose

const Register = mongoose.model(
    'Register',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
    }, {timestamps: true},

    )
)

module.exports = Register