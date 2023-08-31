import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "./App.css";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import OrderList from "./pages/OrderList";
import Login from "./pages/Login";
import History from "./pages/History";
import { useSelector } from "react-redux";
import Contact from "./pages/Contact"
import Order from "./pages/Order"
import Analytics from "./pages/Analytics"
import Sales from "./pages/Sales";

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
                <Home /> {/* V */}
              </Route>
              <Route path="/users">
                <UserList /> {/* V */}
              </Route>
              <Route path="/user/:userId">
                <User /> 
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList /> {/* V */}
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/orders">
                <OrderList /> {/* V */}
              </Route>
              <Route path="/order/:orderId">
                <Order />
              </Route>
              <Route path="/history">
                <History /> {/* V */}
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/sales">
                <Sales /> {/* V */}
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
