import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {

  //original state for the App
  const [state, setState] = useState({      
    day: "",
    days: [],
    appointments: {},
    interviewers: {},
    bookInterview,
    cancelInterview,
  });

  const setDay = day => setState({ ...state, day });

  //fetch data from api and update the original state with new data

  useEffect(() => {          
  
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      setState({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      })
    });
  },[])

  //booking new interview

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    })

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => 
        setState({...state, appointments}))
      .catch(error => error)
      
  }

  //deleting interview

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    })    
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, interview)
      .then(() =>
        setState({...state, appointments}))
      .catch(error => error)  
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}