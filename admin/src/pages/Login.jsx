import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../redux/apiCalls";
import styled from "styled-components";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  padding: 10px;
  width: 100px;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr] = useState("")
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async(e) => {
    e.preventDefault();
    const res = await login(dispatch, { username, password });
    if (res.err) {
      setErr(res.body)
      return
    }
    history.push("/");
  };

  return (
    <LoginContainer>
      <StyledInput
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledButton onClick={handleClick}>Login</StyledButton>
      { err && <Error>{err}</Error> }
    </LoginContainer>
  );
};

export default Login;
