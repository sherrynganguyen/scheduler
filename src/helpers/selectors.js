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

module.exports = { getAppointmentsForDay, getInterview}


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

// {
//   "id":1,
//   "time":"12pm",
//   "interview": {
//     "student": "Lydia Miller-Jones",
//     "interviewer": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     }
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