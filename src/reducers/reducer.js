const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch(action.type) {
    case SET_DAY:
      return ({...state, day: action.value});
    case SET_APPLICATION_DATA: {
      const [days, appointments, interviewers] = action.value;
      console.log('sn1', {...state, days, appointments, interviewers})
      return ({...state, days, appointments, interviewers});
    }
    case SET_INTERVIEW: {
      const {id, interview} = action.value;
      console.log('sn4', action.value)
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      // spots = {
      //   ...state.
      // }
      return ({...state, appointments});
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW};