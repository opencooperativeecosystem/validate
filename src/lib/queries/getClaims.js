import gql from 'graphql-tag'

const GetClaims = gql`
query ($token: String, $id: Int) {
    viewer(token: $token) {
      agent(id: $id) {
        name
        eventsCount(month:3, year:2018)
        eventHoursCount(month:3, year:2018)
        eventPeopleCount(month:3, year:2018)
        validatedEventsCount(month:3, year:2018)
        agentPlans(month:3, year: 2018) {
          name
          id
          planProcesses(month:3, year: 2018) {
            name
            id
            committedInputs(action: WORK) {
              note
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
  }
  `

export default GetClaims
