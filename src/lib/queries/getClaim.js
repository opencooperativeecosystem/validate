import gql from 'graphql-tag'

const GetClaim = gql`
query ($token: String, $id: Int) {
  viewer(token: $token) {
    plan(id: $id) {
      name
      id
      plannedOn
      scope {
        id
        name
      }
      planProcesses(month:3, year: 2018) {
        name
        id
        committedInputs(action: WORK) {
          note
          id
          action
          resourceClassifiedAs{
            name
          }
          committedQuantity {
            unit {
              name
            }
            numericValue
          }
          fulfilledBy(requestDistribution: true) {
            fulfilledBy {
              id
              action
              validations {
                id
                validatedBy {
                  name
                  id
                }
              }
              start
              inputOf {
                name
              }
              affectedQuantity {
                numericValue
                unit {
                  name
                }
              }
              affects {
                resourceClassifiedAs {
                  name
                  category
                }
                trackingIdentifier
              }
              provider {
                id
                name
                image
              }
              receiver {
                id
                name
              }
              note
            }
          }
        }
      }
    }
  }
}
`

export default GetClaim
