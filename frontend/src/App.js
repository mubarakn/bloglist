import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogFrom from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

import('./app.css')

const App = () => {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [info, setInfo] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const loggedUserJSON = localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
            blogService
                .getAll()
                .then(blogs => setBlogs( blogs ))
        }
    }, [user])

    const handleLogin = async ({ username, password }) => {
        loginService
            .login({ username, password })
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user))
                setUser(user)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setError('Invalid username or password')
                    setTimeout(() => { setError('') }, 5000)
                }
            })
    }

    const handleCreate = async blog => {
        const newblog = await blogService.add(blog)
        setInfo(`a new blog ${newblog.title} by ${newblog.author} added`)
        setTimeout(() => { setInfo('') }, 5000)
        setBlogs([...blogs, newblog])
    }

    const handleLike = async blog => {
        const newBlog = await blogService.like(blog)
        setBlogs(blogs.map(b => b.id === blog.id ? newBlog : b))
    }

    const handleRemoveBlog = async blog => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            setBlogs(blogs.filter(b => b.id !== blog.id))
            await blogService.remove(blog.id)
        }
    }

    const blogList = () => {
        return (
            <>
                <h2>blogs</h2>
                <div>{user.name} logged in <button onClick={() => {localStorage.clear(); setUser(null)}}>logout</button></div>
                {blogs.sort((a, b) => b.likes - a.likes ).map(blog => {
                    return (<Blog key={blog.id} blog={blog} like={handleLike} removeBlog={() => handleRemoveBlog(blog)} />)
                }
                )}
            </>
        )
    }

    return (
        <div>
            {info && <div className="info">{info}</div>}
            {error && <div className="error">{error}</div>}
            {!user && <LoginForm login={handleLogin} />}
            {user && <BlogFrom createBlog={handleCreate} />}
            {user && blogList()}
        </div>
    )
}

export default App