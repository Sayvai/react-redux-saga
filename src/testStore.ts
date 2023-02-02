import { createStore, combineReducers } from "redux";
import users from "./store/users/users.reducer";

export const createTestStore = (mockStoreData = {}) => {
  const store = createStore(
    combineReducers({
      users: () => ({ userList: [{ id: 1, name: "Lionel Messi" }] }),
      ...mockStoreData,
    })
  );
  return store;
};
