import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview } from "helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  ;
  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    const promiseDays = axios.get(`http://localhost:8001/api/days`);
    const promiseAppts = axios.get(`http://localhost:8001/api/appointments`);
    const promiseInts = axios.get(`http://localhost:8001/api/interviewers`);
    
    Promise.all([promiseDays, promiseAppts, promiseInts]).then((all) => {
      setState({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      })
    });
  },[])

  const appointments = getAppointmentsForDay(state, state.day)

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    if (interview) {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
        />
      );
    }

  });

  return (
    <main className="layout">
      <section className="sidebar">
       <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList days={state.days} day={state.day} setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
        {/* Replace this with the sidebar elements during the "Environment Setup" activity. */}
      </section>
      <section className="schedule">
        <nav className="sidebar__menu">

        </nav>
        {schedule}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
    
  );
}


