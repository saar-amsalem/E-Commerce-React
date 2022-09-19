import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect,useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getUserByID,updateUser } from "../../redux/apiCalls";
import "./user.css";

export default function User() {
  const [user,setUser] = useState();
  const params = useParams();
  const history = useHistory();

  useEffect(()=>{
    console.log(params);
    const getUSR = async() => {
      const res = await getUserByID(params.userId);
      setUser(res);
    }
    console.log(user);
    getUSR();
  },[])

  const clickHandler = (e)=> {
    //to implement update user in DB
    e.preventDefault();
    updateUser(params.userId,user)
    alert("Updated Successfully !")
    history.push("/users")
  }


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create New</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">08.10.1995</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+972 547551128</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Rishon le Tzion | ISRAEL</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user?.username}
                  className="userUpdateInput"
                  onChange={(e)=>{setUser({...user,username:e.target.value})}}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user?.email}
                  className="userUpdateInput"
                  onChange={(e)=>{setUser({...user,email:e.target.value})}}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="userUpdateInput"
                  onChange={(e)=>{setUser({...user,password:e.target.value})}}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  alt=""
                />
              </div>
              <button className="userUpdateButton" onClick={clickHandler}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
