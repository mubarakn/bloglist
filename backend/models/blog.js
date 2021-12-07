const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3},
    author: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id
        delete returnObject._id
        delete returnObject.__v
    }
})
blogSchema.plugin(uniqueValidator)
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog