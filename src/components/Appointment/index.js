import React from "react";
import "./styles.scss";

export default function Appointment() {
  return <article className="appointment"></article>
}



// // const dayClass = className('day-list__item', {
// //   'day-list__item--selected': props.selected,
// //   'day-list__item--full': props.spots === 0,
// // })
// // return (
// //   <li className={dayClass} onClick={() => props.setDay(props.name)}>
// //     <h2 className="text--regular">{props.name}</h2> 
// //     <h3 className="text--light">{props.spots}</h3>
// //   </li>
// // );