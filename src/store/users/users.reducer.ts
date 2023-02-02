import { GET_USERS } from "./users.constants";

const INITIAL_STATE = {
  userList: [],
};

export default function users(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_USERS:
      return setUsers(state, payload);

    default:
      return state;
  }
}

/**
 ************** Reducer functuons **************
 */
const setUsers = (state, payload) => ({
  ...state,
  userList: payload?.users || [],
});
