import { GET_USERS, GET_USERS_START } from "./users.constants";

export const getUsersStart = () => ({
  type: GET_USERS_START,
});

export const getUsers = (payload) => ({
  type: GET_USERS,
  payload,
});
