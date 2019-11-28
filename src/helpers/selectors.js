
// function getAppointmentsForDay(state, queryDay) {
//   const findDay = state.days.find(day => day.name === queryDay)
//   // const appointmentIDs = findDay.appointments;
//   // const appointments = appointmentIDs.map(appointmentID => appointmentID = state.appointments[appointmentID])
//   // console.log (appointments);
//   // return appointments;
//   console.log(findDay)
//   return !findDay ? [] : findDay.appointments.map(appointment => appointment = state.appointments[appointment])
// }


function getAppointmentsForDay(state, queryDay) {
  const appointmentDetails = [];
  if (state.days.length === 0) {
    return appointmentDetails;
  } else {
    const day = state.days.filter(dayInState => dayInState.name === queryDay)[0]
    if (day) {
      for (let appt of day["appointments"]) {
        if(state.appointments[appt]) {
          appointmentDetails.push(state.appointments[appt])
        }
      }
      return appointmentDetails;
    } else {
      return appointmentDetails;
    }
  }
}

function getInterviewersForDay(state, queryDay) {
  const interviewersDetails = [];
  if (state.days.length === 0) {
    return interviewersDetails;
  } else {
    const day = state.days.filter(dayInState => dayInState.name === queryDay)[0]
    if (day) {
      for (let int of day["interviewers"]) {
        // if(state.interviewers[int]) {
          interviewersDetails.push(state.interviewers[int])
        // }
      }
      return interviewersDetails;
    } else {
      return interviewersDetails;
    }
  }
}

function getInterview(state, interview) {
  let intDetails;
  if (interview) {
    intDetails = {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
    return intDetails;
  }
  return null;
}

module.exports = { getAppointmentsForDay, getInterviewersForDay, getInterview}