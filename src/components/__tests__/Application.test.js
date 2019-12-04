import React from "react";

import { render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  debug,
  queryByText,
  queryByAltText,
  getByTestId,
  waitForElementToBeRemoved
} from "@testing-library/react";

import axios from "axios";

// import axios from "../../__mocks__/axios";

import Application from "components/Application";
import Appointment from "components/Appointment";
import DayListItem from "components/DayListItem";
import Error from "components/Appointment/Error";


// describe('Test', () => {

  // beforeEach(() => {
  //   axios.defaults.baseURL = "http://localhost:8001"
  //   jest.mock('axios', () => require("../../__mocks__/axios"));
  // });

afterEach(cleanup);

describe('Application', () => {
  // the test will all passed with this. If using async await, it all fails. Do not know why?

  it("defaults to Monday and changes the schedule when a new day is selected without crashing", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container,"Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    debug(prettyDOM(appointment))

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"),
    { target: { value: 'Lydia Miller-Jones' } }
    );
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones')); // this doesnt pass the test due to the WebSocket API
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    debug()
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      );
      
      
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(appointment, "Are you sure you want to delete?")
      ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "DELETING")).toBeInTheDocument();


    waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    debug(prettyDOM(appointment))
  });

// //WORKING ON
//   it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
//     // 1. Render the element Application
//     const { container, debug } = render(<Application />);
//     // 2. Wait until the text "Archie Cohen" is displayed.
//     await waitForElement(() => getByText(container,"Archie Cohen"));


//     // 3. Click delete button
//     const appointment = getAllByTestId(container, "appointment").find(
//       appointment => queryByText(appointment, "Archie Cohen")
//     )

//     fireEvent.click(queryByAltText(appointment, "Delete"));
//     // debug()  

//     // 4. Render the element Confirm
//     await waitForElement(() => getByTestId(container, "confirm"));
//     // 5. Click confirm button to delete
//     // debug(prettyDOM(container))
//     expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

//     fireEvent.click(queryByText(appointment, "Confirm"))
//     // 6. Check that the element with the text "Deleting" is displayed
//     expect(getByText(appointment, "DELETING")).toBeInTheDocument();
//     // 7. Wait until the element Empty displayed
//     await waitForElement(() => queryByText(container, "Empty"));
//     // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
//     const day = getAllByTestId(container, "day").find(day =>
//       queryByText(day, "Monday")
//     );
//     expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
//   })


//   it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
//     // 1. Render the element Application
//     const { container, debug } = render(<Application />);
//     // 2. Wait until the text "Archie Cohen" is displayed.
//     await waitForElement(() => getByText(container,"Archie Cohen"));
//     // 3. Click the "Edit" button on that same element

//     const appointment = getAllByTestId(container, "appointment").find(
//       appointment => queryByText(appointment, "Archie Cohen")
//     )

//     fireEvent.click(queryByAltText(appointment, "Edit"));

//     // 4. Render the element Form 
//     await waitForElement(() => getByTestId(container, "student-name-input"));  
//     // 5. Enter the name "new name" into the input with the placeholder "Enter Student Name".
//     fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/),
//     { target: { value: "Lydia Miller-Jones" } }
//     );
  
//     // 6. Click the first interviewer in the list.
//     fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

//     // 7. Click the "Save" button on that same appointment.
//     fireEvent.click(getByText(appointment, "Save"))

//     // 8. Check that the element with the text "Saving" is displayed.
//     expect(getByText(appointment, "SAVING")).toBeInTheDocument();

//     // 9. Wait until the element with the text "Lydia Miller_Jones" is displayed.
//     await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

//     // 10. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
//     const day = getAllByTestId(container, "day").find(day =>
//       queryByText(day, "Monday")
//     );
  
//     expect(getByText(day, "no spots remaining")).toBeInTheDocument();
//   })

  
//   it("shows the save error when failing to save an appointment", async () => {
//     axios.put.mockRejectedValueOnce();
//     // 1. Render the Application.
//     const { container, debug } = render(<Application />);
//     // console.log('hello', prettyDOM(container);
//     // 2. Wait until the text "Archie Cohen" is displayed.
//     await waitForElement(() => getByText(container,"Archie Cohen"))
//     const appointment = getAllByTestId(container, "appointment")[0];
//     // 3. Click the "Add" button on the first empty appointment.
//     fireEvent.click(getByAltText(appointment, "Add"));
//     // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
//     fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/),
//       { target: { value: "Lydia Miller-Jones" } }
//     );
    
//     // // 5. Click the first interviewer in the list.
//     fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
//     // // 6. Click the "Save" button on that same appointment.
//     fireEvent.click(getByText(appointment, "Save"))
    
//     // // 7. Check that the element with the text "Saving" is displayed.
//     expect(getByText(appointment, "SAVING")).toBeInTheDocument();
//     expect(getAllByTestId(appointment, "Error")).toBeInTheDocument();
    
//     // // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
//     expect(getAllByTestId(appointment, "Error")).toBeInTheDocument();
//     debug(prettyDOM(appointment))
//     // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
//     // const day = getAllByTestId(container, "day").find(day =>
//     //   queryByText(day, "Monday")
//     // );
  
//     // expect(getByText(day, "no spots remaining")).toBeInTheDocument();
//   })


//   it("shows the delete error when failing to delete an existing appointment", async () => {

//   })
});


