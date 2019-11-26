import React from "react";

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

// export default function InterviewerList({interviewers, interviewer, setInterviewer}) {
//   const interviewerList = interviewers.map((interviewer) =>
//   <section className={interviewers}>
//     <h4 className="interviewers__header text--light">Interviewer</h4> 

//     <ul className="interviewers__list">
//       <InterviewerListItem
//         key={interviewer.id} //what this for?
//         name={interviewer.name}
//         avatar={interviewer.avatar}
//         selected={interviewer.id === interviewer}
//         setInterviewer={() => setInterviewer(interviewer.id)}
//          />

//     </ul>
//     </section>
//   );
  
//   return interviewerList;

  
// }
//h4. where should i render??

export default function InterviewerList({interviewers, value, onChange}) {
  const interviewerList = interviewers.map((interviewer) =>
      <InterviewerListItem
        key={interviewer.id} //what this for?
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
         />
  );
  
  return (
    <section className={interviewers}>
      <h4 className="interviewers__header text--light">Interviewer</h4> 
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
  
}