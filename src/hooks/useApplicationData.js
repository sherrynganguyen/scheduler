import { useState, useEffect, useReducer } from "react";

import axios from "axios";

import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "../reducers/reducer";

// const io = reuqire('socket-io.client');

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
      axios.get(`http://localhost:8001/api/interviewers`),
      new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
    ]).then((all) => {
      dispatchState({
        type: SET_APPLICATION_DATA,
        value:[all[0].data, all[1].data, all[2].data]
      });
      const apiSocket = all[3];
      console.log('sn1',apiSocket)
      apiSocket.onopen = () => {
        apiSocket.send("ping");
      }
      apiSocket.onmessage = (event) => {
        console.log('sn2',event.data);
        const { type, id, interview } = JSON.parse(event.data);
        console.log('sn6', JSON.parse(event.data))
        if (type === "SET_INTERVIEW") {
          console.log('check');
          dispatchState({
            type,
            value: {id, interview}
          })
        }
      }
      return () => apiSocket.close();
    });
  },[]);

  //booking new interview

  function bookInterview(id, interview) {
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