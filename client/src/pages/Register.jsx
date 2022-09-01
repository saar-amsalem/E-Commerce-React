import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {useDispatch} from "react-redux"
import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";
const axios = require("axios")

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username,setUser] = useState('')
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const [cpass,setCpass] = useState('')
  const [err,setErr] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch()
  const registerHandler = async(e) =>{
      e.preventDefault();
      if(pass===cpass){
      try {
        await axios.post("http://localhost:3030/api/auth/register",
        {
          username: username,
          email: email,
          pass: pass,
        })
        alert("Registerd Successfully !")
      } catch (err) {
        console.log(err);
      }}
      else{
        setErr(true);
      }
      await login(dispatch, { username, pass });
      history.push("/")
    }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="username" onChange={(e)=>setUser(e.target.value)}/>
          <Input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
          <Input type="password" placeholder="password" onChange={(e)=>setPass(e.target.value)} />
          <Input type="password" placeholder="confirm password" onChange={(e)=>setCpass(e.target.value)}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={registerHandler}>CREATE</Button>
          {err && <span>passwords are not the same, please try again</span>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
