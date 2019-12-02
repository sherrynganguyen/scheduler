import React from "react";

import "components/DayListItem.scss";
import className from "classnames";

import { getSpotMsg } from "helpers/selectors";

export default function DayListItem(props) {
  // console.log(getSpotMsg(props.spots));
  const dayClass = className('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      {/* <h3 className="text--light">{props.spots} spots remaining</h3> */}
      <h3 className="text--light">{getSpotMsg(props.spots)}</h3>
    </li>
  );
}