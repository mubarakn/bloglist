import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogFrom from './BlogForm'

test('check if the form element calls its handler with given input', () => {
    const mockHandler = jest.fn()

    const component = render(<BlogFrom createBlog={mockHandler} />)
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const submit = component.container.querySelector('#submit')

    fireEvent.input(titleInput, { target: { value: 'A' } })
    fireEvent.input(authorInput, { target: { value: 'B' } })
    fireEvent.input(urlInput, { target: { value: 'C' } })

    fireEvent.click(submit)

    const call = mockHandler.mock.calls[0][0]
    expect(call).toEqual({ title: 'A', author: 'B', url: 'C' })

})