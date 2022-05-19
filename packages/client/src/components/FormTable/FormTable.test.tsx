import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import mutateAddress from '../../api/mutations/mutateAddress'
import { render } from '../../test-utils'
import FormTable from './FormTable'

let createMutationCalled = false

const successMocks = {
  request: {
    query: mutateAddress,
    variables: {
      input: {
        id: 1,
        visited: true,
      },
    },
  },
  result: () => {
    createMutationCalled = true
    return {
      data: {
        updateCity: {
          visited: true,
          id: 1,
          name: 'moscow',
          country: 'country',
          wishlist: true,
        },
      },
    }
  },
}

const city = {
  name: 'moscow',
  country: 'country',
  id: 1,
  visited: false,
  wishlist: true,
}
describe('Formtable', () => {
  it('snapshot', () => {
    const wrapper = render(
      <MockedProvider mocks={[]}>
        <FormTable data={[city]} total={1} />
      </MockedProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('table filled', () => {
    const wrapper = render(
      <MockedProvider mocks={[]}>
        <FormTable data={[city]} total={1} />
      </MockedProvider>
    )
    expect(wrapper.getByText('moscow')).toBeTruthy()
    expect(wrapper.getByText('country')).toBeTruthy()
    expect(wrapper.getByText('false')).toBeTruthy()
    expect(wrapper.getByText('true')).toBeTruthy()
  })
  it('update mutation onClick visited', async () => {
    const wrapper = render(
      <MockedProvider mocks={[successMocks]}>
        <FormTable data={[city]} total={1} />
      </MockedProvider>
    )

    const onSubmit = screen.getByTestId('visited-test')
    fireEvent.click(onSubmit)
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(createMutationCalled).toBe(true)
  })
})
