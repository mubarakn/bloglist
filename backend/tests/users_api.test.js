const helper = require('./test_helper')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeAll(async () => {
        await User.deleteMany({})

        const passwordHash = await User.hashPassword('basha')
        const user = new User({ username: 'mubarak', passwordHash })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const uesrsAtStart = await helper.usersInDb()

        const newUser = {
            username: 'basha',
            name: 'Mubarak Basha',
            password: 'mubarak'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(uesrsAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    describe('invalid or empty input data', () => {
        test('creating user without username or password should throw error', async () => {
            const newUser = {
                username: '',
                name: 'Someone',
                password: ''
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    
        test('creating user with username less than 3 chars or password less than 3 chars should throw error', async () => {
            const newUser = {
                username: 'ab',
                name: 'Someone',
                password: 'cd'
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    })

    test('creating a new user with the existing username should throw error', async () => {
        const newUser = {
            username: 'basha',
            name: 'Basha',
            password: 'mubarak'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

    })
})