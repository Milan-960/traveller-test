import { useMutation } from '@apollo/client'
import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import mutateAddress from '../../api/mutations/mutateAddress'

type FormTableProps = {
  data: [Cities] | null
  total?: number
}
type Cities = {
  country: string
  id: number
  name: string
  visited: boolean
  wishlist: boolean
}

type CityDetails = {
  id: number
  visited?: boolean
  wishlist?: boolean
}
type MutationProps = {
  detail: CityDetails
  selection: 'visited' | 'wishlist'
  updateAddress: (arg0: any) => void
}

export function mutateDetails({ detail, selection, updateAddress }: MutationProps) {
  if (selection == 'visited') {
    updateAddress({
      variables: {
        input: {
          id: detail.id,
          visited: !detail.visited,
        },
      },
    })
  } else {
    updateAddress({
      variables: {
        input: {
          id: detail.id,
          wishlist: !detail.wishlist,
        },
      },
    })
  }
  console.log('Milan', detail, selection)
}

const FormTable: React.FC<FormTableProps> = ({ data, total }) => {
  const [updateAddress] = useMutation(mutateAddress)

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>City</Th>
            <Th>Country</Th>
            <Th>Id</Th>
            <Th>Visited</Th>
            <Th>Wishlist</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((city: Cities, i) => {
              return (
                <Tr key={i}>
                  <Td>{city.name}</Td>
                  <Td>{city.country}</Td>
                  <Td>{city.id}</Td>
                  <Td>
                    <Button
                      data-testid="visited-test"
                      onClick={() =>
                        mutateDetails({
                          detail: { id: city.id, visited: city.visited },
                          selection: 'visited',
                          updateAddress,
                        })
                      }
                    >
                      {JSON.stringify(city.visited)}
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      data-testid="wishlist-test"
                      onClick={() =>
                        mutateDetails({
                          detail: { id: city.id, wishlist: city.wishlist },
                          selection: 'wishlist',
                          updateAddress,
                        })
                      }
                    >
                      {JSON.stringify(city.wishlist)}
                    </Button>
                  </Td>
                </Tr>
              )
            })}
        </Tbody>
      </Table>
      <Table>
        <Thead>
          <Tr>
            <Th>Total cities matched</Th>
            <Td>{total}</Td>
          </Tr>
        </Thead>
      </Table>
    </>
  )
}

export default FormTable
