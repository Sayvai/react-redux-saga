import { createSelector } from "reselect";

const selectUsersState = (state) => state.users;

const selectGetUsersData = createSelector(
  selectUsersState,
  (state) => state.userList
);

export { selectGetUsersData, selectUsersState };
