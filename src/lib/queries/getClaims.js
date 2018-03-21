import gql from 'graphql-tag'

const GetClaims = gql`
query ($token: String, $id: Int) {
    viewer(token: $token) {
      agent(id: $id) {
        name
        agentEconomicEvents(latestNumberOfDays: 50, requestDistribution: true) {
          id
          action
          start
          requestDistribution
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
  `

export default GetClaims
