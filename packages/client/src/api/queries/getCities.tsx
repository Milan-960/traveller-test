import { gql } from 'apollo-boost'

export default gql`
  query Query($filter: CitiesFilters) {
    cities(filter: $filter) {
      cities {
        name
        country
        visited
        wishlist
        id
      }
      total
    }
  }
`
