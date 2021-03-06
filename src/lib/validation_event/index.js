import React from 'react'
import style from '../validation_plan/style.css'
import { Link } from 'react-router-dom'
import {Check} from '../icons'

const Canvas = (props) => {
  const {data} = props
  return (
    <section className={style.surface} >
      <header className={style.header}>
        <h1 className={style.title}>
        <Link to={'/validate/'}>Validate</Link> > <Link to={'/validate/plan/' + data.inputOf.processPlan.id }>{data.inputOf.processPlan.name}</Link> > <Link to={'/validate/process/' + data.inputOf.id }>{data.inputOf.name}</Link> > <Link to={'/validate/commitment/' + data.fulfills[0].fulfills.id}>{data.fulfills[0].fulfills.note ? data.fulfills[0].fulfills.note : data.action + ' ' + data.fulfills[0].fulfills.committedQuantity.numericValue + ' ' + data.fulfills[0].fulfills.committedQuantity.unit.name }</Link> > {data.action} {data.affectedQuantity.numericValue + ' ' + data.affectedQuantity.unit.name}
        </h1>
      </header>
      <div className={style.canvas_board + ' ' + style.wrapper_accordion}>
        <div className={style.accordion_list}>
          <SingleValidation deleteValidation={props.deleteValidation} myId={props.myAgentId} createValidation={props.createValidation} style={style} event={data} />
      </div>
    </div>
  </section>
  )
}

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

export default Canvas
