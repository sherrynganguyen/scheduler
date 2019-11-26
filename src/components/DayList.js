import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList({days, day, setDay}) {
  const dayList = days.map((dayListItem) => 
      <DayListItem 
      name={dayListItem.name} 
      spots={dayListItem.spots} 
      selected={dayListItem.name === day}
      setDay={setDay}  />
  );

  return <ul>{dayList}</ul>;
}