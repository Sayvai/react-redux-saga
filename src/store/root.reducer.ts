import { combineReducers } from "redux";
import users from "./users/users.reducer";

const reducers = {
  users,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
