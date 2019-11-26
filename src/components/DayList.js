import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList({days, day, setDay}) {
  const dayList = days.map((dayListItem) => 
    <ul>
      <DayListItem 
      name={dayListItem.name} 
      spots={dayListItem.spots} 
      selected={dayListItem.name === day}
      setDay={setDay}  />
    </ul>
  );
  return dayList;
}