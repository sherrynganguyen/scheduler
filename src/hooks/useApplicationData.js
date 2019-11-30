import { useState, useEffect, useReducer } from "react";

import axios from "axios";

import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "../reducers/reducer";

export default function useApplicationData() {

  const initialState = {      
    day: "",
    days: [],
    appointments: {},
    interviewers: {},
  };
  // const setDay = day => setState({ ...state, day });

  const [state, dispatchState] = useReducer(reducer, initialState);

  const setDay = day => dispatchState({type: SET_DAY, value: day})

  // fetch data from api and update the original state with new data

  useEffect(() => {          
  
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      dispatchState({
        type: SET_APPLICATION_DATA,
        value:[all[0].data, all[1].data, all[2].data]
      })
    });
  },[]);

  //booking new interview

  const bookInterview = (id, interview) => {

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, interview)
      .then(() => 
        dispatchState({
          type: SET_INTERVIEW,
          value: {id, interview}
        }))
      .catch(error => error)
      
  };

  //deleting interview

  const cancelInterview = (id, interview) => {
  
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, interview)
      .then(() =>
        dispatchState({
          type: SET_INTERVIEW,
          value: {id, interview: null}
        }))
      .catch(error => error)  
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}