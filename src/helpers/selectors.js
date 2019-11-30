
const getAppointmentsForDay = (state, queryDay) => {
  const findDay = state.days.find(day => day.name === queryDay)
  return !findDay ? [] : findDay.appointments.map(appointment => appointment = state.appointments[appointment])
}

const getInterviewersForDay = (state, queryDay) => {
  const findDay = state.days.find(day => day.name === queryDay)
  return !findDay ? [] : findDay.interviewers.map(interviewer => state.interviewers[interviewer])
}


// function getAppointmentsForDay(state, queryDay) {
//   const appointmentDetails = [];
//   if (state.days.length === 0) {
//     return appointmentDetails;
//   } else {
//     const day = state.days.filter(dayInState => dayInState.name === queryDay)[0]
//     if (day) {
//       for (let appt of day["appointments"]) {
//         if(state.appointments[appt]) {
//           appointmentDetails.push(state.appointments[appt])
//         }
//       }
//       return appointmentDetails;
//     } else {
//       return appointmentDetails;
//     }
//   }
// }

// function getInterviewersForDay(state, queryDay) {
//   const interviewersDetails = [];
//   if (state.days.length === 0) {
//     return interviewersDetails;
//   } else {
//     const day = state.days.filter(dayInState => dayInState.name === queryDay)[0]
//     if (day) {
//       for (let int of day["interviewers"]) {
//         // if(state.interviewers[int]) {
//           interviewersDetails.push(state.interviewers[int])
//         // }
//       }
//       return interviewersDetails;
//     } else {
//       return interviewersDetails;
//     }
//   }
// }

const getInterview = (state, interview) => {
  // let intDetails;
  return !interview ? null : {
    "student": interview.student,
    "interviewer": state.interviewers[interview.interviewer]
  }
  // if (interview) {
  //   intDetails = {
  //     "student": interview.student,
  //     "interviewer": state.interviewers[interview.interviewer]
  //   }
  //   return intDetails;
  // }
  // return null;
}

const getDayForAppointment = (state, appointment) => {
  const getDay = state.days.find(dayInState => dayInState.appointments.includes(appointment));
  return getDay;
}

module.exports = { getAppointmentsForDay, getInterviewersForDay, getInterview, getDayForAppointment }