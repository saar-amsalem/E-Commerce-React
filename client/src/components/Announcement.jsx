import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #7fffd4;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 1000;
`;

const Announcement = () => {
  return <Container>WOW WOW WOW Free Shipping on Orders Over $45</Container>;
};

export default Announcement;
