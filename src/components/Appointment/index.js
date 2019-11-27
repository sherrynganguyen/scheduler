import React, { Fragment } from 'react'

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";
import Status from "./Header";

import "./styles.scss";

export default function Appointment(props) {
  let display;
  if (props.interview) {
    display = <Show 
      id={props.id}
      time={props.time}
      student={props.interview["student"]}
      interviewer={props.interview["interviewer"]}
      />
  } else {
    display = <Empty/>
  }
  return (
    <Fragment>
        <Header id={props.id} time={props.time}/>
        {display}
        {/* (props.interview) ? 
          <Show 
          id={props.id}
          time={props.time}
          student={props.interview["student"]}
          interviewer={props.interview["interviewer"]}
          />
          : <Empty/> */}
    </Fragment>  

  )
}


