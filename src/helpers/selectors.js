
const getAppointmentsForDay = (state, queryDay) => {
  const findDay = state.days.find(day => day.name === queryDay);
  return !findDay ? []
    : findDay.appointments.map(appointment =>
      appointment = state.appointments[appointment]);
};

const getInterviewersForDay = (state, queryDay) => {
  const findDay = state.days.find(day => day.name === queryDay);
  return !findDay ? []
    : findDay.interviewers.map(interviewer =>
      state.interviewers[interviewer]);
};

const getInterview = (state, interview) => {
  return !interview ? null : {
    "student": interview.student,
    "interviewer": state.interviewers[interview.interviewer]
  };
};

const getDayForAppointment = (state, appointment) => {
  const getDay = state.days.find(dayInState =>
    dayInState.appointments.includes(appointment));
  return getDay;
};

module.exports = { getAppointmentsForDay, getInterviewersForDay, getInterview, getDayForAppointment };