import { useEffect, useState } from "react";
import { getFiveNewOrders } from "../../redux/apiCalls";
import "./widgetLg.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOr = async () => {
      const res = await getFiveNewOrders();
      console.log(res);
      setOrders(res);
    };
    getOr();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <Link
                  to={"/user/" + order.userId}
                  style={{ "text-decoration": "none", color: "inherit" }}
                >
                  <span className="widgetLgName">{order.userId}</span>
                </Link>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
