import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { getOrders, updateOrder } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import styled from "styled-components";

const OrderListContainer = styled.div`
  flex: 4;
`;

const OrderListItem = styled.div`
  display: flex;
  align-items: center;
`;

const OrderListEditButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("pending");
  const [updatedOrder , setUpdatedOrder] = useState(false)
  useEffect(() => {
    const fetchOrders = async () => {
      console.log("reFetching orders !");
      const res = await getOrders();
      if (res.status === 499) {
        alert("Invalid Token, please try to reconnect !")
        return
      }
      if (res.status === 404) {
        alert("no orders found !")
        return
      }
      if (res.status !== 200) {
        alert("An unexpected error occured, please try again !")
        return
      }
      setOrders(res.body.filter((ord) => ord.status !== "Completed"));
    };
    fetchOrders();
  }, [updatedOrder]);

  const changeStatusHandler = async(orderId, newStatus) => {
    console.log("here !");
    const res = await updateOrder(orderId, { status: newStatus });
    console.log(res);
    if(res.err) {
      alert(res.message)
      return
    }
    setUpdatedOrder(!updatedOrder)
  };

  const columns = [
    {
      field: "order",
      headerName: "Order No.",
      width: 200,
      renderCell: (params) => {
        return <OrderListItem>{params.row._id}</OrderListItem>;
      },
    },
    { field: "userId", headerName: "User ID", width: 220 },
    {
      field: "amount",
      headerName: "Total Price",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "change",
      headerName: "Change Status",
      width: 200,
      renderCell: (params) => {
        return (
          <OrderListItem>
            <select onChange={(e) => setStatus(e.target.value)}>
              <option>Pending</option>
              <option>Shipping</option>
              <option>Completed</option>
              <option>Processing</option>
            </select>
          </OrderListItem>
        );
      },
    },
    {
      field: "update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <OrderListEditButton
              onClick={() => changeStatusHandler(params.row._id, status)}
            >
              UPDATE
            </OrderListEditButton>
            <Link to={"/order/" + params.row._id}>
              <OrderListEditButton>Etc...</OrderListEditButton>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <OrderListContainer>
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </OrderListContainer>
  );
};

export default OrderList;