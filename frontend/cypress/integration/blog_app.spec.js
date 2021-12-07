describe('Blog app', function() {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Mubarak Basha',
            username: 'mubarak',
            password: 'basha'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
        cy.contains('Show Login').click()
    })

    it('login form is shown', function() {
        cy.contains('login')
    })

    describe('login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mubarak')
            cy.get('#password').type('basha')
            cy.contains('login').click()
            cy.contains('Mubarak Basha logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('mubarak')
            cy.get('#password').type('bahsa')
            cy.contains('login').click()
            cy.contains('Invalid username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('mubarak')
            cy.get('#password').type('basha')
            cy.contains('login').click()
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#submit').click()
            cy.contains('test title')
        })
    })

    describe('when blog is created', function() {
        beforeEach(function() {
            cy.get('#username').type('mubarak')
            cy.get('#password').type('basha')
            cy.contains('login').click()
            cy.contains('create new blog').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#submit').click()
        })

        it('users can like a blog', function() {
            cy.contains('view').click()
            cy.contains('like').click()
        })

        it('users can delete a blog', function() {
            cy.contains('view').click()
            cy.contains('remove').click()
        })
    })
})

/* describe('Blog App', function() {

    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Mubarak Basha',
            username: 'mubarak',
            password: 'basha'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'mubarak', password: 'basha'
            }).then(response => {
                localStorage.setItem('user', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })
    })

    it('user can login', function() {
        cy.contains('Show Login').click()
        cy.get('#username').type('mubarak')
        cy.get('#password').type('basha')
        cy.contains('login').click()
    })

    it.only('login fails with wrong password', function() {
        cy.contains('Show Login').click()
        cy.get('#username').type('mubarak')
        cy.get('#password').type('bahsa')
        cy.contains('login').click()

        cy.get('.error')
            .should('contain', 'Invalid username or password')
            .and('have.css', 'color', 'rgb(236, 72, 153)')

        cy.get('html').should('not.contain', 'Mubarak Basha logged in')
    })


}) */