import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import OrderList from "./pages/orderList/OrderList";
import Login from "./pages/login/Login";
import History from "./pages/history/History";
import { useSelector } from "react-redux";
import Contact from "./pages/contact/Contact"
import Order from "./pages/order/Order"
import Analytics from "./pages/analytics/Analytics"
import Sales from "./pages/sales/Sales";

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  console.log(admin);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {!admin && <Redirect to="/login"/>}
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/orders">
                <OrderList />
              </Route>
              <Route path="/order/:orderId">
                <Order />
              </Route>
              <Route path="/history">
                <History />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/sales">
                <Sales />
              </Route>
              <Route path="/analytics">
                <Analytics />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
