import { DataGrid, useGridColumnResize } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import styled from "styled-components";

const UserList = styled.div`
  flex: 4;
`;

const ChatButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const Analytics = ({socket}) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
      socket.emit("admin_conn");
      console.log("emitted admin_conn");
      socket.on("admin_all_messages", (allMessages) => {
        console.log(allMessages);
        if(allMessages.status === 200) {
          allMessages.body.forEach((obj) => {
            setRowData(prev => [
              ...prev,
              { id: obj._id, message: obj.messages[obj.messages.length - 1] },
            ])
          });
        }
      });
  }, []);

  useEffect(()=> {
    console.log(rowData);
  },[rowData])

  const columns = [
    { field: "id", headerName: "Username", width: 200 },
    {
      field: "message",
      headerName: "Message",
      width: 200,
    },
    {
      field: "link",
      headerName: "Chat",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/chat/" + params.row.id}>
              <ChatButton>Go to chat</ChatButton>
            </Link>
          </>
        );
      }
    }
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