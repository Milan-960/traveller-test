import React from 'react'
import type { FC } from 'react'

import getCites from '../../api/queries/getCities'
import FormTable from '../FormTable/FormTable'

import { useQuery } from '@apollo/client'
import { Container, Heading, Spinner } from '@chakra-ui/react'

export const Visited: FC = () => {
  const { loading, error, data } = useQuery(getCites, {
    variables: {
      filter: {
        visited: true,
      },
    },
    fetchPolicy: 'network-only', //ensure we pull from DB, not cache
  })

  if (error) {
    return <p>an error has occured</p>
  }
  return (
    <>
      <Heading as="h1">Wish list</Heading>
      {loading ? <Spinner /> : <FormTable data={data?.cities.cities} total={data?.cities.total} />}

      <Container centerContent maxW="container.md" flexDir="row"></Container>
    </>
  )
}
