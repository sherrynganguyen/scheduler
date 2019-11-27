import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment"
import getAppointmentsForDay from "helpers/selectors"


const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  ;
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(state => ({ ...state, days }));
  const setAppointments = appointments => setState(state => ({ ...state, appointments }));
  const setInterviewers = interviewers => setState(state => ({ ...state, interviewers })); 
  // const setGetAppoinemntsForDay = getAppointmentsForDay => setState(state => ({...state, getAppointmentsForDay}));
  // useEffect(() => {
  //   const promiseDays = axios.get(`http://localhost:8001/api/days`)
  //   const promiseAppts = axios.get(`http://localhost:8001/api/appointments`)
    
  //   Promise.all([promiseDays, promiseAppts]).then((all) => {
  //     console.log(all)
  //     setDays(all[0].data);
  //     setAppointments(all[1].data);
  //   });
  // },[])

  useEffect( async() => {
    const daysResponse = await axios.get(`http://localhost:8001/api/days`);
    const apptResponse = await axios.get(`http://localhost:8001/api/appointments`)
    const intResponse = await axios.get(`http://localhost:8001/api/interviewers`)

    setDays(daysResponse.data);
    setAppointments(apptResponse.data);
    setInterviewers(intResponse.data);

  },[])
  console.log('days', state.days)
  console.log('appt', state.appointments)
  console.log('int', state.interviewers)

  const appointments = getAppointmentsForDay(state, state.day)
  // console.log('monday appt', appointments1)

  // const schedule = appointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //     />
  //   );
  // });

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
        {/* {console.log('testing',appointments1)} */}
        {appointments.map((appointment) =>
          <Appointment key={appointment.id} {...appointment} />
          )}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
    
  );
}


