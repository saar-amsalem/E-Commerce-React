import { useHistory } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../redux/apiCalls";
import "./newUser.css";

export default function NewUser() {
  const [user,setUser] = useState({
    username: '',
    email: '',
    password: ''
  })
  const history = useHistory()

  const clickHandler = (e) => {
    e.preventDefault();
    createUser(user)
    history.push("/users")
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="username" onChange={(e)=>{setUser({...user,username: e.target.value})}}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="example@gmail.com" onChange={(e)=>{setUser({...user,email: e.target.value})}}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" onChange={(e)=>{setUser({...user,password: e.target.value})}}/>
        </div>
        <button className="newUserButton" onClick={clickHandler}>Create</button>
      </form>
    </div>
  );
}
