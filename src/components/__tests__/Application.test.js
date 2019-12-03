import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import axios from "../../__mocks__/axios";

import Application from "components/Application";

describe('Test', () => {

  // beforeEach(() => {
  //   axios.defaults.baseURL = "http://localhost:8001"
  //   jest.mock('axios', () => require("../../__mocks__/axios"));
  // });

  afterEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected without crashing", () => {
    const { getByText } = render(<Application />);
    waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

});



