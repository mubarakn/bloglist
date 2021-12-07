const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
let token = ''
const initialBlogs = [
    {
        title: 'blog 1',
        author: 'mubarak',
        url: 'http://mubarak.com',
        likes: 1
    },
    {
        title: 'blog 2',
        author: 'mubarak',
        url: 'http://mubarak.com',
        likes: 12
    },
    {
        title: 'blog 3',
        author: 'sahib',
        url: 'http://sahib.com',
        likes: 3
    },
    {
        title: 'blog 3',
        author: 'sahib',
        url: 'http://sahib.com',
        likes: 3
    },
    {
        title: 'blog 3',
        author: 'sahib',
        url: 'http://sahib.com',
        likes: 3
    },
]

beforeAll(async () => {
    await User.deleteMany({})
    const newUser = {
        name: 'test',
        username: 'test',
        password: 'test'
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)

    const result = await api
        .post('/api/login')
        .send({ username: 'test', password: 'test' })
    
    token = result.body.token
})

beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
}, 100000)

describe('adding blogs', () => {
    test('throw unauthorized error if no valid token provided', async () => {
        await api
            .post('/api/blogs')
            .send({ title: 'test title', author: 'test author', url: 'test url' })
            .expect(401)
    })

    test('adding blogs with valid auth token saves successfully', async () => {
        await api
            .post('/api/blogs')
            .send({
                title: 'Added new blog',
                author: 'Shabeer',
                url: 'http://shabeer.com',
                likes: 1
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        const result = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
        
        expect(result.body).toHaveLength(initialBlogs.length + 1)
    })
})

describe('when there is initially some blogs saved', () => {
    test('all blogs are returned', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
        expect(response.body).toHaveLength(initialBlogs.length)
    })
    
    test('all blogs contains unique identifier as id', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
        const firstBlog = response.body[0]
        expect(firstBlog).toBeDefined()
    })
    
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
})

describe('viewing a specific note', () => {
    test('If likes property is missing in the request then it should defaults to 0', async () => {
        const response = await api
            .post('/api/blogs')
            .send({
                title: 'Check whether likes equals 0 if not specified',
                author: 'Mubarak',
                url: 'http://mubarak.com'
            })
            .set('Authorization', `Bearer ${token}`)
        expect(response.body.likes).toBe(0)
    })
    
})