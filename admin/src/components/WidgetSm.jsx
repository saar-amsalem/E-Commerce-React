import React, { useEffect, useState } from "react";
import { getFiveNewUsers } from "../redux/apiCalls";
import { Visibility } from "@material-ui/icons";
import styled from 'styled-components';

// Styled components
const WidgetSmContainer = styled.div`
  flex: 1;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
  margin-right: 20px;
`;

const WidgetSmTitle = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const WidgetSmImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const WidgetSmList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const WidgetSmListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
`;

const WidgetSmUser = styled.div`
  display: flex;
  flex-direction: column;
`;

const WidgetSmUsername = styled.span`
  font-weight: 600;
`;

const WidgetSmButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;
`;

const WidgetSmIcon = styled(Visibility)`
  font-size: 16px !important;
  margin-right: 5px;
`;

const WidgetSmLink = styled.a`
  text-decoration: none;
  &:visited {
    color: black;
  }
`;

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const fiveNewUsersResponse = await getFiveNewUsers();
      if (fiveNewUsersResponse.status === 499) {
        alert("Invalid Token, please try to reconnect !")
        return
      }
      if (fiveNewUsersResponse.status === 404) {
        alert("no users found !")
        return
      }
      if (fiveNewUsersResponse.status !== 200) {
        alert("An unexpected error occured, please try again !")
        return
      }
      setUsers(fiveNewUsersResponse.body);
    };
    getUsers();
  }, []);

  return (
    <WidgetSmContainer>
      <WidgetSmTitle>New Join Members</WidgetSmTitle>
      <WidgetSmList>
        {users.map((user) => (
          <WidgetSmListItem key={user._id}>
            <WidgetSmImg
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
            />
            <WidgetSmUser>
              <WidgetSmUsername>{user.username}</WidgetSmUsername>
            </WidgetSmUser>
            <WidgetSmLink href={"/user/" + user._id}>
              <WidgetSmButton>
                <WidgetSmIcon />
                Display
              </WidgetSmButton>
            </WidgetSmLink>
          </WidgetSmListItem>
        ))}
      </WidgetSmList>
    </WidgetSmContainer>
  );
}
