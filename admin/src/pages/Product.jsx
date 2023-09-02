import { Link, useLocation, useHistory } from "react-router-dom";
import Chart from "../components/Chart";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import {
  getSalesPerformancePerProduct,
  updateProduct,
  getAllTimeSales,
  getCategories,
} from "../redux/apiCalls";
import styled from "styled-components";

const ProductContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const ProductTop = styled.div`
  display: flex;
`;

const ProductTopLeft = styled.div`
  flex: 1;
`;

const ProductTopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductInfoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;
`;

const ProductName = styled.span`
  font-weight: 600;
`;

const ProductInfoBottom = styled.div`
  margin-top: 10px;
`;

const ProductInfoItem = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
`;

const ProductInfoValue = styled.span`
  font-weight: 300;
`;

const ProductBottom = styled.div`
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
    color: rgb(68, 128, 218);
    font-weight: 800;
  }

  input {
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid rgb(128, 128, 128);
  }

  select {
    margin-bottom: 10px;
  }
`;

const ProductUploadImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductUpload = styled.div`
  display: flex;
  align-items: center;
`;

const ProductButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const CurrentLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 800;
  color: blue;
  margin-top: -20px;
`;

const CurrentItemLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  margin-top: -5px;
`;

export default function Product() {
  const location = useLocation();
  const history = useHistory();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [alltime, setAlltime] = useState([]);
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const [updated, setUpdated] = useState({ _id: product._id });
  const dispatch = useDispatch();
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL']
  const colorOptions = ['White', 'Black', 'Red', 'Blue', 'Yellow', 'Green']
  const [categories,setCategories] = useState([])

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(()=> {
    const fetchCategories = async () => {
      const res = await getCategories()
      if (res.status === 499) {
        alert("Invalid token, please try to reconnect !")
        return
      }
      if (res.status === 404) {
        alert("No Categories found !")
        return
      }
      if (res.status !== 200) {
        alert("An unexpected error occured, please try again !")
        return
      }
      setCategories(res.body)
    }
    fetchCategories()
    return () => {}
  },[])

  useEffect(() => {
    const getStats = async () => {
      const res = await getAllTimeSales(productId);
      if (res.status === 499) {
        alert("Invalid token, please try to reconnect !")
        return
      }
      if (res.status === 404) {
        alert("No sales found on this product !")
        return
      }
      if (res.status !== 200) {
        alert("An unexpected error occured, please try again !")
        return
      }
      const list = res.body.sort((a, b) => {
        return a._id - b._id;
      });
      list?.map((item) =>
        setPStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], Sales: item.total },
        ])
      );
    };
    getStats();
    return () => {}
  }, [MONTHS]);

  useEffect(() => {
    const getAlltime = async () => {
      const res = await getSalesPerformancePerProduct(productId);
      if (res.status === 499) {
        alert("Invalid token, please try to reconnect !")
        return
      }
      if (res.status === 404) {
        alert("No sales found on this product !")
        return
      }
      if (res.status !== 200) {
        alert("An unexpected error occured, please try again !")
        return
      }
      setAlltime(res.body[0]?.total);
    };
    getAlltime();
    return () => {}
  }, []);

  const handleClick = async(e) => {
    e.preventDefault();
    const res = await updateProduct(product._id, updated, dispatch);
    if (res.status === 499) {
      alert("Invalid token, please try to reconnect !")
      return
    }
    if (res.status !== 200) {
      alert("An unexpected error occured, please try again !")
      return
    }
    history.push("/products");
  };

  return (
    <ProductContainer>
      <ProductTitleContainer>
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <ProductAddButton>Create New</ProductAddButton>
        </Link>
      </ProductTitleContainer>
      <ProductTop>
        <ProductTopLeft>
          <Chart data={pStats} dataKey="Sales" title="Monthly Sales Performance" />
        </ProductTopLeft>
        <ProductTopRight>
          <ProductInfoTop>
            <ProductInfoImg src={product.img} alt="" />
            <ProductName>{product.title}</ProductName>
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoItem>
              <span className="productInfoKey">id:</span>
              <ProductInfoValue>{product._id}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <span className="productInfoKey">total sales:</span>
              <ProductInfoValue>{alltime ? alltime : "Not Sold Yet..."}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <span className="productInfoKey">in stock:</span>
              <ProductInfoValue>{product.inStock ? "true" : "false"}</ProductInfoValue>
            </ProductInfoItem>
          </ProductInfoBottom>
        </ProductTopRight>
      </ProductTop>
      <ProductBottom>
        <ProductForm>
          <ProductFormLeft>
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product.title}
              onChange={(e) => setUpdated({ ...updated, title: e.target.value })}
            />
            <input
              type="text"
              placeholder={product.title}
              onChange={(e) =>
                setUpdated({ ...updated, title: e.target.value })
              }
            />
            <label>Product Description</label>
            <input
              type="text"
              placeholder={product.desc}
              onChange={(e) => setUpdated({ ...updated, desc: e.target.value })}
            />
            <label>Price</label>
            <input
              type="text"
              placeholder={product.price}
              onChange={(e) =>
                setUpdated({ ...updated, price: e.target.value })
              }
            />
            <label>Size</label>
            <span>
                {sizeOptions?.map((size) => (
                  <React.Fragment key={size}>
                    {size} &ensp;
                    <input
                      type="checkbox"
                      placeholder={size}
                      onChange={(e) =>
                        e.target.checked
                          ? setUpdated({
                              ...updated,
                              size: updated.size
                                ? [...updated.size, e.target.placeholder]
                                : [e.target.placeholder],
                            })
                          : setUpdated({
                              ...updated,
                              size: updated.size.filter((obj) => obj !== e.target.placeholder),
                            })
                      }
                    />
                    &emsp;
                  </React.Fragment>
                ))}
                <div>
                  &emsp; <label className="current">current sizes:</label> &ensp;
                  {product?.size?.map((obj) => (
                    <label className="currentItem" key={obj}>
                      {obj},
                    </label>
                  ))}
                </div>
              </span>
            <label>Color</label>
            <span>
                {colorOptions?.map((color) => (
                  <React.Fragment key={color}>
                    {color} &ensp;
                    <input
                      type="checkbox"
                      placeholder={color.toLowerCase()}
                      onChange={(e) =>
                        e.target.checked
                          ? setUpdated({
                              ...updated,
                              color: updated.color
                                ? [...updated.color, e.target.placeholder]
                                : [e.target.placeholder],
                            })
                          : setUpdated({
                              ...updated,
                              color: updated.color.filter((obj) => obj !== e.target.placeholder),
                            })
                      }
                    />
                    &emsp;
                  </React.Fragment>
                ))}
                <div>
                  &emsp; <label className="current">current colors:</label> &ensp;
                  {product.color?.map((obj) => (
                    <label className="currentItem" key={obj}>
                      {obj},
                    </label>
                  ))}
                </div>
            </span>
            <label>Categories</label>
            <span>
                {categories?.map((color) => (
                  <React.Fragment key={color}>
                    {color} &ensp;
                    <input
                      type="checkbox"
                      placeholder={color.toLowerCase()}
                      onChange={(e) =>
                        e.target.checked
                          ? setUpdated({
                              ...updated,
                              categories: updated.categories
                                ? [...updated.categories, e.target.placeholder]
                                : [e.target.placeholder],
                            })
                          : setUpdated({
                              ...updated,
                              categories: updated.categories.filter((obj) => obj !== e.target.placeholder),
                            })
                      }
                    />
                    &emsp;
                  </React.Fragment>
                ))}
                <div>
                  &emsp; <label className="current">current categories:</label> &ensp;
                  {product.categories?.map((obj) => (
                    <label className="currentItem" key={obj}>
                      {obj},
                    </label>
                  ))}
                </div>
              </span>

            <label>In Stock</label>
            <select
              name="inStock"
              id="idStock"
              onChange={(e) => setUpdated({ ...updated, inStock: e.target.value })}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductUpload>
              <ProductUploadImg src={product.img} alt="" />
            </ProductUpload>
            <ProductButton onClick={handleClick}>Update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottom>
    </ProductContainer>
  );
}




