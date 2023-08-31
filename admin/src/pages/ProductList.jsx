import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../redux/apiCalls";

const ProductListContainer = styled.div`
  flex: 4;
`;

const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;

const ProductListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductListEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const ProductListDelete = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, message } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getProducts(dispatch);
      } catch (error) {
        console.log(error);
        alert(message)
      }
    }
    fetchProducts()
    return () => {}
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, dispatch);
    } catch (error) {
      console.log(error);
      alert(message)
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductListItem>
            <ProductListImg src={params.row.img} alt="" />
            {params.row.title}
          </ProductListItem>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <ProductListEdit>Edit</ProductListEdit>
            </Link>
            <ProductListDelete onClick={() => handleDelete(params.row._id)} />
          </>
        );
      },
    },
  ];

  return (
    <ProductListContainer>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </ProductListContainer>
  );
}
