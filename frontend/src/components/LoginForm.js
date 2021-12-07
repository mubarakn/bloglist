import React, { useState } from 'react'
import Togglable from './Togglable'

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        if (typeof login === 'function') {
            login({ username, password })
        }
    }

    return (
        <Togglable buttonLabel="Show Login">
            <div>
                <h2>log in to application</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label> <input id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
                    </div>
                    <div>
                        <label>Password:</label> <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        </Togglable>
    )
}

export default LoginForm