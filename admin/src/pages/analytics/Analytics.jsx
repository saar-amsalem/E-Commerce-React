import "./analytics.css";
import { DataGrid, useGridColumnResize } from "@material-ui/data-grid";
import { getOnline } from "../../redux/apiCalls";
import { useEffect, useState } from "react";
import io from "socket.io-client";
//const socket = io("http://localhost:3030");

const Analytics = () => {
//blablabla
  const [data,setData] = useState([])
  const [rowData,setRowdata] = useState([])
  useEffect(() => {
    const timer = setTimeout(() => {
      const socket = io("http://localhost:3030").emit("admin_conn");
      socket.on("admin_get",(users)=>{
        console.log(users);
        setData([...data,users])
        data.forEach((obj)=> {
          setRowdata([...rowData,{id: obj._id,username: obj.username,email: obj.email}])
          console.log(rowData);
      })
      })
      
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
      /*renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" alt="" />
            {params.row.username}
          </div>
        );
      },*/
    },
    { field: "email", headerName: "Email", width: 200 },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={rowData}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

export default Analytics
