import React, { useState } from 'react'

const Blog = ({ blog, like, removeBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [showDetails, setShowDetails] = useState(false)

    const handleView = () => {
        setShowDetails(!showDetails)
    }

    const handleLike = () => {
        const updatedBlog = { ...blog, ...{ likes: blog.likes + 1 } }
        like(updatedBlog)
    }
    return (
        <div className="blog" style={blogStyle}>
            {blog.title} {blog.author} <button className="toggleViewButton" onClick={handleView}>{showDetails ? 'hide' : 'view'}</button>
            {showDetails && (
                <>
                    <div>{blog.url}</div>
                    <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
                    <div>{blog.author}</div>
                    <button onClick={removeBlog}>remove</button>
                </>
            )}
        </div>
    )
}

export default Blog