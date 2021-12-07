import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
let mockHandler = jest.fn()
beforeEach(() => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        url: 'test url',
        author: 'test author'
    }

    component = render(<Blog blog={blog} like={mockHandler} />)
})

test('renders title and author and does not render url and likes', () => {
    expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
    expect(component.container).toHaveTextContent('test author')
    expect(component.container).not.toContain('test url')
    expect(component.container).not.toContain('likes')
})

test('renders url and number of likes when show button is clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent('test url')
    expect(component.container).toHaveTextContent('likes')
})

test('if the like button click twice the event handler received as props is called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
})