import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import style from './App.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Cards from './components/cards'

const Lists = (props) => {
  const {viewer, loading, error} = props.data
  return (
    loading ? <strong>Loading...</strong> : (
    error ? <p style={{ color: '#F00' }}>API error</p> : (
      <section className={style.agent}>
      <Tabs selectedTabClassName={style.list_active}>
      <div className={style.agent_sidebar_wrapper}>
        <div className={style.agent_sidebar}>
          <h1>Your Network</h1>
          <ul className={style.sidebar_panel}>
            <TabList className={style.scope_list}>
              {viewer.myAgent.agentRelationships.map((item, i) => (
                <Tab key={i}>{item.object.name}</Tab>
              ))}
            </TabList>
          </ul>
        </div>
      </div>
      <div className={style.agent_profile}>
        {viewer.myAgent.agentRelationships.map((item, i) => (
          <TabPanel key={i}>
            <div className={style.agent_info}>
              <div className={style.info_data}>
                <h1 className={style.info_title}>{item.object.name}</h1>
                <h5 className={style.info_note}>{item.object.note}</h5>
              </div>
            </div>
            <HeroData data={item.object} />
            <Cards
              data={item.object.agentPlans}
              link={'validate/plan'}
            />
          </TabPanel>
        ))}
    </div>
    </Tabs>
  </section>
    ))
  )
}



const HeroData = ({data}) => (
  <section className={style.wrapper_hero}>
    <div className={style.hero_item}>
      <h3>{data.eventsCount}</h3>
      <h5>Events</h5>
    </div>
    <div className={style.hero_item}>
      <h3>{data.validatedEventsCount}</h3>
      <h5>Validated</h5>
    </div>
    <div className={style.hero_item}>
      <h3>{data.eventHoursCount}</h3>
      <h5>Hours Spent</h5>
    </div>
    <div className={style.hero_item}>
      <h3>{data.eventPeopleCount}</h3>
      <h5>People Involved</h5>
    </div>
  </section>
)



const agentPlans = gql`
query ($token: String) {
  viewer(token: $token) {
    myAgent {
      id
      name
      image
      agentRelationships {
        relationship {
          label
          category
        }
        object {
          id
          name
          note
          image
          eventsCount(month:3, year:2018)
          eventHoursCount(month:3, year:2018)
          eventPeopleCount(month:3, year:2018)
          validatedEventsCount(month:3, year:2018)
          agentPlans(month:3, year: 2018) {
            name
            id
            note
            due
            plannedOn
          }
        }
      }
    }
  }
}  
`

export default graphql(agentPlans, {
  options: (props) => ({variables: {
    token: localStorage.getItem('oce_token')
}})
})(Lists)
