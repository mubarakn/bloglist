const app = require('express').Router()
const User = require('../models/user')

app.post('/', async (req, res) => {
    const { name, username, password } = req.body

    if (!username || !password) {
        res.status(400).json({ error: 'Username and Password both are required' })
        return
    }

    if (password.length < 3 ) {
        res.status(400).json({ error: 'Password must be atlead 3 characters long' })
        return
    }

    const passwordHash = await User.hashPassword(password)

    const user = new User({ name, username, passwordHash })
    const savedUser = await user.save()
    res.json(savedUser)

})

app.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

module.exports = app