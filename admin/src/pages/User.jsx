import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { getUserByID, updateUser } from "../redux/apiCalls";

// Styled components
const UserContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
`;

const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const UserUpdate = styled.div`
  flex: 2;
  padding: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;

const UserShowImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserShowUsername = styled.span`
  font-weight: 600;
`;

const UserShowUserTitle = styled.span`
  font-weight: 300;
`;

const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;

const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;

const UserShowIcon = styled.div`
  font-size: 16px;
`;

const UserShowInfoTitle = styled.span`
  margin-left: 10px;
`;

const UserUpdateTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const UserUpdateForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const UserUpdateInput = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;

const UserUpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserUpdateUpload = styled.div`
  display: flex;
  align-items: center;
`;

const UserUpdateImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const UserUpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
`;

const UserLabel = styled.label``;

const User = () => {
  const [user, setUser] = useState();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const getUSR = async () => {
      const res = await getUserByID(params.userId);
      if (res.status === 499) {
        alert("Invalid token, please try to reconnect !")
        return
      }
      if (res.status === 404) {
        alert("No user found with this ID !")
        return
      }
      if (res.status !== 200) {
        alert("An unexpected error occured, please try again !")
        return
      }
      setUser(res.body);
    };
    getUSR();
  }, []);

  const clickHandler = async(e) => {
    e.preventDefault();
    const res = await updateUser(params.userId, user);
    if(res.status !== 200) {
      alert("An unexpected error occured, please try again !")
      return
    }
    alert("Updated Successfully !");
    history.push("/users");
  };

  return (
    <UserContainer>
      <UserTitleContainer>
        <UserShowUserTitle>Edit User</UserShowUserTitle>
        <Link to="/newUser">
          <UserAddButton>Create New</UserAddButton>
        </Link>
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserShowImg
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt=""
            />
            <UserShowTopTitle>
              <UserShowUsername>{user?.username}</UserShowUsername>
              <UserShowUserTitle>Software Engineer</UserShowUserTitle>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowTitle>Account Details</UserShowTitle>
            <UserShowInfo>
              <UserShowIcon><PermIdentity /></UserShowIcon>
              <UserShowInfoTitle>{user?.username}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <UserShowIcon><CalendarToday /></UserShowIcon>
              <UserShowInfoTitle>08.10.1995</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowTitle>Contact Details</UserShowTitle>
            <UserShowInfo>
              <UserShowIcon><PhoneAndroid /></UserShowIcon>
              <UserShowInfoTitle>+972 547551128</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <UserShowIcon><MailOutline /></UserShowIcon>
              <UserShowInfoTitle>{user?.email}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <UserShowIcon><LocationSearching /></UserShowIcon>
              <UserShowInfoTitle>Rishon le Tzion | ISRAEL</UserShowInfoTitle>
            </UserShowInfo>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>Edit</UserUpdateTitle>
          <UserUpdateForm>
              <UserUpdateItem>
                <UserLabel>Username</UserLabel>
                <UserUpdateInput
                  type="text"
                  placeholder={user?.username}
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                  }}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserLabel>Email</UserLabel>
                <UserUpdateInput
                  type="text"
                  placeholder={user?.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <UserLabel>Password</UserLabel>
                <UserUpdateInput
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
              </UserUpdateItem>
            <UserUpdateRight>
              <UserUpdateUpload>
                <UserUpdateImg
                  src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  alt=""
                />
              </UserUpdateUpload>
              <UserUpdateButton onClick={clickHandler}>Update</UserUpdateButton>
            </UserUpdateRight>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </UserContainer>
  );
};

export default User;
