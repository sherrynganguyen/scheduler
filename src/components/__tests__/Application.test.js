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
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container,"Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/),
      { target: { value: 'Lydia Miller-Jones' } }
    );
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones")); // this doesnt pass the test due to the WebSocket API

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

});


