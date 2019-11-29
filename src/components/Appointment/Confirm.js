import React from "react";

import Button from "../Button";

export default function Confirm(props) {

  function destroy() {
    props.onConfirm(props.student, props.interviewer ? props.interviewer.name : "")
  }

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button danger onClick={destroy}>Confirm</Button>
        </section>
    </main>
  )
}
