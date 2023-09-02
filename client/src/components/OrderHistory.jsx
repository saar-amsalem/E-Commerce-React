import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { getOrdersForUser } from "../redux/apiCalls";
import styled from "styled-components";
import { useSelector } from "react-redux";

const OrderListContainer = styled.div`
  flex: 4;
`;

const OrderListItem = styled.div`
  display: flex;
  align-items: center;
`;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("reFetching orders !");
      const res = await getOrdersForUser(currentUser._id);
      console.log(res);
      if (res.status === 499) {
        alert("Invalid Token, please try to reconnect !")
        return
      }
      if (res.status === 404) {
        console.log(res);
        alert("no orders found !")
        return
      }
      if (res.status !== 200) {
        alert("An unexpected error occured, please try again !")
        return
      }
      const parsedOrders = res.body.map(order => ({
        ...order,
        address: `${order.address.line1}, ${order.address.city}, ${order.address.country}`,
        products: order.products.map(item => `${item.productId},`)
      }))
      setOrders(parsedOrders);
    };
    fetchOrders();
  }, []);



  const columns = [
    {
      field: "order",
      headerName: "Order No.",
      width: 200,
      renderCell: (params) => {
        return <OrderListItem>{params.row._id}</OrderListItem>;
      },
    },
    {
      field: "amount",
      headerName: "Total Price",
      width: 160,
      renderCell: (params) => {
        return <OrderListItem>{params.row.amount} $</OrderListItem>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
        field: "address",
        headerName: "Address",
        width: 200,
    },
    {
        field: "products",
        headerName: "Products",
        width: 500,
    },
  ];

  return (
    <OrderListContainer>
      <DataGrid
        rows={orders}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        autoHeight
      />
    </OrderListContainer>
  );
};

export default OrderHistory;