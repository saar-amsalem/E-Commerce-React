import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import {Avatar} from "@material-ui/core";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import ClipLoader from "react-spinners/ClipLoader";
import icon from "../img/icon.jpg";

const Container = styled.div`
  background-color: #f0ffff;
  padding: 10px;
  text-align: center;
  width: 100%;
  position: sticky;
  top: 0px;
  overflow: hidden;
  z-index: 3;

  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  display: flex;
  padding: 0px 10px;
  ${mobile({ padding: "0px" })}
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Link = styled.a`
  text-decoration: none;
  &:visited {
    color: black;
  }
`;


const Navbar = () => {
  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const { currentUser, isFetching }= useSelector((state) => state.user);
  const quantity = useSelector((state) => state.cart.quantity);
  const history = useHistory()

  const onClicklogout = async() => {
    const res = await logout(dispatch, products, currentUser._id);
    if (res.err) {
      alert(res.message)
      return
    }
    alert("logged out successfully !");
    history.push("/");
  };

  return (
    <>
    <Container>
      {/* <Sidebar /> */}
      <Wrapper>
        <Left>
          <Image src={icon} alt="logo" />
          <Language>EN</Language>
        </Left>
        <Center>
          <Link href="/">
            <Logo>MMJBS Team</Logo>
          </Link>
        </Center>
        <Right>
        {currentUser?.isAdmin &&<MenuItem>
              <Link href="http://localhost:3001">
                Admin Dashboard
              </Link>
            </MenuItem>}
          {currentUser ? (
            <MenuItem />
          ) : (
            <MenuItem>
              <Link href="/register">
                REGISTER
              </Link>
            </MenuItem>
          )}
          {currentUser ? (
            <MenuItem />
          ) : (
            <MenuItem>
              <Link href="/login" >
                SIGN IN
              </Link>
            </MenuItem>
          )}
          {!currentUser ? (
            <MenuItem />
          ) : (
            isFetching ? 
            <ClipLoader loading={true}/>
            :
            <MenuItem onClick={onClicklogout}>LOGOUT</MenuItem>
          )}
          {currentUser ? (
            <>
              <Link href="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
              <Link href="/myaccount">
              <MenuItem>
                <Avatar src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" />
              </MenuItem>
            </Link>
          </>
          ) : (
            <MenuItem>
              <Badge color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          )}
        </Right>
      </Wrapper>
    </Container>
    </>
  );
};

export default Navbar;