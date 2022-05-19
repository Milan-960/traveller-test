import React from 'react'
import type { FC } from 'react'

import { useQuery } from '@apollo/client'
import { Container, Heading, Spinner } from '@chakra-ui/react'

import getCities from '../../api/queries/getCities'
import { FormTable } from '../FormTable/FormTable'

export const WishList: FC = () => {
  const { loading, error, data } = useQuery(getCities, {
    variables: {
      filter: {
        wishlist: true,
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
