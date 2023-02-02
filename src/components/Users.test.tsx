import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createTestStore } from "../testStore";
import Users from "./Users";

describe("<Users/>", () => {
  let store;
  let props;

  beforeEach(() => {
    const storeUsers = () => ({
      userList: [
        { id: 1, name: "Lionel Messi" },
        { id: 2, name: "Cristiano Ronaldo" },
        { id: 3, name: "Thierry Henry" },
        { id: 4, name: "Martin Ødegaard" },
        { id: 5, name: "Tony Adams" },
        { id: 6, name: "Cesc Fabregas" },
        { id: 7, name: "Kylian Mbappe" },
        { id: 8, name: "Harry Kane" },
        { id: 9, name: "Kevin De Bruyne" },
        { id: 10, name: "Mohammed Salah" },
        { id: 11, name: "Kai Havertz" },
      ],
    });

    store = createTestStore({ users: storeUsers });

    props = {
      limit: 10,
      getUsersStart: jest.fn(),
    };

    jest.spyOn(React, "useEffect").mockImplementation((cb) => cb());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render the full list of available users", async () => {
    // given
    render(
      <Provider store={store}>
        <Users {...props} />
      </Provider>
    );

    // then
    const usersWrapper = screen.getByTestId("users-wrapper");
    const usersList = screen.getByTestId("users-list");
    const user = await screen.findAllByTestId("user");

    expect(usersWrapper).toMatchSnapshot();
    expect(usersList).toBeInTheDocument();
    expect(user).toHaveLength(10);
  });

  it("should render only 5 users from the list", async () => {
    // given
    render(
      <Provider store={store}>
        <Users {...props} limit={5} />
      </Provider>
    );

    // then
    const usersWrapper = screen.getByTestId("users-wrapper");
    const usersList = screen.getByTestId("users-list");
    const user = await screen.findAllByTestId("user");

    expect(usersWrapper).toMatchSnapshot();
    expect(usersList).toBeInTheDocument();
    expect(user).toHaveLength(5);
  });

  // TODO - Mocked dispatch function not reflected as a mock jest function during component test run. May need to think about mocking the store using redux-mock-store 🤔
  it.skip("should have called store dispatch function props.getUsersStart() on intiialisation", () => {
    // given
    render(
      <Provider store={store}>
        <Users {...props} />
      </Provider>
    );

    // then
    console.log("TEST props.getUsersStart()", props.getUsersStart);
    expect(props.getUsersStart).toHaveBeenCalled();
  });
});
