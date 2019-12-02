
export const getAppointmentsForDay = (state, queryDay) => {
  const findDay = state.days.find(day => day.name === queryDay);
  return !findDay ? []
    : findDay.appointments.map(appointment =>
      appointment = state.appointments[appointment]);
};

export const getInterviewersForDay = (state, queryDay) => {
  const findDay = state.days.find(day => day.name === queryDay);
  return !findDay ? []
    : findDay.interviewers.map(interviewer =>
      state.interviewers[interviewer]);
};

export const getInterview = (state, interview) => {
  return !interview ? null : {
    "student": interview.student,
    "interviewer": state.interviewers[interview.interviewer]
  };
};

export const getDayForAppointment = (state, appointment) => {
  const getDay = state.days.find(dayInState =>
    dayInState.appointments.includes(appointment));
  return getDay;
};

export const getSpotMsg = (spots) => { switch (spots) {
  case 0: return 'no spots remaining';
  case 1: return `${spots} spot remaining`;
  default: return `${spots} spots remaining`;
}}
// exports = { getAppointmentsForDay, getInterviewersForDay, getInterview, getDayForAppointment };