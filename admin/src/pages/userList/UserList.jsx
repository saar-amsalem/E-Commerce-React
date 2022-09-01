import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { getUsers,deleteUser } from "../../redux/apiCalls";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const UserList = () => {

  const [data,setData] = useState([])
  const history = useHistory()
  useEffect(()=>{
    const getUser = async()=>{
      const res = await getUsers()
      let temp =[];
      await res.forEach(element => {
        temp.push({
          id: element._id,
          username: element.username,
          email: element.email
        })
      });
      setData(temp)
      console.log(data);
    }
    getUser();
  },[])
  
  console.log(data);
  
  //console.log(dataArray);
  const handleDelete = async(id) => {
    /*(data.filter((item) => item.id !== id));*/
    await deleteUser(id)
    window.location.reload(false)
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        console.log(params.row.id);
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

export default UserList
