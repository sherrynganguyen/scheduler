import React from "react";


import "components/InterviewerListItem.scss";
import className from "classnames";

export default function InterviewerListItem({id, name, avatar, selected, setInterviewer}) {
  const interviewerClass = className('interviewers__item', {
    'interviewers__item--selected': selected,

  })
  return (
    <li className={interviewerClass} onClick={() => setInterviewer(name)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {name}
  </li>
  )
}


// export default function DayListItem(props) {
//   const dayClass = className('day-list__item', {
//     'day-list__item--selected': props.selected,
//     'day-list__item--full': props.spots === 0,
//   })
//   return (
//     <li className={dayClass} onClick={() => props.setDay(props.name)}>
//       <h2 className="text--regular">{props.name}</h2> 
//       <h3 className="text--light">{props.spots}</h3>
//     </li>
//   );
// }