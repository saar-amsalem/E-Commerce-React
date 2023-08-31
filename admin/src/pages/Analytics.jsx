import { DataGrid, useGridColumnResize } from "@material-ui/data-grid";
import { getOnline } from "../redux/apiCalls";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";

const UserList = styled.div`
  flex: 4;
`;

// implement here get all online users through the socket ! and the chat !!!

const Analytics = () => {
  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const socket = io("http://localhost:3030").emit("admin_conn");
      socket.on("admin_get", (users) => {
        console.log(users);
        setData([...data, users]);
        data.forEach((obj) => {
          setRowData([
            ...rowData,
            { id: obj._id, username: obj.username, email: obj.email },
          ]);
          console.log(rowData);
        });
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  console.log(rowData);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "User",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
  ];

  return (
    <UserList>
      <DataGrid
        rows={rowData}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </UserList>
  );
};

export default Analytics;