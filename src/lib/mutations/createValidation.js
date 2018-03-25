import gql from 'graphql-tag'

const createValidation = gql`
mutation ($token: String!, $validatedById: Int!, $economicEventId: Int!) {
  createValidation(token: $token,
    validatedById: $validatedById,
    economicEventId: $economicEventId
  ) {
    validation {
      id
      validatedBy {
        name
      }
      economicEvent {
        action
        affectedQuantity {
          numericValue
          unit {
            name
          }
        }
      }
      validationDate
    }
  }
}`

export default createValidation
  