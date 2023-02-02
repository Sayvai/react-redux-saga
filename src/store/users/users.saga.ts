import { call, put, takeEvery } from "redux-saga/effects";
import { getUsers } from "./users.actions";
import { fetchUsers } from "./users.api";

import { GET_USERS_START } from "./users.constants";

export function* getUsersList() {
  try {
    const response = yield call(
      fetchUsers,
      "https://jsonplaceholder.typicode.com/users"
    );

    yield put(getUsers({ users: response }));
  } catch (err) {
    console.error("Error fetching list of users", err);
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS_START, getUsersList);
}

export default usersSaga;
