import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { getOrders } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HistoryList = styled.div`
  flex: 4;
`;

const HistoryListItem = styled.div`
  display: flex;
  align-items: center;
`;

const HistoryListEditButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

export default function History() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOr = async () => {
      const res = await getOrders();
      if (res.err) {
        alert(res.message)
        return
      }
      setOrders(res.body.filter((ord) => ord.status === "Completed"));
    };
    getOr();
  }, []);

  const columns = [
    {
      field: "order",
      headerName: "Order No.",
      width: 200,
      renderCell: (params) => {
        return <HistoryListItem>{params.row._id}</HistoryListItem>;
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
      field: "info",
      headerName: "Info",
      width: 150,
      renderCell: (params) => {
        return (
          <Link to={"/order/" + params.row._id}>
            <HistoryListEditButton>Etc...</HistoryListEditButton>
          </Link>
        );
      },
    },
  ];

  return (
    <HistoryList>
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </HistoryList>
  );
}
