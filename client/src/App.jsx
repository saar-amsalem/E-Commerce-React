import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Myaccount from "./pages/Myaccount";
import Wishlist from "./pages/Wishlist";
import ChatApp from "./components/ChatApp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {

  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/chat">
          <ChatApp />
        </Route>
        <Route path="/products">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/wishlist">
          <Wishlist />
        </Route>
        <Route path="/myaccount">
          {user ? <Myaccount /> : <Redirect to="/login" /> }
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
