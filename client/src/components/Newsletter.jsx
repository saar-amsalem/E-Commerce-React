import styled from "styled-components";
import { mobile } from "../responsive";
import "./Css/Newsletter.css";
import GoogleMapsMigrated from "./GoogleMapsMigrated";

const BigContainer = styled.div`
  display: flex;
  background-color: #fcf5f5;
`;

const GoogleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 20px;
  ${mobile({ height: "50vh" })}
  margin-left: 400px;
  margin-top: 90px;
`;

const GoogleTitle = styled.h3`
  font-size: 30px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 70px;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const Newsletter = () => {
  return (
    <BigContainer>
      <Container>
        <Title>KEEP IN TOUCH</Title>
        <Desc>YOU WILL KNOW ALL THE SALES FIRST.</Desc>
      </Container>
      <GoogleContainer>
        <GoogleTitle>Find us on Google Maps</GoogleTitle>
        <GoogleMapsMigrated />
      </GoogleContainer>
    </BigContainer>
  );
};

export default Newsletter;
