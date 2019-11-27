export default function getAppointmentsForDay(state, day) {
  const appointmentDetails = [];
  if (state.days.length === 0) {
    return appointmentDetails;
  } else {
    const appointment = state.days.filter(dayInState => dayInState.name === day)[0]
    if (appointment) {
      for (let appt of appointment["appointments"]) {
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

// export default function getInterview(state, interview) {

// }


//SUPPOSE TO RETURN THIS
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }


//DATA GOES IN

// interviewers: {
//   "1": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   },
//   "2": {
//     id: 2,
//     name: "Tori Malcolm",
//     avatar: "https://i.imgur.com/Nmx0Qxo.png"
//   }
// }


// TEST CODE

// test("getInterview returns an object with the interviewer data", () => {
//   const result = getInterview(state, state.appointments["3"].interview);
//   expect(result).toEqual(
//     expect.objectContaining({
//       student: expect.any(String),
//       interviewer: expect.objectContaining({
//         id: expect.any(Number),
//         name: expect.any(String),
//         avatar: expect.any(String)
//       })
//     })
//   );
// });

// test("getInterview returns null if no interview is booked", () => {
//   const result = getInterview(state, state.appointments["2"].interview);
//   expect(result).toBeNull();
// });