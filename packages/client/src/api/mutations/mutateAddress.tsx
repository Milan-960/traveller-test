import { gql } from 'apollo-boost'

export default gql`
  mutation UpdateCity($input: CitiesMutationInput) {
    updateCity(input: $input) {
      visited
      id
      name
      country
      wishlist
    }
  }
`
