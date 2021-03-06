import React, { Fragment, useEffect } from 'react';

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";
import Status from "./Status";

import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETE = "DELETE";
const EDIT = "EDIT";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const saveData = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const destroy = () => {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
    }, [props.interview, transition, mode]);
       
  return (
    <Fragment>
      <article  className="appointment" data-testid="appointment">
        <Header id={props.id} time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
            
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={saveData}
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer ? props.interview.interviewer.id : ""}
            onCancel={() => transition(SHOW)}
            onSave={saveData}
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
            onConfirm={destroy}
          />
        )}
        {mode === DELETE && (
          <Status
            message={"DELETING"}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message={"save"}
            onClose={back}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message={"delete"}
            onClose={back}
          />
        )}
      </article>
    </Fragment>
  );
}