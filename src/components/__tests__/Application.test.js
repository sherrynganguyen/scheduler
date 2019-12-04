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
  queryByText
} from "@testing-library/react";

// import axios from "../../__mocks__/axios";

import Application from "components/Application";
import Appointment from "components/Appointment";
import DayListItem from "components/DayListItem";

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

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container,"Archie Cohen"))

    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/),
      { target: { value: 'Lydia Miller-Jones' } }
    );

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"))

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones")); // this doesnt pass the test due to the WebSocket API

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

  })


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

  })


  it("shows the save error when failing to save an appointment", async () => {

  })

  
  it("shows the delete error when failing to delete an existing appointment", async () => {

  })
});


