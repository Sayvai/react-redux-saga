import { takeEvery } from "redux-saga/effects";
import usersSaga, { getUsersList } from "./users.saga";
import usersApi from "./users.api";
import { runSaga } from "redux-saga";

jest.mock("./users.api");

describe("users.saga.ts", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("* usersSaga", () => {
    const generatorObject = usersSaga();

    it("should wait for every GET_USERS_START action type, and call getUsersList", () => {
      // when
      const result = generatorObject.next();

      // then
      expect(result.value).toEqual(takeEvery("GET_USERS_START", getUsersList));
      expect(result.done).toBeFalsy();
    });

    it("should be done on next generator iteration", () => {
      // when
      const result = generatorObject.next();

      // then
      expect(result.value).toBeUndefined();
      expect(result.done).toBeTruthy();
    });
  });

  describe("* getUsersList", () => {
    it("should call api and dispatch to getUsers (success) action", async () => {
      // given
      const mockJsonResponse = [
        { id: 1, name: "Aaron Ramsdale" },
        { id: 2, name: "Ben White" },
      ];

      jest.spyOn(usersApi, "fetchUsers").mockResolvedValue(mockJsonResponse);

      // when
      const dispatched: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        getUsersList as any,
        undefined
      ).toPromise();

      // then
      expect(usersApi.fetchUsers).toHaveBeenCalledTimes(1);

      expect(dispatched).toEqual([
        {
          type: "GET_USERS",
          payload: { users: mockJsonResponse },
        },
      ]);
    });

    it("should call api, but fail with call to console.error", async () => {
      // given
      const err = "bad robot";
      jest.spyOn(usersApi, "fetchUsers").mockRejectedValue(err);
      jest.spyOn(console, "error");

      // when
      const dispatched: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        getUsersList as any,
        undefined
      ).toPromise();

      // then
      expect(usersApi.fetchUsers).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching list of users",
        "bad robot"
      );
    });
  });
});
