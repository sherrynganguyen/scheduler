export function getAppointmentsForDay(state, day) {
  const appointmentDetails = [];
  if (state.days.length === 0) {
    return appointmentDetails;
  } else {
    const appointment = state.days.filter(dayInState => dayInState.name === day)[0]
    if (appointment) {
      for (let appt of appointment["appointments"]) {
        appointmentDetails.push(state.appointments[appt])
      }
      return appointmentDetails;
    } else {
      return appointmentDetails;
    }
  }
}