import gql from 'graphql-tag'

const deleteValidation = gql`
mutation ($token: String!) {
    deleteValidation(token: $token, id: 4) {
      validation {
        validationDate
      }
    }
  }`

export default deleteValidation
