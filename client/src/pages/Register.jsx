import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {useDispatch} from "react-redux"
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";

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

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [username,setUser] = useState('')
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const [cpass,setCpass] = useState('')
  const [err,setErr] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  
  const registerHandler = async(e) =>{
      e.preventDefault();
      if(pass===cpass) {
        const user = {
          username: username,
          email: email,
          password: pass,
        }
        const response = await register(dispatch, user)
        if (response.status === 409) {
          const message = `${response.body.duplicatedField} ${response.body.duplicatedValue} is Already Exists !`
          setErr(message)
          return
        }
        if (response.status === 500) {
          const message = `Something Went Wrong !`
          setErr(message)
          return
        }
        history.push("/")
      }
      else{
        setErr('passwords are not the same, please try again');
      }
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
          {err && <Error>{err}</Error>}
          <Button onClick={registerHandler}>CREATE</Button>
          
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
