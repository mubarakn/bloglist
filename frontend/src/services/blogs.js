import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const config = { headers: { Authorization: token } }
    const response = await axios.get(baseUrl, config)
    return response.data
}

const add = async blog => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const like = async blog => {
    const config = { headers: { Authorization: token } }
    const response = await axios
        .put(
            `${baseUrl}/${blog.id}`,
            {
                title: blog.title,
                author: blog.author,
                likes: blog.likes,
                user: blog.user.id,
                id: blog.id
            },
            config
        )
    return response.data
}

const remove = async blogId => {
    const response = await axios.delete(`${baseUrl}/${blogId}`)
    return response.data
}

const modules = { setToken, getAll, add, like, remove }
export default modules