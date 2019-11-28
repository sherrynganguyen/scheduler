import React, { Fragment } from 'react'

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";
import Status from "./Header";

import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETING = "DELETING"
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const ERROR = "ERROR";


export default function Appointment(props) {
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
  };

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

  return (
    <Fragment>
        <Header id={props.id} time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && (
          <Form
            // name={props.interview.name}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && (
          <Status
            message={"SAVING"}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message={"Are you sure you want to delete?"}
            onCancel={back}
            onConfirm={transition} //review
          />
        )}
        {mode === DELETING && (
          <Status
            message={"DELETING"}
          />
        )}
        {mode === ERROR && (
          <Error
          />
        )}
      

    </Fragment>  

)
}



{/* {(props.interview) ? 
  <Show 
  id={props.id}
  time={props.time}
  student={props.interview["student"]}
  interviewer={props.interview["interviewer"]}
  />
  : <Empty/>} */}