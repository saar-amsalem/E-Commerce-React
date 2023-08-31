import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../redux/apiCalls";
import styled from "styled-components";

const NewUserContainer = styled.div`
  flex: 4;
`;

const NewUserTitle = styled.h1`
  font-size: 24px;
`;

const NewUserForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const NewUserItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;

const NewUserLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;

const NewUserInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const NewUserButton = styled.button`
  width: 200px;
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
`;

export default function NewUser() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const history = useHistory();

  const clickHandler = (e) => {
    e.preventDefault();
    createUser(user);
    history.push("/users");
  };

  return (
    <NewUserContainer>
      <NewUserTitle>New User</NewUserTitle>
      <NewUserForm>
        <NewUserItem>
          <NewUserLabel>Username</NewUserLabel>
          <NewUserInput
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
        </NewUserItem>
        <NewUserItem>
          <NewUserLabel>Email</NewUserLabel>
          <NewUserInput
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </NewUserItem>
        <NewUserItem>
          <NewUserLabel>Password</NewUserLabel>
          <NewUserInput
            type="password"
            placeholder="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </NewUserItem>
        <NewUserButton onClick={clickHandler}>Create</NewUserButton>
      </NewUserForm>
    </NewUserContainer>
  );
}
