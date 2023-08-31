import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { updateUserInDB } from "../redux/apiCalls";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const User = styled.div`
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

const UserContainer = styled.div`
    display: flex;
    margin-top: 20px;
`;

const UserUpdate = styled.div`
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`;

const UserShowTop = styled.div`
    display: flex;  
    align-items: center;
`

const UserShowImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`

const UserShow = styled.div`
flex: 1;
padding: 20px;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const UserShowUsername = styled.div`
    font-weight: 600;
`

const UserShowUserTitle = styled.div`
    font-weight: 300;
`

const UserShowBottom = styled.div`
    margin-top: 20px;
`

const UserShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`
const UserShowInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0px;
    color: #444;
`

const UserShowInfoTitle = styled.div`
    margin-left: 10px;
`

const UserUpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`

const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`

const UserUpdateItemLabel = styled.div`
    margin-bottom: 5px;
    font-size: 14px;
`

const UserUpdateInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`

const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const UserUpdateUpload = styled.div`
    display: flex;
    align-items: center;
`

const UserUpdateImg = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`

const UserUpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: darkblue;
    color: white;
    font-weight: 600;
`
  
  export default function Myaccount() {

    const user = useSelector((state) => state.user.currentUser)
    const [userToUpdate, setUserToUpdate] = useState({})
    const dispatch = useDispatch()
  
    const clickHandler = async (e)=> {
      e.preventDefault();
      console.log(user._id);
      const updatedUser = await updateUserInDB(dispatch, user._id ,userToUpdate)
      if (updatedUser.err) {
        alert(updatedUser.message)
        return
      }
      console.log(updatedUser);
      alert("Updated Successfully !")
    }
  
  
    return (
      <User>
        <UserTitleContainer>
            Edit User
        </UserTitleContainer>
        <UserContainer>
          <UserShow>
            <UserShowTop>
              <UserShowImg
                src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                alt=""
                className="userShowImg"
              />
              <UserShowTitle>
                <UserShowUsername>{user?.username}</UserShowUsername>
                <UserShowUserTitle>Software Engineer</UserShowUserTitle>
              </UserShowTitle>
            </UserShowTop>
            <UserShowBottom>
              <UserShowTitle>Account Details</UserShowTitle>
              <UserShowInfo>
                <PermIdentity className="userShowIcon" />
                <UserShowInfoTitle>{user?.username}</UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                <CalendarToday className="userShowIcon" />
                <UserShowInfoTitle>08.10.1995</UserShowInfoTitle>
              </UserShowInfo>
              <UserShowTitle>Contact Details</UserShowTitle>
              <UserShowInfo>
                <PhoneAndroid className="userShowIcon" />
                <UserShowInfoTitle>+972 547551128</UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                <MailOutline className="userShowIcon" />
                <UserShowInfoTitle>{user?.email}</UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                <LocationSearching className="userShowIcon" />
                <UserShowInfoTitle>Rishon le Tzion | ISRAEL</UserShowInfoTitle>
              </UserShowInfo>
            </UserShowBottom>
          </UserShow>
          <UserUpdate>
            <UserUpdateTitle>Edit</UserUpdateTitle>
            <UserUpdateForm>
              <div className="userUpdateLeft">
                <UserUpdateItem>
                  <UserUpdateItemLabel>Username</UserUpdateItemLabel>
                  <UserUpdateInput
                    type="text"
                    placeholder={user?.username}
                    className="userUpdateInput"
                    onChange={(e)=>{setUserToUpdate({...userToUpdate,username:e.target.value})}}
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Email</UserUpdateItemLabel>
                  <UserUpdateInput
                    type="text"
                    placeholder={user?.email}
                    className="userUpdateInput"
                    onChange={(e)=>{setUserToUpdate({...userToUpdate,email:e.target.value})}}
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Password</UserUpdateItemLabel>
                  <UserUpdateInput
                    type="password"
                    placeholder="Password"
                    className="userUpdateInput"
                    onChange={(e)=>{setUserToUpdate({...userToUpdate,password:e.target.value})}}
                  />
                </UserUpdateItem>
              </div>
              <UserUpdateRight>
                <UserUpdateUpload>
                  <UserUpdateImg
                    className="userUpdateImg"
                    src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    alt=""
                  />
                </UserUpdateUpload>
                <UserUpdateButton onClick={clickHandler}>Update</UserUpdateButton>
              </UserUpdateRight>
            </UserUpdateForm>
          </UserUpdate>
        </UserContainer>
      </User>
    );
  }
  