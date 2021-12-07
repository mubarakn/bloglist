const _ = require('lodash')
const User = require('../models/user')

// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    if (!blogs.length) return 0
    const reducer = (sum, item) => sum + item.likes

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    if (!blogs.length) return null

    const likesArray = blogs.map(blog => blog.likes)
    return blogs[likesArray.indexOf(Math.max(...likesArray))]
}

const mostBlogs = blogs => {
    if (!blogs.length) return null
    const blogsCountByAuthor = _(blogs).groupBy('author').map((item, author) => ({ author, blogs: item.length})).value()
    const sortedBlogs = blogsCountByAuthor.sort((a, b) => b.blogs - a.blogs)
    return sortedBlogs[0]
}

const mostLikes = blogs => {
    if (!blogs.length) return null
    const blogsByLikes = _(blogs).groupBy('author').map((item, author) => ({ author, likes: _.sumBy(item, 'likes') })).value()
    const sortedData = blogsByLikes.sort((a, b) => b.likes - a.likes)
    return sortedData[0]
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }