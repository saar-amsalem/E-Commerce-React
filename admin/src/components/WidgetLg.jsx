import React, { useEffect, useState } from "react";
import { getFiveNewOrders } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import styled from 'styled-components';

const WidgetLgContainer = styled.div`
  flex: 2;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
`;

const WidgetLgTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
`;

const WidgetLgTable = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const WidgetLgTh = styled.th`
  text-align: left;
`;

const WidgetLgUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const WidgetLgImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const WidgetLgDate = styled.td`
  font-weight: 300;
`;

const WidgetLgAmount = styled.td`
  font-weight: 300;
`;

const WidgetLgButton = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;

  &.approved {
    background-color: #e5faf2;
    color: #3bb077;
  }

  &.declined {
    background-color: #fff0f1;
    color: #d95087;
  }

  &.pending {
    background-color: #ebf1fe;
    color: #2a7ade;
  }
`;

const WidgetLgTr = styled.tr``;
const WidgetLgTd = styled.td``;
const WidgetLgTbody = styled.tbody``;
const WidgetLgSpan = styled.span``;

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOr = async () => {
      const res = await getFiveNewOrders();
      if (res.err) {
        alert(res.message);
        return;
      }
      setOrders(res.body);
    };
    getOr();
  }, []);


  return (
    <WidgetLgContainer>
      <WidgetLgTitle>Latest transactions</WidgetLgTitle>
      <WidgetLgTable>
        <WidgetLgTbody>
          <WidgetLgTr>
            <WidgetLgTh>Customer</WidgetLgTh>
            <WidgetLgTh>Date</WidgetLgTh>
            <WidgetLgTh>Amount</WidgetLgTh>
            <WidgetLgTh>Status</WidgetLgTh>
          </WidgetLgTr>
          {orders.map((order) => (
            <WidgetLgTr key={order._id}>
              <WidgetLgUser>
                <Link to={"/user/" + order.userId}>
                  <WidgetLgImg src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" alt="User" />
                  <WidgetLgSpan>{order.userId}</WidgetLgSpan>
                </Link>
              </WidgetLgUser>
              <WidgetLgDate>{format(order.createdAt)}</WidgetLgDate>
              <WidgetLgAmount>${order.amount}</WidgetLgAmount>
              <WidgetLgTd>
                <WidgetLgButton>{order.status}</WidgetLgButton>
              </WidgetLgTd>
            </WidgetLgTr>
          ))}
        </WidgetLgTbody>
      </WidgetLgTable>
    </WidgetLgContainer>
  );
}
