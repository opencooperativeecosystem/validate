import React from 'react'
import style from './style.css'
import {Link} from 'react-router-dom'
import {Check} from '../icons'
import Select from 'react-select'
// import 'react-select/dist/react-select.css'
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion'

const Agent = ({data, createValidation, deleteValidation, myAgentId}) => {
  console.log(data)
  return (
    <div className={style.validate_wrapper}>
      <section className={style.wrapper_header}>
        <h5> <b><Link to={'/validate'}>Validation /</Link></b> {data.name} </h5>
      </section>
      <HeroData data={data} />
      <section className={style.wrapper_list}>
        {/* <Filter /> */}
        <div className={style.accordion_list}>
          {data.agentPlans === 0
          ? <div className={style.list_item}>
            <h3>There are no events to validate, do more work ;)</h3></div>
          : 
            // <SingleValidation createValidation={createValidation} key={i} style={style} event={event} />
            <Accordion accordion={false} className={style.accordion}>
              {data.agentPlans.map((plan, i) => (
                <AccordionItem expanded key={i} className={style.accordion_item} hideBodyClassName>
                  <AccordionItemTitle key={i++} className={style.accordion_title + ' ' + style.title_plan} hideBodyClassName>
                    <h3 key={i + 2}>{plan.name}</h3>
                    <div className={style.accordion_arrow} role="presentation" />
                  </AccordionItemTitle>
                  <AccordionItemBody key={i + 3} className={style.accordion_body} hideBodyClassName={style.accordion_body_hidden}>
                    {plan.planProcesses.map((process, j) => (
                      <AccordionItem expanded key={j} className={style.accordion_item} hideBodyClassName>
                      <AccordionItemTitle key={j++} className={style.accordion_title + ' ' + style.title_process} hideBodyClassName>
                        <h3>{process.name}</h3>
                        <div className={style.accordion_arrow} role="presentation" />
                      </AccordionItemTitle>
                      <AccordionItemBody key={j + 2} className={style.accordion_body} hideBodyClassName={style.accordion_body_hidden}>
                        {process.committedInputs.map((commitment, z) => (
                          <AccordionItem key={z} className={style.accordion_item} hideBodyClassName>
                            <AccordionItemTitle key={z++} className={style.accordion_title + ' ' + style.title_commitment} hideBodyClassName>
                              <h3 key={z + 2}>{commitment.note ? commitment.note : commitment.action + ' ' + commitment.committedQuantity.numericValue + ' ' + commitment.committedQuantity.unit.name + ' of ' + commitment.resourceClassifiedAs.name}</h3>
                              <div className={style.accordion_arrow} role="presentation" />
                            </AccordionItemTitle>
                              <AccordionItemBody key={z + 3} className={style.accordion_body} hideBodyClassName={style.accordion_body_hidden}>
                                {commitment.fulfilledBy.map((event, o) => (
                                  <SingleValidation deleteValidation={deleteValidation} myId={myAgentId} createValidation={createValidation} key={o} style={style} event={event.fulfilledBy} />
                                ))}
                              </AccordionItemBody>
                            </AccordionItem>
                        ))}
                      </AccordionItemBody>
                    </AccordionItem>
                    ))}
                  </AccordionItemBody>
                </AccordionItem>
              ))}
            </Accordion>
          }
        </div>
      </section>
    </div>
  )
}

const Filter = () => (
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
)

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

const SingleValidation = ({style, event, createValidation, deleteValidation, myId}) => {
  let validations = []
  for (let i = 0; i < 2; i++) {
    if (event.validations[i]) {
      validations.push(<span key={i} className={style.validations_box + ' ' + style.validations_active} />)
    } else {
      validations.push(<span key={i} className={style.validations_box} />)
    }
  }
  
  let button
  if (event.validations.findIndex(item => Number(item.validatedBy.id) === Number(myId)) === -1 && event.validations.length >= 2) {
    button = ''
  } else if (event.provider.id === myId) {
    button = ''
  } else if (event.validations.some(item => Number(item.validatedBy.id) === Number(myId))) {
    let itemValidated = event.validations.find(item => Number(item.validatedBy.id) === Number(myId))
    button = <button className={style.actions_validate + ' ' + style.actions_unvalidate} onClick={() => deleteValidation(itemValidated.id)}>Cancel validation</button>
  } else {
    button = <button className={style.actions_validate} onClick={() => createValidation(event.id)}>Validate</button>
  }
  return (
    <div className={style.list_item}>
      <div className={style.item_info}>
        <div className={style.event_info}>
          <div className={style.actions_validations}>
            {validations}
          </div>
          <div className={style.event_secondary}>
            <span>eventId: #{event.id}</span>
            <span>Date: {event.start}</span>
          </div>
          <div className={style.infos_title}>
            <img src={event.provider.image} />
            <h3><b>{event.provider.name}</b> {event.action} <b>{event.affectedQuantity.numericValue + ' ' + event.affectedQuantity.unit.name}</b> in process: <b>{event.inputOf.name}</b></h3>
          </div>
          <div className={style.info_description}><p>{event.note}</p></div>
          {button}
        </div>
        <div className={style.info_validation}>
          {event.validations
            ? event.validations.map((val, i) => (
              <div key={i} className={style.validation_item}><span><Check width='18' height='18' color='#00875A' /></span> {val.validatedBy.name} validated </div>
            ))
            : ''
          }
        </div>
      </div>
    </div>
  )
}

export default Agent
