import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { render } from '../../test-utils'
import FormInput from './FormInput'

describe('FormInput', () => {
  it('snapshot', () => {
    const wrapper = render(<FormInput onSubmit={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('change input', async () => {
    const wrapper = render(<FormInput onSubmit={jest.fn()} />)

    const inputChange = screen.getByTestId('inputAddress')
    //fireEvent.change isnt working correctly, can be targeted but innerHTML doesnt change
    fireEvent.change(inputChange, { target: { value: 'test' } })
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(wrapper.findByText('test')).toBeInTheDocument()
  })

  it('click button form submit', async () => {
    const mockSubmit = jest.fn()
    const wrapper = render(<FormInput onSubmit={mockSubmit} />)

    const buttonClick = screen.getByTestId('submitButton')
    fireEvent.click(buttonClick)

    expect(mockSubmit).toHaveBeenCalled()
  })
})
