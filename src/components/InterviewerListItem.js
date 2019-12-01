import React from "react";


import "components/InterviewerListItem.scss";
import className from "classnames";

export default function InterviewerListItem({name, avatar, selected, setInterviewer}) {
  const interviewerClass = className('interviewers__item', {
    'interviewers__item--selected': selected,

  });
  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}

