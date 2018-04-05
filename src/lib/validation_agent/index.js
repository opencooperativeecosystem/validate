import React from 'react'
import style from './style.css'
import {Link} from 'react-router-dom'
import Cards from '../components/cards'
// import 'react-select/dist/react-select.css'

const Agent = ({data, createValidation, deleteValidation, myAgentId}) => {
  return (
    <div className={style.validate_wrapper}>
      <header className={style.header}>
        <h1 className={style.title}>
          {data.name}
        </h1>
      </header>
      {/* <section className={style.wrapper_header}>
        <h5> <b><Link to={'/validate'}>Validation /</Link></b> {data.name} </h5>
      </section> */}
      <HeroData data={data} />
      <section className={style.wrapper_list}>
        {/* <Filter /> */}
        <h5 className={style.monthly_title}>Monthly Plans</h5>
        <div className={style.wrapper}>
          <Cards
            data={data.agentPlans}
            link='validate/plan'
          />
        </div>
      </section>
    </div>
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



export default Agent
