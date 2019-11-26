import React from "react";

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList({interviewers, value, onChange}) {
  const interviewerList = interviewers.map((interviewer) =>
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={(event) => onChange(interviewer.id)}
      />
  );
  
  return (
    <section className={interviewers}>
      <h4 className="interviewers__header text--light">Interviewer</h4> 
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
  
}