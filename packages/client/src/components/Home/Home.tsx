import React from 'react'
import type { FC } from 'react'

import getCites from '../../api/queries/getCities'
import FormInput from '../FormInput/FormInput'
import FormTable from '../FormTable/FormTable'

import { useLazyQuery } from '@apollo/client'
import { Container, Heading, Spinner, VStack } from '@chakra-ui/react'

export const Home: FC = () => {
  const [queryAddress, { loading, error, data }] = useLazyQuery(getCites)

  const handleSubmit = (e: any) => {
    queryAddress({
      variables: {
        filter: {
          name: e.target[0]?.value,
        },
      },
    })
    e.preventDefault()
  }
  if (error) {
    return <p data-testid="error">an error has occurred</p>
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <FormInput onSubmit={handleSubmit} />
        {loading ? <Spinner /> : <FormTable data={data?.cities.cities} total={data?.cities.total} />}
      </Container>
    </VStack>
  )
}
