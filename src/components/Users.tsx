import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsersStart as getUsersStartAction } from "../store/users/users.actions";
import { selectGetUsersData } from "../store/users/users.selectors";
import { User } from "../store/users/users.types";
import styled from "styled-components";

interface IUsers {
  users: User[];
  limit?: number;
  getUsersStart: () => void;
}

const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  gap: 2em;
  list-style-type: none;
`;

Ul.displayName = "UL";

const Li = styled.li`
  background: #ffe5e5;
  color: darkred;
`;

Li.displayName = "LI";

const Users: React.FC<IUsers> = ({ users, limit = 0, getUsersStart }) => {
  useEffect(() => {
    getUsersStart();
  }, [getUsersStart]);

  const renderUsers = () => {
    const renderLimit = limit === 0 ? users.length : limit;
    const renderableUserList = users.slice(0, renderLimit);

    return renderableUserList.map((user) => (
      <Li aria-label={user.name} data-testid="user" key={user.id}>
        {user.name}
      </Li>
    ));
  };

  return (
    <div data-testid="users-wrapper">
      <h1>List of users (max limit: {limit}):</h1>
      {users.length > 0 && (
        <Ul aria-label="users list" data-testid="users-list">
          {renderUsers()}
        </Ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: selectGetUsersData(state),
});

const actionCreators = {
  getUsersStart: getUsersStartAction,
};

export default React.memo(connect(mapStateToProps, actionCreators)(Users));
