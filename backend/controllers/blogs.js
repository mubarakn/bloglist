const app = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

app.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
    res.json(blogs)
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id).populate('user', { name: 1, username: 1 })
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

app.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body

    if (!title || !url) {
        res.status(400).json({ error: 'title and url required'})
        return
    }

    const user = await User.findById(req.user.id)

    const blog = new Blog({ title, author, url, likes, user: user._id })
    await blog.save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    res.json(blog)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if (blog.user.toString() === req.user.id) {
        await Blog.findByIdAndRemove(id)
        res.status(204).end()
    } else {
        // eslint-disable-next-line quotes
        res.status(401).status({ error: `you don't have permission to delete this blog`})
    }
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if (blog.user.toString() === req.user.id.toString()) {
        const newBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
        res.json(newBlog)
        return
    }
    res.status(403).json({ error: `You don't have rights to udpate the blog`})
})

module.exports = app