import React from 'react'
import style from './style.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
const Cards = ({data, link}) => {
  let newData = data.map(x => ({...x, date: moment(x.plannedOn).unix()}))
  return (
    <div className={style.section_wrapper}>
        <div className={style.wrapper}>
            {newData
            .sort((a, b) => b.date - a.date)
            .map((org, i) => (
             <div key={i} className={style.lists_item}>
                <Link key={i} to={'/' + link + '/' + org.id} className={style.link}>
                    <h4 className={style.item_title}>{org.name.length > 0 ? org.name : 'Plan without name'}</h4>
                    <h5 className={style.plan_scope}>{org.note}</h5>
                    <div className={style.item_info}>
                      <span className={style.info_date}>Due to {moment.utc(org.due).format('DD MMM YYYY')}</span>
                    </div>
                </Link>
            </div>
            ))}
        </div>
    </div>
)
}

export default Cards
