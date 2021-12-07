const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, minlength: 3, required: true },
    name: String,
    passwordHash: { type: String, required: true },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10)
}

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.passwordHash
    }
})
userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)

module.exports = User