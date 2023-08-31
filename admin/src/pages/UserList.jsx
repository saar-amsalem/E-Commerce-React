import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { getUsers, deleteUser } from "../redux/apiCalls";
import { Link } from "react-router-dom";

// Styled components
const UserListContainer = styled.div`
  flex: 4;
`;

const UserListItem = styled.div`
  display: flex;
  align-items: center;
`;

const UserListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const UserListEditButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const UserListDeleteButton = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;

const UserList = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const res = await getUsers()
      console.log(res);
      if (res.err) {
        alert(res.message)
        return
      }
      res.body.map(element => {
        setData(prev => [...prev, {
          id: element._id,
          username: element.username,
          email: element.email,
          isAdmin: element.isAdmin ? "Yes" : "No"
        }])
      });
    }
    getUser();
    return () => {}
  }, [])

  const handleDelete = async (id) => {
    const res = await deleteUser(id)
    if (res.err) {
      alert(res.message)
      return
    }
    alert("deleted successfully !")
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <UserListItem>
            <UserListImg src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" alt="" />
            {params.row.username}
          </UserListItem>
        );
      },
    },
    { field: "isAdmin", headerName: "Admin", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <UserListEditButton>Edit</UserListEditButton>
            </Link>
            { !params.row.isAdmin && 
              <UserListDeleteButton
                onClick={() => handleDelete(params.row.id)}
              />
            }
          </>
        );
      },
    },
  ];

  return (
    <UserListContainer>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </UserListContainer>
  );
}

export default UserList;
