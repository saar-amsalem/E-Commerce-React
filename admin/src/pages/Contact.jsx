import {
  Facebook,
  MailOutlineOutlined
} from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { data } from "../dummyData";

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
  font-size: 16px !important;
`;

const UserShowInfoTitle = styled.div`
  margin-left: 10px;
`;

const UserUpdateTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const UserUpdateForm = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const UserUpdateLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
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

const UserUpdateIcon = styled.div`
  cursor: pointer;
`;

const UserUpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  text-decoration: none;
`;

export default function Contact() {
  const [message, setMessage] = useState("");
  const history = useHistory();

  const postHandler = async () => {
    const res = await axios.post(
      "https://graph.facebook.com/" +
        data.page_id +
        "/feed?message=" +
        message +
        "&access_token=" +
        data.accessToken
    );
    console.log(res.data);
    if (res.data && res.status === 200) {
      alert("Successfully posted!");
      window.location.reload(false);
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <User>
      <UserTitleContainer>
        <h1 className="userTitle">Audience Management</h1>
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <Facebook fontSize="large" />
            <UserShowTopTitle>
              <UserShowUsername>E-Shop</UserShowUsername>
              <UserShowUserTitle>
                Post discounts to E-Shop facebook page
              </UserShowUserTitle>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowTitle>Your Post</UserShowTitle>
            <textarea onChange={(e) => setMessage(e.target.value)} />
            <UserUpdateButton onClick={postHandler}>Post !</UserUpdateButton>
            <a
              href="https://www.facebook.com/E-Shop-112462398230877/?ref=page_internal"
              className="userUpdateButton"
            >
              Go to The Shop's Page
            </a>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <MailOutlineOutlined fontSize="large" />
          <UserUpdateTitle>Send Email to Your Subscribers !</UserUpdateTitle>
          <UserUpdateTitle>Inform them about your Sales...</UserUpdateTitle>
          <UserUpdateButton>Send</UserUpdateButton>
        </UserUpdate>
      </UserContainer>
    </User>
  );
}
