import React from "react";

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList({interviewers, interview, setInterviewer}) {
  const interviewerList = interviewers.map((interview) =>
  <section className={interviewers}>
    <h4 className="interviewers__header text--light">Interviewer</h4>

    <ul className="interviewers__list">
      <InterviewerListItem
        id={interview.id}
        name={interview.name}
        avatar={interview.avatar}
        setInterviewer={setInterviewer} />

    </ul>
    </section>
  );
  
  return interviewerList;

  
}

// export default function DayList({days, day, setDay}) {
//   const dayList = days.map((dayListItem) => 
//     <ul>
//       <DayListItem 
//       name={dayListItem.name} 
//       spots={dayListItem.spots} 
//       selected={dayListItem.name === day}
//       setDay={setDay}  />
//     </ul>
//   );
//   return dayList;
// }