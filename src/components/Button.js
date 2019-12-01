import React from "react";

import "components/Button.scss";
import className from "classnames";

export default function Button(props) {
  const buttonClass = className("button", {
    'button--confirm': props.confirm,
    'button--danger': props.danger
  });
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
