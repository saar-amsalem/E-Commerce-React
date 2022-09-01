import iconStore from "../img/icon.jpg";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import "./Css/Navbar.css";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;
const Image = styled.img`
  ${"" /* display: flex; */}
  padding: 10px 10px;
  margin-right: 100px;
  ${mobile({ padding: "0px" })}
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
  marginleft: 50px;
  text-align: center;
  ${"" /* justifycontent: center; */}
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>MMJBS dev team</Logo>
        <Desc>In our store you can find everything you always wanted !</Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <a href="../">Home</a>
          </ListItem>
          <ListItem>
            <a href="../cart">Cart</a>
          </ListItem>
          {/* <ListItem>
            <a href="./products/man">Man Fashion</a>
          </ListItem> */}
          <ListItem>
            <a href="./products/women">Woman Fashion</a>
          </ListItem>
          <ListItem>
            <a href="./products/jeans">Our amazing jeans</a>
          </ListItem>
          <ListItem>
            <a href="./products/men">Men fashion</a>
          </ListItem>
          <ListItem>
            <a href="/chat">Live Chat</a>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Elie Wiesel St 2, Rishon
          LeTsiyon
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +972 3 977 31 43
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />{" "}
          <a href="mailto:approjectcolman@gmail.com">
            approjectcolman@gmail.com
          </a>
        </ContactItem>

        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
      <Image src={iconStore} alt="logo" />
    </Container>
  );
};

export default Footer;
