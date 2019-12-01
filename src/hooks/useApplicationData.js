import { useState, useEffect, useReducer } from "react";

import axios from "axios";

import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "../reducers/reducer";

export default function useApplicationData() {

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spotUpdate: true
  };
  // const setDay = day => setState({ ...state, day });

  const [state, dispatchState] = useReducer(reducer, initialState);

  const setDay = day => dispatchState({type: SET_DAY, value: day});

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
      });
    });
  },[]);

  //booking new interview

  function bookInterview(id, interview) {
    console.log('sn3', id, 'sn5',interview);

    return axios
      .put(`/api/appointments/${id}`, {interview})
      .then(res => {
        if (res.status === 204) {
          dispatchState({
            type: SET_INTERVIEW,
            value: {id, interview, spotUpdate: true}
          });
        }
      });
  }

  //deleting interview

  function cancelInterview(id) {
  
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        if (res.status === 204) {
          dispatchState({
            type: SET_INTERVIEW,
            value: {id, interview: null, spotUpdate: false}
          });
        }
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}