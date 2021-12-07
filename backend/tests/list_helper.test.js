const listHelper = require('../utils/list_helper')

describe('total tests', () => {
    
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const blogs = [
        {
            title: 'blog 1',
            author: 'mubarak',
            likes: 1
        },
        {
            title: 'blog 2',
            author: 'mubarak',
            likes: 12
        },
        {
            title: 'blog 3',
            author: 'sahib',
            likes: 3
        },
        {
            title: 'blog 3',
            author: 'sahib',
            likes: 3
        },
        {
            title: 'blog 3',
            author: 'sahib',
            likes: 3
        },
    ]

    test('dummy return one', () => {
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })

    test('total likes return 0 if the array is empty', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only on blog, equal thte likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('return most favorite blog from blog list', () => {
        const blogs = [
            {
                title: 'blog 1',
                author: 'mubarak',
                likes: 1
            },
            {
                title: 'blog 2',
                author: 'basha',
                likes: 12
            },
            {
                title: 'blog 3',
                author: 'sahib',
                likes: 3
            },
        ]
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toBe(blogs[1])
    })

    test('return the most blogged author with blog count', () => {
        
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({ author: 'sahib', blogs: 3 })
    })

    test('return the most liked author', () => {
        expect(listHelper.mostLikes(blogs)).toEqual({ author: 'mubarak', likes: 13 })
    })
})