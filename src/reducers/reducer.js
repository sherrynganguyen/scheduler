import { getDayForAppointment,getSpot } from "../helpers/selectors";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
  // case SET_DAY: {
  //   return ({...state, day: action.value});
  // }
  case SET_APPLICATION_DATA: {
    const [days, appointments, interviewers] = action.value;
    return ({...state, days, appointments, interviewers});
  }
  case SET_INTERVIEW: {
    const {id, interview} = action.value;
    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    /*use helper function to find the day that appointment is added/moved
    then getSpot function to count truthy appointment in appointment data 
    to update the spot*/

    const day = getDayForAppointment(state, id);
    day.spots = getSpot(day, appointments);
    return ({...state, appointments});
  }
  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
}

export {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW};