
import { TextareaAutosize } from "@material-ui/core";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
    Facebook,
    MailOutlineOutlined
  } from "@material-ui/icons";
  import { useEffect,useState } from "react";
  import { Link, useHistory, useParams } from "react-router-dom";
  import axios from "axios"
  import "./contact.css";
  import {data} from "../../dummyData"
  import {store} from "../../redux/store"




  export default function Contact() {
    
    const [message,setMessage] = useState('');
    const history = useHistory()

    const postHandler = async() => {
        
        const res = await axios.post("https://graph.facebook.com/"+data.page_id+"/feed?message="+message+"&access_token="+data.accessToken)
        console.log(res.data);
        if(res.data && res.status === 200)
        {
            alert("Successfully posted !")
            window.location.reload(false)
        }
        else {
            alert("Something went wrong !")
        }
    } 
    const emailHandler = async(e) => {
        e.preventDefault()
          const res = await axios.post("http://localhost:3030/api/users/email")
          console.log(res.data);
          //window.location.reload(false)
        }

  
    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Audience Management</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <Facebook fontSize="large"/>
              <div className="userShowTopTitle">
                <span className="userShowUsername">E-Shop</span>
                <span className="userShowUserTitle">Post discounts to E-Shop facebook page</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Your Post</span>
              <br />
              <textarea onChange={(e)=>setMessage(e.target.value)}/>
              <br></br>
              <button className="userUpdateButton" onClick={postHandler}>Post !</button>
              <br />
              <br />
              <a href="https://www.facebook.com/E-Shop-112462398230877/?ref=page_internal" className="userUpdateButton">Go to The Shop's Page</a>
            </div>
          </div>
          <div className="userUpdate">
          <MailOutlineOutlined fontSize="large"/>
            <span className="userUpdateTitle">  Send Email to Your Subscribers !</span>
            <br />
            <span className="userUpdateTitle">  Inform them about your Sales...</span>
                <br />
                <br />
                <button className="userUpdateButton" onClick={emailHandler}>Send</button>
             
          </div>
        </div>
      </div>
    );
  }
  