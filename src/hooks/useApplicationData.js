import { useState, useEffect, useReducer } from "react";

import axios from "axios";


import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "../reducers/reducer";


export default function useApplicationData() {

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  const [state, dispatchState] = useReducer(reducer, initialState);

  const setDay = day => dispatchState({type: SET_DAY, value: day});

  // fetch data from api and update the original state with new data

  useEffect(() => {
  
    let apiSocket;
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) => {
      dispatchState({
        type: SET_APPLICATION_DATA,
        value:[all[0].data, all[1].data, all[2].data]
      });
    });

    apiSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)

      apiSocket.onopen = () => {
        apiSocket.send("ping");
      }
      apiSocket.onmessage = (event) => {
        const { type, id, interview } = JSON.parse(event.data);
        if (type === "SET_INTERVIEW") {
          dispatchState({
            type,
            value: {id, interview}
          })
        }
      }

    return () => {
      if (apiSocket) {
        apiSocket.onmessage = null;
        apiSocket.close();
      }
    }
  },[]);

  //booking new interview

  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, {interview})
      .then(() => {
          dispatchState({
            type: SET_INTERVIEW,
            value: {id, interview}
          });
        }
      );
  }

  //deleting interview

  function cancelInterview(id) {
  
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
          dispatchState({
            type: SET_INTERVIEW,
            value: {id, interview: null}
          });
        }
      );
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}