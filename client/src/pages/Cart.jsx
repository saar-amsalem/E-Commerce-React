import { useEffect, useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { removeProduct, addProductCartPage } from "../redux/cartRedux";
import { clearCartData, getRecommendedProducts, pay } from "../redux/apiCalls";
import { Popup } from "reactjs-popup";
import "../components/Css/popupcart.css";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 70%;
  margin: 5px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const ModalClose = styled.button`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  font-size: 24px;
  background: #000;
  border-radius: 18px;
  border: 1px solid #cfcece;
`;

const Modal = styled.div`
  font-size: 12px;
`;

const ModalHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  font-size: 18px;
  text-align: center;
  padding: 5px;
`;

const ModalContent = styled.div`
  width: 100%;
  padding: 10px 5px;
`;

const ModalActions = styled.div`
  width: 100%;
  padding: 10px 5px;
  margin: auto;
  text-align: center;
`;

const LineSpace = styled.br``;

const ProductsTitle = styled.span`
    font-weight: bold;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const history = useHistory();
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();

  const onToken = async(token) => {
    const paymentResponse = await pay(token.id,cart.total)
    console.log(paymentResponse);
    if (paymentResponse.err) {
      alert(paymentResponse.message)
      return
    }
    history.push("/success", {
      stripeData: paymentResponse.body,
    });
  };

  useEffect(() => {
    const fetch = async () => {
        const categoriesPicksCounter = {}
        cart.products.map(product => {
          product.categories.map(category => {
            categoriesPicksCounter[category] = product.quantity
          })
        })
        console.log(categoriesPicksCounter);
        const topPickedCategory = Object.entries(categoriesPicksCounter).reduce(
          (max, [category, count]) => (count > max.count ? { category, count } : max),
          { category: "", count: -1 }
        ).category;
        
        const recommendedProductsResponse = await getRecommendedProducts(topPickedCategory)
        
        if (recommendedProductsResponse.err) {
          alert(recommendedProductsResponse.message)
          return
        }
        setSuggestedProducts(recommendedProductsResponse.body.filter(item => !cart.products.some(cartItem => cartItem._id === item._id)));      
    };
    fetch();
    return () => {}
  }, []);


  const clearHandler = () => {
    clearCartData(dispatch);
  };
  const removeHandler = (product) => {
    dispatch(removeProduct(product));
  };
  const addHandler = (product) => {
    dispatch(addProductCartPage(product));
  };
  const handleContinue = () => {
    history.push("/");
  };
  

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={handleContinue}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({quantity})</TopText>
            <TopText>
              <Link to="./wishlist">Your Wishlist (0)</Link> 
            </TopText>
          </TopTexts>
          <TopButton onClick={clearHandler}>CLEAR CART</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add
                      onClick={() => addHandler(product)}
                      style={{ cursor: "pointer" }}
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove
                      onClick={() => removeHandler(product)}
                      style={{ cursor: "pointer" }}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Popup
              trigger={
                <Button className="button" style={{"width": "100%"}}>
                  CHECKOUT NOW
                </Button>
              }
              modal
              nested
            >
              {(close) => (
                <Modal>
                  <ModalClose onClick={close}>
                    &times;
                  </ModalClose>
                  <ModalHeader>
                    Hold on ! don't miss out those products you might like
                  </ModalHeader>
                  <ModalContent>
                    {suggestedProducts?.map((product) => (
                      <Product key={product._id}>
                        <ProductDetail>
                          <Link to={"/product/" + product._id}>
                            <Image src={product.img} />
                          </Link>
                          <Details>
                            <ProductsTitle>
                              {product.title}
                            </ProductsTitle>
                          </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <ProductPrice>$ {product.price}</ProductPrice>
                        </PriceDetail>
                      </Product>
                    ))}
                    <LineSpace />
                    Just click on the item you like !
                  </ModalContent>
                  <ModalActions>
                    <Popup
                      trigger={
                        <StripeCheckout
                          name="A-TEAM Shop"
                          zipCode={false}
                          description={`Your total is $${cart.total}`}
                          amount={cart.total * 100}
                          shippingAddress
                          token={onToken}
                          key={process.env.REACT_APP_STRIPE}
                          stripeKey={process.env.REACT_APP_STRIPE}
                        >
                          <Button className="button">
                            Continue to payment
                          </Button>
                        </StripeCheckout>
                      }
                      position="top center"
                      nested
                    />
                    <Button
                      className="button"
                      onClick={() => {
                        close();
                      }}
                    >
                      Not yet...
                    </Button>
                  </ModalActions>
                </Modal>
              )}
            </Popup>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
