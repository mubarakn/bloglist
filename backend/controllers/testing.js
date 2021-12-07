const app = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

app.post('/reset', async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    console.log(await User.find({}))
    res.status(204).end()
})

module.exports = app