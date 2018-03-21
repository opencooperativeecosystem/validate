import React from 'react'
import style from './style.css'
import {Link} from 'react-router-dom'
import {Check} from '../icons'
import Select from 'react-select'
// import 'react-select/dist/react-select.css'

const Agent = ({data}) => {
  return (
    <div className={style.validate_wrapper}>
    <section className={style.wrapper_header}>
      <h5> <b><Link to={'/validate'}>Validation /</Link></b> {data.name} </h5>
    </section>
    <section className={style.wrapper_hero}>
      <div className={style.hero_item}>
        <h3>234</h3>
        <h5>Events</h5>
      </div>
      <div className={style.hero_item}>
        <h3>121</h3>
        <h5>Validated</h5>
      </div>
      <div className={style.hero_item}>
        <h3>183</h3>
        <h5>Hours Spent</h5>
      </div>
      <div className={style.hero_item}>
        <h3>12</h3>
        <h5>People Involved</h5>
      </div>
    </section>
    <section className={style.wrapper_list}>
      <section className={style.filter}>
        <div className={style.filter_item}>
          <Select 
            placeholder={'Select a plan...'}
            options={[
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' },
            ]} />
        </div>
        <div className={style.filter_item}>
          <Select
            placeholder={'Select a process...'}
            options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]} />
        </div>
        <div className={style.filter_item}>
          <Select 
            placeholder={'Select a commitment...'}
            options={[
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' },
            ]} />
        </div>
        <div className={style.filter_item}>
          <Select
            placeholder={'Select an agent...'}
            options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]} />
        </div>
      </section>
      <div className={style.accordion_list}>
        {data.agentEconomicEvents.length === 0
        ? <div className={style.list_item}>
          <h3>There are no events to validate, do more work ;)</h3></div>
        : data.agentEconomicEvents.map((event, i) => (
          <div key={i} className={style.list_item}>
            <div className={style.item_actions}>
              <div className={style.actions_validations}>
                <span className={style.validations_box} />
                <span className={style.validations_box} />
              </div>
              <button>Validate</button>
            </div>
            <div className={style.item_info}>
              <div className={style.event_info}>
                <div className={style.info_title}>
                  <img src={event.provider.image} />
                  <h3><b>{event.provider.name}</b> {event.action} <b>{event.affectedQuantity.numericValue + ' ' + event.affectedQuantity.unit.name}</b> in process: <b>Italian Translation</b></h3>
                </div>
                <div className={style.info_description}><p>{event.note}</p></div>
              </div>
              <div className={style.info_validation}>
                <div className={style.validation_item}><span><Check width='18' height='18' color='#00875A' /></span> Michalis validated </div>
                <div className={style.validation_item}><span><Check width='18' height='18' color='#00875A' /></span> Maro validated </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
  )
}

export default Agent
